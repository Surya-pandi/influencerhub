"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const clickableSelector = "a[href], button:not([disabled])";

export function GlobalInteractions() {
  const pathname = usePathname();
  const [isRouting, setIsRouting] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const loadingElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const supportsCursor =
      window.innerWidth >= 768 && window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

    if (!supportsCursor) {
      return;
    }

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;

    document.body.classList.add("has-custom-cursor");

    const render = () => {
      ringX += (pointerX - ringX) * 0.18;
      ringY += (pointerY - ringY) * 0.18;
      dotRef.current?.style.setProperty("transform", `translate3d(${pointerX}px, ${pointerY}px, 0)`);
      ringRef.current?.style.setProperty("transform", `translate3d(${ringX}px, ${ringY}px, 0)`);
      frame = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest(clickableSelector) : null;
      document.body.classList.toggle("cursor-over-action", Boolean(target));
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerover", handlePointerOver);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.body.classList.remove("has-custom-cursor", "cursor-over-action");
    };
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(clickableSelector) : null;

      if (!target || target.getAttribute("aria-disabled") === "true") {
        return;
      }

      loadingElementRef.current?.classList.remove("is-click-loading");
      loadingElementRef.current?.removeAttribute("aria-busy");
      loadingElementRef.current = target;
      target.classList.add("is-click-loading");
      target.setAttribute("aria-busy", "true");

      window.setTimeout(() => {
        if (loadingElementRef.current === target) {
          target.classList.remove("is-click-loading");
          target.removeAttribute("aria-busy");
          loadingElementRef.current = null;
        }
      }, 900);

      if (target instanceof HTMLAnchorElement && isInternalNavigation(target)) {
        setIsRouting(true);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    setIsRouting(false);
    loadingElementRef.current?.classList.remove("is-click-loading");
    loadingElementRef.current?.removeAttribute("aria-busy");
    loadingElementRef.current = null;
  }, [pathname]);

  return (
    <>
      <div className={`route-loading-bar ${isRouting ? "is-visible" : ""}`} aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

function isInternalNavigation(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");

  if (!href || href.startsWith("#") || anchor.target === "_blank" || anchor.hasAttribute("download")) {
    return false;
  }

  const url = new URL(anchor.href);
  return url.origin === window.location.origin && url.pathname !== window.location.pathname;
}
