"use client";

import { useEffect, useRef, useState } from "react";

/** How long the notice stays up, ms. */
const SHOW_MS = 2600;

/** Copy text, falling back to the old selection trick where needed. */
async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  }
}

/**
 * Email links (`mailto:`, site-wide) open the visitor's mail app as usual,
 * and also copy the address and say so — a mail link does nothing on a
 * device with no mail app set up, or in some in-app browsers, and this way
 * the visitor still has the address. Root layout; renders the notice.
 */
export function EmailCopy({ message }: { message: string }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="mailto:"]',
      );
      if (!link) return;
      // The address, without any ?subject= and the like.
      const address = decodeURIComponent(
        link.href.slice("mailto:".length).split("?")[0],
      );
      void copy(address).then((ok) => {
        if (!ok) return;
        setCopied(address);
        setShown(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setShown(false), SHOW_MS);
      });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      // On a phone it clears the home page's bottom tab bar.
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 max-md:bottom-20"
    >
      <p
        data-shown={shown || undefined}
        className="email-toast glass-bar flex flex-wrap justify-center gap-x-2 rounded-round px-5 py-3 text-center text-tab"
      >
        {/* Kept while it fades out; hidden, it is only ever see-through. */}
        {copied && (
          <>
            <span className="font-medium text-fg">{message}</span>
            <span className="text-muted">{copied}</span>
          </>
        )}
      </p>
    </div>
  );
}
