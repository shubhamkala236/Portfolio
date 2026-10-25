/**
 * The home work cards' zoom into their case study, and back (PageTransition).
 *
 * A card's art is the centre of its case study's hero: the same 800 Figma px
 * tall frame, 1258 wide of the hero's 1512 (127 cropped each side), with
 * the same layers at the same places. So a copy of the art, drawn in the
 * hero's frame and clipped to a box, becomes the hero just by growing the
 * box from the card's rect to the hero's — and the hero becomes the card by
 * shrinking it back. The box keeps the frame's height filled, so the art
 * never stretches; only the crop widens.
 */

/** The hero frame and the card's centre crop of it, Figma px. */
const HERO = { width: 1512, height: 800 };
const CARD = { width: 1258, radius: 40 };
const CROP = (HERO.width - CARD.width) / 2;

export const ZOOM = {
  /** The box growing or shrinking. */
  moveMs: 650,
  /** The page fading to the page colour behind it (or back). */
  backdropMs: 450,
  /** The way home: the page colour first, then the hero over it. */
  heroInMs: 300,
  /** The copy fading out over the real hero or card at the end. */
  fadeMs: 250,
  /** Fast off the mark, soft landing (as the reference's zoom). */
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

type Box = { left: number; top: number; width: number; height: number };

const rectOf = (element: Element): Box => {
  const r = element.getBoundingClientRect();
  return { left: r.left, top: r.top, width: r.width, height: r.height };
};

/** Where the case-study hero sits at the top of the page: full width. */
const heroBox = (): Box => {
  const width = document.documentElement.clientWidth;
  return { left: 0, top: 0, width, height: (width * HERO.height) / HERO.width };
};

const radiusFor = (box: Box) => (box.width * CARD.radius) / CARD.width;

const frames = (from: Box, fromRadius: number, to: Box, toRadius: number) => [
  { ...px(from), borderRadius: `${fromRadius}px` },
  { ...px(to), borderRadius: `${toRadius}px` },
];

const px = (box: Box) => ({
  left: `${box.left}px`,
  top: `${box.top}px`,
  width: `${box.width}px`,
  height: `${box.height}px`,
});

const percent = (value: string) => parseFloat(value) / 100;

/** The overlay's parts: the page-colour backdrop and the clipped box. */
function scaffold(root: HTMLElement, at: Box, radius: number) {
  const backdrop = document.createElement("div");
  backdrop.className = "card-zoom-backdrop";
  const box = document.createElement("div");
  box.className = "card-zoom-box";
  Object.assign(box.style, px(at), { borderRadius: `${radius}px` });
  // The hero's frame, filling the box's height, centred: the box's width
  // decides how much of it shows.
  const stage = document.createElement("div");
  stage.className = "card-zoom-stage";
  box.append(stage);
  root.replaceChildren(backdrop, box);
  return { backdrop, box, stage };
}

export type Zoom = {
  /** Fade the copy out over what it landed on, then clear the overlay. */
  finish: () => Promise<void>;
};

/**
 * Grow a home card's art into its case study's hero. The art's layers are
 * copied into the hero's frame as they look now — mid-hover included — and
 * ease to rest while the box grows, so nothing jumps.
 */
export function zoomFromCard(root: HTMLElement, art: HTMLElement) {
  const start = rectOf(art);
  const { backdrop, box, stage } = scaffold(root, start, radiusFor(start));

  const animations: Animation[] = [];
  art.querySelectorAll<HTMLImageElement>("img").forEach((source) => {
    const copy = new Image();
    copy.src = source.currentSrc || source.src;
    copy.alt = "";
    copy.className = "card-zoom-layer";
    // The card places each layer in percent of its 1258px frame; the hero's
    // frame is 1512 wide, the card's 127 in from its left.
    const left = percent(source.style.left) * CARD.width + CROP;
    Object.assign(copy.style, {
      left: `${(left / HERO.width) * 100}%`,
      top: source.style.top,
      width: `${((percent(source.style.width) * CARD.width) / HERO.width) * 100}%`,
      height: source.style.height,
    });
    stage.append(copy);
    const now = getComputedStyle(source);
    const restOpacity = source.classList.contains("opacity-0") ? 0 : 1;
    animations.push(
      copy.animate(
        [
          {
            scale: now.scale === "none" ? "1" : now.scale,
            opacity: now.opacity,
          },
          { scale: "1", opacity: String(restOpacity) },
        ],
        { duration: ZOOM.moveMs, easing: ZOOM.ease, fill: "forwards" },
      ),
    );
  });

  backdrop.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: ZOOM.backdropMs,
    easing: "ease-out",
    fill: "forwards",
  });
  const move = box.animate(frames(start, radiusFor(start), heroBox(), 0), {
    duration: ZOOM.moveMs,
    easing: ZOOM.ease,
    fill: "forwards",
  });

  return {
    covered: wait(ZOOM.backdropMs),
    landed: move.finished.then(() => undefined),
    finish: () => fadeOut(root, box, backdrop),
  };
}

/**
 * The reverse: the case study's hero (as it sits at the top of its page)
 * fades in over the page colour, then — once the home page is back
 * underneath — shrinks into its card while the page colour fades away.
 */
export function zoomFromHero(root: HTMLElement, hero: HTMLImageElement) {
  const start = heroBox();
  const { backdrop, box, stage } = scaffold(root, start, 0);
  const copy = new Image();
  copy.src = hero.currentSrc || hero.src;
  copy.alt = "";
  copy.className = "card-zoom-layer";
  Object.assign(copy.style, {
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
  });
  stage.append(copy);

  backdrop.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: ZOOM.heroInMs,
    easing: "ease-out",
    fill: "forwards",
  });
  box.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: ZOOM.heroInMs,
    delay: ZOOM.backdropMs - ZOOM.heroInMs,
    easing: "ease-out",
    fill: "both",
  });

  return {
    covered: wait(ZOOM.backdropMs),
    /** Shrink into the card (or just fade, if it isn't on the page). */
    landOn: async (art: HTMLElement | null) => {
      if (!art) return;
      const end = rectOf(art);
      backdrop.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: ZOOM.moveMs,
        easing: ZOOM.ease,
        fill: "forwards",
      });
      await box.animate(frames(start, 0, end, radiusFor(end)), {
        duration: ZOOM.moveMs,
        easing: ZOOM.ease,
        fill: "forwards",
      }).finished;
    },
    finish: () => fadeOut(root, box, backdrop),
  };
}

async function fadeOut(root: HTMLElement, ...parts: HTMLElement[]) {
  await Promise.all(
    parts.map(
      (part) =>
        part.animate([{}, { opacity: 0 }], {
          duration: ZOOM.fadeMs,
          easing: "ease-out",
          fill: "forwards",
        }).finished,
    ),
  );
  root.replaceChildren();
}

const wait = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));
