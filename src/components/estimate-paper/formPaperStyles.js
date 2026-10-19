/*
 * Local styles for the two conversion pages (/estimate, /schedule) in the paper
 * world. They extend the kit (paperStyles.js) without changing it: the opening
 * sheet's grid, the paper form card with its fields set into the paper, the
 * feedback slips, and the paper panel that holds the booking calendar.
 *
 * MUI sits in @layer mui, so these plain rules win without !important; the
 * selectors start with .hp-form.hp-est so they also outrank the kit's .hp-form
 * rules whatever the order of the style tags.
 */
export const FORM_PAPER_CSS = `
/* opening sheet: the words, then the working panel (form or calendar), then the
   film frame. On a phone the panel comes straight after the words. */
.hp-fs-grid { display: grid; grid-template-columns: minmax(0, 1fr); grid-template-areas: "words" "panel" "frame"; row-gap: 28px; }
.hp-fs-words { grid-area: words; max-width: 44rem; }
.hp-fs-panel { grid-area: panel; min-width: 0; }
.hp-fs-frame { grid-area: frame; }
.hp-fs-side .hp-fs-panel, .hp-fs-frame { max-width: 44rem; width: 100%; }
@media (min-width: 768px) { .hp-fs-grid { row-gap: 40px; } }
@media (min-width: 1024px) {
  /* form beside the words; the frame under the words */
  .hp-fs-side .hp-fs-grid { grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); grid-template-rows: auto 1fr; grid-template-areas: "words panel" "frame panel"; column-gap: 56px; row-gap: 40px; align-items: start; }
  .hp-fs-side .hp-fs-panel, .hp-fs-side .hp-fs-frame { max-width: none; }
  /* the road frame keeps the form company while it scrolls past */
  .hp-fs-side .hp-fs-frame { position: sticky; top: 96px; align-self: start; }
  /* frame beside the words; the calendar across the whole width under them */
  .hp-fs-below .hp-fs-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); grid-template-areas: "words frame" "panel panel"; column-gap: 56px; row-gap: 48px; align-items: center; }
  .hp-fs-below .hp-fs-frame { max-width: none; }
}
/* on desktop the frame is in the first screen: it slides up out of its slot on load,
   like PageHero's; on a phone it sits below the panel and reveals on scroll instead */
@media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
  .hp-fs-frame .hp-window { animation: hp-slot 1.1s var(--hp-ease) .25s both; }
}

/* the form, on a sheet of note paper laid on the page */
.hp-est-card { position: relative; background: #fffaf1; border-radius: 16px; box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 26px 44px -28px rgba(70,50,30,.6); }
.hp-est-fields { container-type: inline-size; }
.hp-est-grid { display: grid; grid-template-columns: minmax(0, 1fr); row-gap: 20px; }
@container (min-width: 520px) {
  .hp-est-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 16px; row-gap: 22px; }
  .hp-est-wide { grid-column: 1 / -1; }
}

/* fields are pressed into the paper: a slightly darker well with an inner shadow */
.hp-form.hp-est .MuiOutlinedInput-root { background: #f5efe5; box-shadow: inset 0 2px 3px -1px rgba(70,50,30,.18); color: #1b4560; font-family: inherit; }
.hp-form.hp-est .MuiOutlinedInput-root.Mui-focused { background: #fffdf8; }
.hp-form.hp-est .MuiOutlinedInput-root.Mui-disabled { background: #efe8dc; box-shadow: none; }
.hp-form.hp-est .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline { border-color: rgba(27,69,96,.22); border-style: dashed; }
.hp-form.hp-est .MuiInputBase-input::placeholder { color: #5b7180; opacity: 1; }
.hp-form.hp-est .hp-est-ph { color: #5b7180; }
.hp-form.hp-est .MuiInputBase-input.Mui-disabled { -webkit-text-fill-color: #50677a; }
.hp-form.hp-est .MuiSvgIcon-root { color: #3f5868; }
.hp-form.hp-est .Mui-disabled .MuiSvgIcon-root { color: rgba(63,88,104,.45); }

.hp-est-submit { width: 100%; cursor: pointer; }
.hp-est .hp-est-submit:disabled { cursor: wait; opacity: .85; transform: none; }

/* answers after a submit: a slip on the form */
.hp-est-note { display: flex; gap: 12px; align-items: flex-start; margin: 16px 0 0; padding: 14px 16px; border-radius: 10px; font-size: .9375rem; line-height: 1.55; }
.hp-est-note svg { flex: none; width: 20px; height: 20px; margin-top: 1px; }
.hp-est-ok { background: rgba(47,168,176,.14); color: #1b4560; box-shadow: inset 3px 0 0 #00796b; }
.hp-est-ok svg { color: #00796b; }
.hp-est-err { background: rgba(179,38,30,.07); color: #7a1d17; box-shadow: inset 3px 0 0 #b3261e; }
.hp-est-err svg { color: #b3261e; }

/* the booking calendar: Google's page shows through a window cut in a paper panel */
.hp-cal-panel { background: #fffaf1; border-radius: 16px; padding: 8px; box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 26px 44px -28px rgba(70,50,30,.6); }
.hp-cal-window { position: relative; border-radius: 10px; overflow: hidden; background: #fff; }
.hp-cal-window::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  box-shadow: inset 3px 4px 8px -2px rgba(70,50,30,.32), inset 0 0 0 1px rgba(70,50,30,.16); }
@media (min-width: 640px) { .hp-cal-panel { padding: 12px; } }
@media (min-width: 1024px) { .hp-cal-panel { padding: 16px; } }

@media (prefers-contrast: more) {
  .hp-form.hp-est .MuiInputBase-input::placeholder, .hp-form.hp-est .hp-est-ph { color: #1b4560; }
  .hp-form.hp-est .MuiOutlinedInput-notchedOutline { border-color: rgba(27,69,96,.6); }
}
@media (forced-colors: active) {
  .hp-est-card, .hp-cal-panel, .hp-est-note { border: 1px solid CanvasText; }
}
`;
