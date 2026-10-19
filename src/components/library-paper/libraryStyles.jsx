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

/* one link per card, stretched over the whole card */
.hl-stretch::after { content: ""; position: absolute; inset: 0; z-index: 1; border-radius: 6px; }
.hl-card:hover .hl-title { text-decoration: underline; text-decoration-thickness: 2px; text-decoration-color: rgba(0,105,92,.45); text-underline-offset: 5px; }

/* titles break long words rather than overflow at large text sizes */
.hl-title { -webkit-hyphens: auto; hyphens: auto; overflow-wrap: break-word; }

/* category path: a dashed felt path joins each stop's marker to the next one
   (down the left on phones and tablets, across the top on desktop when all
   four stops fit in one row); each segment is drawn under the cards, so it
   shows only in the gaps between them. With large text the desktop row wraps,
   and the path is left out rather than drawn into nowhere. */
.hl-path { container: hl-path / inline-size; }
.hl-path > [role='listitem']:not(:last-child)::before { content: ""; position: absolute; left: 34px; top: 38px; bottom: -54px; border-left: 2px dashed rgba(0,121,107,.42); pointer-events: none; }
.hl-marker { display: block; width: 22px; height: 10px; border-radius: 999px; background: #2fa8b0;
  box-shadow: inset 0 -2px 0 rgba(0,60,70,.22), inset 0 1px 0 rgba(255,255,255,.35), 0 1px 0 rgba(255,255,255,.6); }
.hl-stop-card { background: #fffaf1; box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 14px 26px -18px rgba(70,50,30,.55); }
/* a category without a hub yet: the same card, muted (flat, dashed edge, grey marker) */
.hl-stop-soon { background: #f8f3eb; outline: 2px dashed rgba(27,69,96,.22); outline-offset: -2px; }
.hl-marker-soon { background: #a3aab0; box-shadow: inset 0 -2px 0 rgba(0,0,0,.12); }
@media (min-width: 1024px) {
  .hl-path > [role='listitem']:not(:last-child)::before { display: none; }
  @container hl-path (min-width: 55.75rem) {
    .hl-path > [role='listitem']:not(:last-child)::before { display: block; left: 35px; right: -55px; top: 28px; bottom: auto; border-left: 0; border-top: 2px dashed rgba(0,121,107,.42); }
  }
}

/* reading list entries on a category hub */
.hl-entry:hover .hl-title { text-decoration: underline; text-decoration-thickness: 2px; text-decoration-color: rgba(0,105,92,.45); text-underline-offset: 5px; }

/* articles: section headings clear the sticky site header when jumped to */
.hl-article .hp-prose h2 { scroll-margin-top: 1rem; }
.hl-article .hp-prose { max-width: 34rem; }
.hl-toc-on { color: #1b4560; font-weight: 600; }
.hl-toc-on::before { background: #2fa8b0 !important; }
.hl-fold summary { list-style: none; }
.hl-fold summary::-webkit-details-marker { display: none; }
.hl-fold[open] .hl-fold-chev { transform: rotate(180deg); }

/* Increase Contrast: muted inks, crumb underlines and separators go navy and solid */
@media (prefers-contrast: more) {
  .hp-body .hl-crumb, .hp-body .hl-toc-link, .hp-body .hl-rail-meta, .hp-body .hl-soon { color: #1b4560; }
  .hp-body .hl-crumb { text-decoration-color: currentColor; }
  .hp-body .hl-stop-soon { outline-color: rgba(27,69,96,.6); }
  .hp-body .hl-soon { border-color: #1b4560; }
}

@media (forced-colors: active) {
  .hl-marker { forced-color-adjust: none; }
  .hl-stop-card, .hl-cover, .hl-stop-soon { border: 1px solid CanvasText; }
  /* the current section's felt tile is a background, which forced colours drop */
  .hl-toc-on { outline: 2px solid Highlight; outline-offset: 2px; }
}

@media (prefers-reduced-motion: no-preference) {
  .hl-stop-card { transition: transform .3s var(--hp-ease), box-shadow .3s ease; }
  .hl-stop-card:hover { transform: translateY(-4px); box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 22px 34px -20px rgba(70,50,30,.6); }
  .hl-entry .hp-postcard { transition: transform .45s var(--hp-ease); }
  .hl-entry:hover .hp-postcard { transform: rotate(0deg) translateY(-4px) !important; }
  .hl-fold-chev { transition: transform .25s var(--hp-ease); }
}
`;

export function LibraryStyles() {
  return <style>{LIB_CSS}</style>;
}
