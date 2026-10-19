/*
 * Local look for the Health Navigator page (src/views/Navigators.jsx), on top of
 * the shared paper kit (src/components/paper/). Same rules as the kit: nothing
 * here hides content. The path's felt line is the kit's .hp-felt-line, drawn by
 * the kit's [data-reveal] states; this file only lays the path out and, on wide
 * screens, times the line so it runs from stop to stop.
 */
export const NAV_CSS = `
/* the Navigator's work: heading, the Navigator's card, and the path of five stops */
.np-work { display: grid; grid-template-columns: minmax(0, 1fr); grid-template-areas: 'head' 'card' 'path'; row-gap: 48px; }
.np-head { grid-area: head; }
.np-card { grid-area: card; }
.np-path { grid-area: path; }
@media (min-width: 1024px) {
  .np-work { grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); grid-template-areas: 'head head' 'path card'; column-gap: 64px; row-gap: 56px; }
  .np-card { align-self: start; }
  .np-card-hold { position: sticky; top: 120px; }
}
@media (min-width: 1280px) {
  .np-work { grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); grid-template-areas: 'head card' 'path path'; column-gap: 80px; row-gap: 88px; }
  .np-head { align-self: center; }
  .np-card-hold { position: static; }
}

/* the path: a felt line from stop to stop, down the page on phones and tablets,
   across it on wide screens (as on the laptop in the hero frame) */
.np-path { --np-gap: 36px; display: grid; grid-template-columns: minmax(0, 1fr); row-gap: var(--np-gap); margin: 0; padding: 0; }
.np-step { position: relative; display: grid; grid-template-columns: 56px minmax(0, 1fr); column-gap: 20px; align-items: start; align-content: start; }
.np-step-text { padding-top: 14px; max-width: 34rem; }
.np-stop { position: relative; z-index: 1; display: grid; place-items: center; width: 56px; height: 56px; border-radius: 999px; background: #fffaf1; color: #1b4560;
  box-shadow: inset 0 0 0 5px #2fa8b0, inset 0 -2px 0 6px rgba(0,60,70,.16), 0 1px 0 rgba(255,255,255,.6), 0 10px 18px -12px rgba(70,50,30,.6); }
.np-seg { position: absolute; z-index: 0; overflow: visible; pointer-events: none; }
.np-seg-v { left: 22px; top: 28px; width: 12px; height: calc(100% + var(--np-gap)); }
.np-seg-h { display: none; }
@media (min-width: 1280px) {
  .np-path { --np-gap: 32px; grid-template-columns: repeat(5, minmax(0, 1fr)); column-gap: var(--np-gap); }
  .np-step { grid-template-columns: minmax(0, 1fr); row-gap: 22px; }
  .np-step-text { padding-top: 0; padding-right: 4px; }
  .np-seg-v { display: none; }
  .np-seg-h { display: block; left: 28px; top: 22px; height: 12px; width: calc(100% + var(--np-gap)); }
}

/* the fifteen-minute clock on the closing sheet */
.np-clock { position: relative; width: 184px; height: 184px; border-radius: 999px; background: #f4eee5;
  box-shadow: 0 2px 0 rgba(0,0,0,.10), 0 28px 44px -26px rgba(0,0,0,.75); }
@media (min-width: 1024px) { .np-clock { width: 240px; height: 240px; } }

@media (forced-colors: active) {
  .np-stop, .np-clock { border: 2px solid CanvasText; }
}

@media (min-width: 1280px) and (prefers-reduced-motion: no-preference) {
  /* wide screens: each stop rises as the line reaches it, and the line runs on to the next */
  .hp-body .np-path > [data-reveal] { transition-delay: calc(var(--i, 0) * .5s); }
  .hp-body .np-path > [data-reveal] .np-seg .hp-felt-line { transition: stroke-dashoffset .6s cubic-bezier(.45,.05,.55,.95); transition-delay: calc(.35s + var(--i, 0) * .5s); }
}
`;
