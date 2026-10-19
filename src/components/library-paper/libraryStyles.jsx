/*
 * Local styles for the paper library pages (index, category hubs, articles),
 * on top of the shared kit in src/components/paper. Same rules as the kit:
 * colours are the logo's, nothing is hidden outside [data-armed], and every
 * transition sits behind prefers-reduced-motion: no-preference.
 */

/* the two columns every library sheet shares (the page hero's own grid), so
   titles, prose, ledgers and postcards line up on two anchors down the page */
export const LIB_GRID = 'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-x-14';

export const LIB_CSS = `
/* article notes: a paper note with the picture glued in at the top */
.hl-cover { container-type: inline-size; position: relative; overflow: hidden; border-radius: 4px; background: #d1c5b4; }
.hl-cover::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; box-shadow: inset 0 0 0 1px rgba(70,50,30,.14); }

/* no picture yet: a cream slip with a felt marker, laid on kraft */
.hl-slip-ground { position: absolute; inset: 0; display: grid; place-items: center; background: #e9dfcf; }
.hl-slip { width: 50%; padding: 6.5cqw 6cqw; background: #fbf7ef; border-radius: 3px; transform: rotate(var(--slip, -3deg));
  box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 12px 20px -14px rgba(70,50,30,.6); display: flex; flex-direction: column; gap: 2.6cqw; }
.hl-slip i { display: block; height: 1.3cqw; min-height: 3px; border-radius: 999px; background: rgba(27,69,96,.15); }
.hl-slip-head { display: flex; align-items: center; gap: 2cqw; margin-bottom: 1cqw; }
.hl-slip-head b { flex: none; width: 6.5cqw; height: 2.9cqw; border-radius: 999px; background: #2fa8b0; box-shadow: inset 0 -2px 0 rgba(0,60,70,.22); }
.hl-slip-head i { flex: 1; height: 2cqw; background: rgba(27,69,96,.3); }

/* one link per card, stretched over the whole card */
.hl-stretch::after { content: ""; position: absolute; inset: 0; z-index: 1; border-radius: 6px; }
.hl-card:hover .hl-title { text-decoration: underline; text-decoration-thickness: 2px; text-decoration-color: rgba(0,105,92,.45); text-underline-offset: 5px; }

/* category path: a dashed felt path joins each stop's marker to the next one
   (down the left on phones and tablets, across the top on desktop); each
   segment is drawn under the following stop, so a card covers it and a flat
   stop lets it show through */
.hl-path > [role='listitem']:not(:last-child)::before { content: ""; position: absolute; left: 34px; top: 38px; bottom: -54px; border-left: 2px dashed rgba(0,121,107,.42); pointer-events: none; }
.hl-marker { display: block; width: 22px; height: 10px; border-radius: 999px; background: #2fa8b0;
  box-shadow: inset 0 -2px 0 rgba(0,60,70,.22), inset 0 1px 0 rgba(255,255,255,.35), 0 1px 0 rgba(255,255,255,.6); }
.hl-marker-open { background: #f4eee5; box-shadow: inset 0 0 0 2px #2fa8b0; }
.hl-stop-card { background: #fffaf1; box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 14px 26px -18px rgba(70,50,30,.55); }
@media (min-width: 1024px) {
  .hl-path > [role='listitem']:not(:last-child)::before { left: 35px; right: -55px; top: 28px; bottom: auto; border-left: 0; border-top: 2px dashed rgba(0,121,107,.42); }
}

/* reading list entries on a category hub */
.hl-entry:hover .hl-title { text-decoration: underline; text-decoration-thickness: 2px; text-decoration-color: rgba(0,105,92,.45); text-underline-offset: 5px; }

/* articles: section headings clear the sticky site header when jumped to */
.hl-article .hp-prose h2 { scroll-margin-top: 112px; }
.hl-article .hp-prose { max-width: 38rem; }
.hl-toc-on { color: #1b4560; font-weight: 600; }
.hl-toc-on::before { background: #2fa8b0 !important; }

@media (forced-colors: active) {
  .hl-marker, .hl-slip-head b { forced-color-adjust: none; }
  .hl-stop-card, .hl-cover { border: 1px solid CanvasText; }
}

@media (prefers-reduced-motion: no-preference) {
  .hl-stop-card { transition: transform .3s var(--hp-ease), box-shadow .3s ease; }
  .hl-stop-card:hover { transform: translateY(-4px); box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 22px 34px -20px rgba(70,50,30,.6); }
  .hl-entry .hp-postcard { transition: transform .45s var(--hp-ease); }
  .hl-entry:hover .hp-postcard { transform: rotate(0deg) translateY(-4px) !important; }
}
`;

export function LibraryStyles() {
  return <style>{LIB_CSS}</style>;
}
