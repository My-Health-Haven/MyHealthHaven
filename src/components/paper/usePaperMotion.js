import { useEffect } from 'react';

/*
 * Arms the paper body's scroll motion (see paperStyles.js).
 *
 * - [data-reveal] elements below the fold get [data-armed] (hidden by CSS) and
 *   [data-in] when they scroll into view. Elements already on screen or above
 *   it are marked [data-in] straight away, so a reload mid-page never blinks.
 *   Elements that mount later (async data) are placed the same way.
 * - [data-scrub] elements get --p (0..1) from their position while scrolling.
 *
 * Attributes, not classes: React never rewrites them on a re-render.
 * Nothing runs when the visitor prefers reduced motion.
 */
export function usePaperMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return undefined;
    if (!('IntersectionObserver' in window)) return undefined;

    const items = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-in', '');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px', threshold: 0 }
    );
    /* items inside a sideways scroller (the phone notes row) are clipped by it,
       so the viewport observer would only see them once swiped: never arm them */
    const inScroller = (el) => {
      const row = el.parentElement?.closest('[role="list"]');
      return Boolean(row) && getComputedStyle(row).overflowX !== 'visible';
    };
    const place = (el) => {
      if (items.has(el) || el.hasAttribute('data-in')) return;
      items.add(el);
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9 || inScroller(el)) {
        el.setAttribute('data-in', '');
        return;
      }
      el.setAttribute('data-armed', '');
      io.observe(el);
    };
    root.querySelectorAll('[data-reveal]').forEach(place);

    /* content that mounts later (data loaded after the page, a language switch)
       is placed the same way: armed if it is still below the fold */
    const mo = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches('[data-reveal]')) place(node);
          node.querySelectorAll('[data-reveal]').forEach(place);
        });
      });
    });
    mo.observe(root, { childList: true, subtree: true });

    /* keyboard focus can land on an element the observer has not reached yet
       (the browser scrolls it just to the bottom edge): reveal it at once */
    const onFocus = (event) => {
      const el = event.target.closest?.('[data-armed]:not([data-in])');
      if (!el) return;
      el.setAttribute('data-in', '');
      io.unobserve(el);
    };
    root.addEventListener('focusin', onFocus);

    const scrubs = [...root.querySelectorAll('[data-scrub]')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = window.innerHeight;
      scrubs.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, (h - top) / (h * 0.8)));
        el.style.setProperty('--p', p.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    if (scrubs.length) {
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      root.removeEventListener('focusin', onFocus);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      items.forEach((el) => {
        el.removeAttribute('data-armed');
        el.setAttribute('data-in', '');
      });
      scrubs.forEach((el) => el.style.removeProperty('--p'));
    };
  }, [rootRef]);
}
