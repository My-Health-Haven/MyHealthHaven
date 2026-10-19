/*
 * Local look for the Procedures index (src/views/Procedures.jsx) on top of the
 * shared paper kit (src/components/paper/). The catalog is set like an index on
 * paper: Young Serif speciality heads over a navy rule, hairline-ruled entries
 * that open a paper slip with the description, and the search cut into the
 * sheet like the film windows. Same rules as the kit: nothing here hides
 * content; the only animations end visible and run only when motion is allowed.
 */
export const PROC_CSS = `
/* phones: the words and the search lead and the frame steps aside, so the first
   entries of the index reach the first screen (the lab frame closes the page) */
@media (max-width: 767px) {
  .pr-hero .hp-load-window { display: none; }
  .pr-hero > div { padding-bottom: 40px; }
}

/* the search, cut into the paper */
.hp-form.pr-search .MuiOutlinedInput-root { min-height: 60px; border-radius: 14px; padding-left: 16px; padding-right: 6px; font-size: 1.0625rem; color: #1b4560;
  box-shadow: inset 2px 3px 7px -3px rgba(70,50,30,.32); }
.hp-form.pr-search .MuiOutlinedInput-input { padding: 17px 6px 17px 2px; font-family: inherit; text-overflow: ellipsis; }
.hp-form.pr-search .MuiOutlinedInput-input::placeholder { color: #5b7180; opacity: 1; }
.hp-form.pr-search .MuiOutlinedInput-notchedOutline { border-color: #5b7180; }
.hp-form.pr-search .MuiOutlinedInput-root:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline { border-color: #1b4560; }
@media (max-width: 420px) { .hp-form.pr-search .MuiOutlinedInput-root { font-size: 1rem; padding-left: 14px; } }
.hp-form.pr-search .MuiInputAdornment-root { color: #1b4560; }
.pr-clear { display: grid; place-items: center; width: 44px; height: 44px; border: 0; border-radius: 999px; background: transparent; color: #1b4560; cursor: pointer; }
.pr-clear:hover { background: rgba(27,69,96,.08); }
.pr-clear:focus-visible { outline: 2px solid #1b4560; outline-offset: 1px; }

/* the result line and the view switch under the search */
.pr-tally { margin: 0; font-size: 1rem; line-height: 1.5; color: #3f5868; }
.pr-tally strong { font-family: var(--font-hh-display); font-weight: 400; font-size: 1.5rem; line-height: 1; color: #1b4560; font-variant-numeric: lining-nums; }
.pr-switch { display: inline-flex; flex-wrap: wrap; max-width: 100%; padding: 3px; gap: 2px; border-radius: 27px; border: 1.5px solid rgba(27,69,96,.32); background: rgba(255,250,241,.55); }
.pr-switch button { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 16px; border: 0; border-radius: 999px; background: transparent;
  color: #1b4560; font-size: .9375rem; font-weight: 600; cursor: pointer; }
.pr-switch button:hover { background: rgba(27,69,96,.07); }
.pr-switch button[aria-pressed='true'] { background: #1b4560; color: #f4eee5; }
.pr-switch button:focus-visible { outline: 2px solid #1b4560; outline-offset: 2px; }

/* a speciality: its head over a navy rule */
.pr-groups { display: grid; grid-template-columns: minmax(0, 1fr); gap: 56px; align-items: start; }
@media (min-width: 768px) {
  .pr-groups { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 56px; row-gap: 0; margin-bottom: -72px; }
  .pr-group-wide { grid-column: 1 / -1; }
  .pr-body { padding-bottom: 72px; }
  /* the two groups of a row share the head track, so their rules line up */
  @supports (grid-template-rows: subgrid) { .pr-group { display: grid; grid-template-columns: minmax(0, 1fr); grid-row: span 2; grid-template-rows: subgrid; } }
}
@media (min-width: 1280px) { .pr-groups { column-gap: 80px; } }
.pr-head { display: grid; grid-template-columns: 28px minmax(0, 1fr) auto; column-gap: 14px; align-items: baseline; padding-bottom: 16px; border-bottom: 2px solid #1b4560; }
/* the mark's bottom sits on the heading's baseline; nudged down to the letters' middle */
.pr-mark { display: block; flex: none; width: 28px; height: 28px; line-height: 0; color: #00796b; position: relative; top: 4px; }
.pr-name { margin: 0; font-family: var(--font-hh-display); font-weight: 400; font-size: 1.5rem; line-height: 1.2; color: #1b4560; -webkit-hyphens: auto; hyphens: auto; overflow-wrap: break-word; }
@media (min-width: 1024px) { .pr-name { font-size: 1.75rem; } }
.pr-desc { margin: 6px 0 0; font-size: .9375rem; line-height: 1.5; color: #3f5868; }
.pr-count { font-family: var(--font-hh-display); font-size: 1.375rem; line-height: 1.2; color: #3f5868; font-variant-numeric: lining-nums tabular-nums; }
@media (min-width: 1024px) { .pr-count { font-size: 1.5rem; } }

/* entries */
.pr-rows { margin: 0; padding: 0; }
.pr-rows-split { display: grid; grid-template-columns: minmax(0, 1fr); }
@media (min-width: 768px) { .pr-rows-split { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 56px; align-items: start; } }
@media (min-width: 1280px) { .pr-rows-split { column-gap: 80px; } }
.pr-row-btn, .pr-row-text { display: flex; width: 100%; min-height: 56px; align-items: last baseline; gap: 12px; margin: 0; padding: 12px 2px 12px 0;
  border: 0; background: transparent; text-align: left; color: #1b4560; font-size: 1.0625rem; font-weight: 600; line-height: 1.4; border-radius: 4px; }
.pr-row-btn { cursor: pointer; }
/* a long single word at large text breaks (hyphenated where the browser can) instead of running under the mark */
.pr-row-name { min-width: 0; -webkit-hyphens: auto; hyphens: auto; overflow-wrap: break-word; }
/* dotted leaders run from each entry to its mark, as in a printed index */
.pr-leader { flex: 1 1 32px; min-width: 32px; height: 4px; background-image: radial-gradient(circle, rgba(27,69,96,.42) 1.1px, transparent 1.5px); background-size: 7px 4px; background-repeat: repeat-x; background-position: 0 50%; }
.pr-row-btn:hover .pr-leader { background-image: radial-gradient(circle, rgba(0,105,92,.75) 1.1px, transparent 1.5px); }
.pr-row-btn:focus-visible { outline: 2px solid #1b4560; outline-offset: 2px; }
.pr-plus { display: grid; flex: none; place-items: center; width: 32px; height: 32px; border-radius: 999px; background: rgba(0,121,107,.1); color: #00796b; }
.pr-row-btn[aria-expanded='true'] .pr-plus { transform: rotate(45deg); background: #00796b; color: #fff; }
.pr-slip { margin: 2px 0 18px; padding: 15px 18px 17px; border-radius: 8px; background: #fffaf1;
  box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 14px 26px -18px rgba(70,50,30,.55); }
.pr-slip-label { margin: 0 0 6px; font-size: .875rem; font-weight: 600; line-height: 1.4; color: #00695c; }
.pr-slip-text { margin: 0; font-size: .96875rem; line-height: 1.65; color: #3f5868; }
.pr-more { display: inline-flex; min-height: 44px; align-items: center; gap: 6px; margin-top: 10px; padding: 0 2px; border: 0; border-radius: 4px; background: transparent; cursor: pointer;
  color: #00695c; font-size: 1rem; font-weight: 600; text-decoration: underline; text-decoration-color: rgba(0,105,92,.35); text-underline-offset: 4px; }
.pr-more:hover { text-decoration-color: #00695c; }
.pr-more:focus-visible { outline: 2px solid #1b4560; outline-offset: 2px; }
.pr-more[aria-expanded='true'] svg { transform: rotate(180deg); }

/* list view: one drawer per speciality */
.pr-drawers { border-top: 2px solid #1b4560; }
.pr-drawer { border-bottom: 1px solid rgba(27,69,96,.24); }
.pr-drawer-h { margin: 0; font: inherit; }
.pr-drawer-btn { display: grid; width: 100%; column-gap: 14px; row-gap: 6px; align-items: center;
  margin: 0; padding: 22px 2px 22px 0; border: 0; background: transparent; text-align: left; cursor: pointer; color: #1b4560; border-radius: 4px;
  /* phones (and large text on them): the name gets the whole line; the count drops beside the description */
  grid-template-columns: 28px minmax(0, 1fr) auto; grid-template-areas: 'mark name chev' '. desc count'; }
@media (min-width: 768px) {
  .pr-drawer-btn { grid-template-columns: 28px minmax(0, 1fr) auto 32px; grid-template-areas: 'mark name count chev' '. desc desc desc'; row-gap: 4px; }
}
.pr-drawer-btn:focus-visible { outline: 2px solid #1b4560; outline-offset: 2px; }
.pr-drawer-btn .pr-mark { grid-area: mark; top: 0; }
.pr-drawer-btn .pr-name { grid-area: name; }
.pr-drawer-btn .pr-desc { grid-area: desc; margin: 0; }
.pr-drawer-btn .pr-count { grid-area: count; }
.pr-drawer-btn .pr-name, .pr-drawer-btn .pr-count { align-self: baseline; }
@media (max-width: 767px) { .pr-drawer-btn .pr-desc { align-self: baseline; } }
.pr-drawer-btn .pr-plus { grid-area: chev; }
.pr-drawer-btn[aria-expanded='true'] .pr-plus { transform: rotate(180deg); background: #00796b; color: #fff; }
@media (min-width: 1024px) {
  .pr-drawer-btn { grid-template-columns: 28px minmax(0, 19rem) minmax(0, 1fr) auto 32px; grid-template-areas: 'mark name desc count chev'; column-gap: 20px; padding: 26px 2px 26px 0; }
}
@media (min-width: 1280px) { .pr-drawer-btn { grid-template-columns: 28px minmax(0, 26rem) minmax(0, 1fr) auto 32px; } }
.pr-drawer-panel { padding: 0 0 30px 0; }
@media (min-width: 768px) { .pr-drawer-panel { padding-left: 42px; } }
.pr-drawer-panel .pr-rows { padding-top: 4px; }

.pr-row-btn:hover .pr-plus, .pr-drawer-btn:hover .pr-plus { background: rgba(0,121,107,.18); }
.pr-row-btn[aria-expanded='true']:hover .pr-plus, .pr-drawer-btn[aria-expanded='true']:hover .pr-plus { background: #00695c; }

/* large text in a narrow column (about 17 characters of body text or less, e.g.
   200% text on a phone or in a tablet's two columns): the mark steps aside and
   the names set a step smaller, so whole words fit the line */
.pr-group, .pr-drawer { container-type: inline-size; }
@container (max-width: 17em) {
  .pr-head { grid-template-columns: minmax(0, 1fr) auto; }
  .pr-mark { display: none; }
  .pr-name { font-size: 1.125rem; }
  .pr-drawer-btn { grid-template-columns: minmax(0, 1fr) auto; grid-template-areas: 'name chev' 'desc count'; }
}

/* nothing found */
.pr-empty { max-width: 34rem; margin: 0 auto; padding: 24px 0; text-align: center; }

@media (prefers-reduced-motion: no-preference) {
  .pr-plus { transition: transform .25s var(--hp-ease), background-color .2s ease, color .2s ease; }
  .pr-more svg { transition: transform .25s var(--hp-ease); }
  .pr-switch button { transition: background-color .2s ease, color .2s ease; }
  .pr-slip { animation: pr-slip .38s var(--hp-ease); transform-origin: 50% 0; }
  .pr-drawer-panel { animation: pr-open .45s var(--hp-ease); }
}
@keyframes pr-slip { from { opacity: 0; transform: translateY(-8px) rotate(-.6deg); } to { opacity: 1; transform: none; } }
@keyframes pr-open { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }

/* Increase Contrast: muted inks go to the navy ink, edges and underlines go solid */
@media (prefers-contrast: more) {
  .pr-tally, .pr-desc, .pr-slip-text, .pr-count { color: #1b4560; }
  .hp-form.pr-search .MuiOutlinedInput-input::placeholder { color: #1b4560; }
  .hp-form.pr-search .MuiOutlinedInput-root:not(.Mui-focused) .MuiOutlinedInput-notchedOutline { border-color: #1b4560; }
  .pr-switch { border-color: #1b4560; }
  .pr-more { text-decoration-color: currentColor; }
  .pr-leader { background-image: radial-gradient(circle, #1b4560 1.1px, transparent 1.5px); }
  .pr-drawer { border-bottom-color: #1b4560; }
}

@media (forced-colors: active) {
  .pr-slip { border: 1px solid CanvasText; }
  .pr-switch button[aria-pressed='true'] { forced-color-adjust: none; background: Highlight; color: HighlightText; }
}
`;
