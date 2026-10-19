/*
 * Shared look for the paper body under the maze hero (branch
 * redesign/without-the-maze-hero).
 *
 * The page is a stack of paper sheets from the brand film: cream and kraft
 * sheets with a deckled top edge, one navy sheet, and film frames set into
 * windows cut in the paper (same window as the hero). Colours are the logo's
 * and the theme's: navy ink #1b4560, teal button #00796b, felt teal #2fa8b0 /
 * #71cfcf, purple accent #8e24aa.
 *
 * Motion is armed by usePaperMotion only when the visitor allows motion: it marks
 * each element it watches [data-armed] and adds [data-in] when it arrives. Every
 * hidden state below needs [data-armed] without [data-in], so the server HTML,
 * reduced motion, no-JS, and any element mounted after arming all render the
 * finished page. Nothing can be stranded hidden.
 */

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .38 0 0 0 0 .3 0 0 0 .06 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* a 240px tile of deckled paper edge; it starts and ends on the same height and
   slope, so it repeats without a seam */
const EDGE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='12'%3E%3Cpath d='M0 12V6C20 9 40 9 60 6S100 3 120 6S160 9 180 6S220 3 240 6V12Z'/%3E%3C/svg%3E\")";

const BODY_CSS = `
.hp-body { --hp-ease: cubic-bezier(.2,.8,.2,1); overflow-x: clip; }
.hp-sheet { position: relative; background-image: ${NOISE}; }
.hp-cream { background-color: #f4eee5; }
.hp-kraft { background-color: #e9dfcf; }
.hp-navy { background-color: #1b4560; }
/* every sheet lays its deckled edge over the one above it */
.hp-sheet::before { content: ""; position: absolute; left: 0; right: 0; top: -11px; height: 12px; background: inherit;
  -webkit-mask-image: ${EDGE}; mask-image: ${EDGE}; -webkit-mask-size: 240px 12px; mask-size: 240px 12px; -webkit-mask-repeat: repeat-x; mask-repeat: repeat-x; pointer-events: none; }

/* a window cut into the paper, as in the hero */
.hp-window { position: relative; aspect-ratio: 16 / 9; border-radius: 10px; overflow: hidden; background: #d1c5b4; }
.hp-window::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  box-shadow: inset 4px 5px 9px -2px rgba(70,50,30,0.38), inset 0 0 0 1px rgba(70,50,30,0.16), inset 0 -2px 0 rgba(255,250,240,0.55); }
.hp-window-lip { position: absolute; left: 6px; right: 6px; bottom: -3px; height: 3px; border-radius: 0 0 8px 8px; background: rgba(255,252,246,0.85); }
.hp-navy .hp-window-lip { background: rgba(255,252,246,0.25); }
.hp-window.is-playing::after { display: none; }
.hp-still { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hp-film { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; background: #000; visibility: hidden; }
.hp-window.is-playing .hp-film { visibility: visible; }

/* felt underline under a heading's key words */
.hp-felt { filter: drop-shadow(0 2px 0 rgba(20,60,70,0.22)); }
.hp-felt-line { stroke-dasharray: 1; stroke-dashoffset: 0; }

/* felt markers for lists: grey maze tiles for the problems, the teal path for what we do */
.hp-tile { flex: none; width: 22px; height: 10px; border-radius: 999px; margin-top: .55em; background: #8a9299; box-shadow: inset 0 -2px 0 rgba(0,0,0,.14), 0 1px 0 rgba(255,255,255,.6); }
.hp-tile-teal { background: #2fa8b0; box-shadow: inset 0 -2px 0 rgba(0,60,70,.22), inset 0 1px 0 rgba(255,255,255,.35), 0 1px 0 rgba(255,255,255,.6); }

/* Lists in the paper body are div role=list/listitem, not ul/ol/li: the site
   theme paints any hovered <main> li solid teal with white text (theme.js,
   'main ul li:hover', in @layer mui with !important, which no unlayered rule
   can override). */

/* buttons take the page font (the browser default is Arial) */
.hp-body button { font-family: inherit; }

/* focus on links: the brand ring; links inside headings can wrap across lines, where
   a ring would cut through the words around them, so they get a navy tint that
   follows each line instead (an outline again in forced colours) */
.hp-body a:not(.hp-btn):focus-visible { outline: 2px solid #1b4560; outline-offset: 2px; border-radius: 3px; }
.hp-body h2 a:not(.hp-btn):focus-visible, .hp-body h3 a:not(.hp-btn):focus-visible { outline: none; background: rgba(27,69,96,.10); border-radius: 4px; -webkit-box-decoration-break: clone; box-decoration-break: clone; text-decoration-thickness: 3px; }
@media (forced-colors: active) { .hp-body h2 a:not(.hp-btn):focus-visible, .hp-body h3 a:not(.hp-btn):focus-visible { outline: 2px solid LinkText; } }

/* sticky story: the frames stack in one window and cross-fade */
.hp-story-frame { position: absolute; inset: 0; opacity: 0; }
.hp-story-frame.hp-frame-on { opacity: 1; }
.hp-step-num { color: #00796b; }
@media (min-width: 1024px) {
  .hp-step-num { color: #5b7180; }
  .hp-step-on { background: #fffaf1; box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 14px 26px -18px rgba(70,50,30,.55); }
  .hp-step-on .hp-step-num { color: #00796b; }
}

/* patient notes pinned to the board */
.hp-note-pin { transform: rotate(var(--r, 0deg)); }
.hp-note { background: #fffaf1; box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 14px 26px -18px rgba(70,50,30,.55); }
/* phones: the notes lie in a pile, each one lower, smaller and more crooked the deeper it
   sits (--d); only the top three show */
.hp-pile-note { transform: translateY(calc(var(--d) * 9px)) rotate(calc(var(--r) * (1 + var(--d) * .8))) scale(calc(1 - var(--d) * .035)); transform-origin: 50% 0; opacity: clamp(0, calc(3 - var(--d)), 1); }

/* the Cancun postcard */
.hp-postcard { background: #fbf7ef; transform: rotate(2.2deg); box-shadow: 0 2px 0 rgba(0,0,0,.08), 0 28px 44px -26px rgba(0,0,0,.65); }

/* FAQ */
.hp-faq summary { list-style: none; }
.hp-faq summary::-webkit-details-marker { display: none; }
.hp-faq details[open] .hp-faq-icon { transform: rotate(45deg); background: #00796b; color: #fff; }

.hp-btn:active { transform: translateY(1px) scale(.98); }

/* Increase Contrast: muted inks go to the navy ink, hairlines get stronger */
@media (prefers-contrast: more) {
  .hp-body .text-\\[\\#3f5868\\], .hp-body .text-\\[\\#5b7180\\], .hp-body .text-\\[\\#2f4a5b\\], .hh-hero .text-\\[\\#445e6e\\] { color: #1b4560; }
  .hp-navy .text-\\[\\#d3dde2\\], .hp-navy .text-\\[\\#c6d3da\\], .hp-navy .text-\\[\\#9fdcdc\\] { color: #f4eee5; }
  .hp-step-num { color: #1b4560; }
  .hp-body [class*='border-[rgba(27,69,96'] { border-color: rgba(27,69,96,.55); }
}

/* forced colours (Windows high contrast): keep the felt markers and the progress,
   and draw outlines on the paper objects that lose their fills */
@media (forced-colors: active) {
  .hp-tile, .hp-progress span { forced-color-adjust: none; }
  .hp-window, .hp-note, .hp-postcard, .hp-step-on { border: 1px solid CanvasText; }
}

@media (prefers-reduced-motion: no-preference) {
  .hp-btn { transition: transform .18s var(--hp-ease), background-color .18s ease, box-shadow .18s ease; }
  .hp-btn:hover { transform: translateY(-2px); }
  .hp-more svg { transition: transform .2s var(--hp-ease); }
  .hp-more:hover svg { transform: translateX(3px); }
  .hp-play-badge { transition: transform .25s var(--hp-ease); }
  .hp-window:hover .hp-play-badge { transform: scale(1.08); }
  .hp-story-frame { transition: opacity .55s ease, transform .9s var(--hp-ease); transform: scale(1.04); }
  .hp-story-frame.hp-frame-on { transform: none; }
  .hp-step { transition: background-color .35s ease, box-shadow .35s ease; }
  .hp-step-num { transition: color .35s ease; }
  .hp-progress span { transition: background-color .4s ease; }
  .hp-faq-icon { transition: transform .25s var(--hp-ease), background-color .2s ease; }
  .hp-note { transition: transform .3s var(--hp-ease), box-shadow .3s ease; }
  .hp-note-pin .hp-note:hover { transform: translateY(-4px) rotate(calc(var(--r, 0deg) * -1)); box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 22px 34px -20px rgba(70,50,30,.6); }
  .hp-pile-note { transition: transform .45s var(--hp-ease), opacity .35s ease; }
  /* the read note slides off to the left, then tucks in at the back */
  .hp-pile-note.hp-pile-leave { transform: translate(-115%, -2%) rotate(-12deg); transition: transform .26s cubic-bezier(.4,0,1,1); }
  .hp-faq summary:hover .hp-faq-icon { background: rgba(0,121,107,.16); }
  .hp-faq details[open] summary:hover .hp-faq-icon { background: #00695c; }
  @supports (interpolate-size: allow-keywords) {
    .hp-faq { interpolate-size: allow-keywords; }
    .hp-faq details::details-content { height: 0; overflow: clip; transition: height .35s var(--hp-ease), content-visibility .35s allow-discrete; }
    .hp-faq details[open]::details-content { height: auto; }
  }

  /* reveal on scroll: the observed element is never clipped itself */
  .hp-body [data-reveal] { transition: opacity .7s ease, transform .9s var(--hp-ease); transition-delay: calc(var(--i, 0) * 90ms); }
  .hp-body [data-reveal='rise'][data-armed]:not([data-in]) { opacity: 0; transform: translateY(30px); }
  .hp-body [data-reveal='lay'][data-armed]:not([data-in]) { opacity: 0; transform: translateY(18px) rotate(-5deg); }
  .hp-body [data-reveal='drop'][data-armed]:not([data-in]) { opacity: 0; transform: translateY(-44px) rotate(calc(var(--r, 0deg) + 6deg)); }
  .hp-body [data-reveal='card'][data-armed]:not([data-in]) { opacity: 0; transform: translate(70px, 30px) rotate(9deg); }
  /* windows are pulled up out of a slot in the paper */
  .hp-body [data-reveal='slot'] .hp-window { transition: clip-path 1s var(--hp-ease); transition-delay: calc(var(--i, 0) * 90ms); }
  .hp-body [data-reveal='slot'] .hp-window .hp-still { transition: transform 1.5s var(--hp-ease); }
  .hp-body [data-reveal='slot'][data-armed]:not([data-in]) .hp-window { clip-path: inset(100% 0 0 0 round 10px); }
  .hp-body [data-reveal='slot'][data-armed]:not([data-in]) .hp-window .hp-still { transform: scale(1.14) translateY(5%); }
  .hp-body [data-reveal] .hp-felt-line { transition: stroke-dashoffset 1.1s cubic-bezier(.65,.05,.25,1) .45s; }
  .hp-body [data-reveal][data-armed]:not([data-in]) .hp-felt-line { stroke-dashoffset: 1; }

  /* scroll-linked (--p runs 0..1 as the element rises into place; 1 by default) */
  .hp-scrub-zoom .hp-still { transform: scale(calc(1.16 - .16 * var(--p, 1))); transform-origin: 50% 40%; }
  .hp-scrub-grow { transform: scale(calc(.9 + .1 * var(--p, 1))); transform-origin: 50% 100%; }
}
`;

const FELT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 18' preserveAspectRatio='none'%3E%3Cpath d='M3 11c40-8 70 4 104-2s58-9 92-3 60 6 98-4' fill='none' stroke='%232fa8b0' stroke-width='6.5' stroke-linecap='round'/%3E%3Cpath d='M6 9.6c40-8 70 4 102-2s58-9 92-3 58 6 96-4' fill='none' stroke='%2371cfcf' stroke-opacity='.55' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E\")";

/* The page kit (PageHero, Sheet, SectionHead, ClosingCall, prose, forms) shared by
   the inner pages. Same rules as above: every load-time animation is a plain CSS
   animation that ends visible, and every scroll state needs [data-armed]. */
const KIT_CSS = `
.hp-sheet.hp-first::before { display: none; }

/* a felt underline that follows wrapped lines (one stroke per line fragment) */
.hp-felt-text { background-image: ${FELT}; background-repeat: no-repeat; background-position: 0 100%; background-size: 100% .3em; -webkit-box-decoration-break: clone; box-decoration-break: clone; padding-bottom: .12em; }

/* reading pages: legal text and articles */
.hp-prose { color: #3f5868; font-size: 1.0625rem; line-height: 1.7; }
.hp-prose > :first-child { margin-top: 0; }
.hp-prose h2 { font-family: var(--font-hh-display); font-weight: 400; color: #1b4560; font-size: clamp(1.5rem, 2.4vw, 1.875rem); line-height: 1.2; margin: 2.2em 0 .6em; }
.hp-prose h3 { font-family: var(--font-hh-display); font-weight: 400; color: #1b4560; font-size: 1.3rem; line-height: 1.25; margin: 1.8em 0 .5em; }
.hp-prose h4 { color: #1b4560; font-size: 1.0625rem; font-weight: 600; margin: 1.5em 0 .4em; }
.hp-prose p { margin: 0 0 1.1em; }
.hp-prose strong { color: #1b4560; font-weight: 600; }
.hp-prose em { font-style: italic; }
.hp-prose a { color: #00695c; text-decoration: underline; text-decoration-color: rgba(0,105,92,.35); text-underline-offset: 3px; }
.hp-prose a:hover { text-decoration-color: #00695c; }
.hp-prose [role='list'] { margin: 0 0 1.2em; display: flex; flex-direction: column; gap: .5em; counter-reset: hp-ol; }
.hp-prose [role='listitem'] { display: flex; gap: .8em; }
.hp-prose [role='listitem']::before { content: ''; flex: none; width: 16px; height: 8px; border-radius: 999px; margin-top: .66em; background: #2fa8b0; box-shadow: inset 0 -2px 0 rgba(0,60,70,.22); }
.hp-prose [data-ordered] > [role='listitem'] { counter-increment: hp-ol; }
.hp-prose [data-ordered] > [role='listitem']::before { content: counter(hp-ol) '.'; width: 1.5em; height: auto; margin-top: 0; border-radius: 0; background: none; box-shadow: none; color: #00796b; font-weight: 600; font-variant-numeric: lining-nums; }
.hp-prose hr { border: 0; border-top: 1px dashed rgba(27,69,96,.28); margin: 2.2em 0; }
.hp-prose blockquote { margin: 1.4em 0; padding: 1em 1.25em; background: #fffaf1; border-radius: 8px; color: #1b4560; box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 14px 26px -18px rgba(70,50,30,.55); }
.hp-prose img { max-width: 100%; height: auto; border-radius: 10px; }
.hp-prose table { width: 100%; border-collapse: collapse; margin: 0 0 1.4em; font-size: .9375rem; }
.hp-prose th, .hp-prose td { text-align: left; padding: .6em .75em; border-bottom: 1px solid rgba(27,69,96,.16); }
.hp-prose th { color: #1b4560; font-weight: 600; }

/* MUI form fields on paper (MUI sits in @layer mui, so these plain rules win) */
.hp-form .MuiOutlinedInput-root { background: #fffaf1; border-radius: 10px; }
.hp-form .MuiOutlinedInput-notchedOutline { border-color: rgba(27,69,96,.3); }
.hp-form .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline { border-color: rgba(27,69,96,.55); }
.hp-form .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: #00796b; border-width: 2px; }
.hp-form .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline { border-color: #b3261e; }
.hp-form .MuiInputLabel-root { color: #3f5868; }
.hp-form .MuiInputLabel-root.Mui-focused { color: #00695c; }
.hp-form .MuiInputLabel-root.Mui-error, .hp-form .MuiFormHelperText-root.Mui-error { color: #b3261e; }

@keyframes hp-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes hp-slot { from { clip-path: inset(100% 0 0 0 round 10px); } to { clip-path: inset(0 0 0 0 round 10px); } }
@keyframes hp-felt { from { background-size: 0% .3em; } to { background-size: 100% .3em; } }
@media (prefers-reduced-motion: no-preference) {
  /* page heroes on load */
  .hp-load { animation: hp-rise .8s var(--hp-ease) both; }
  .hp-load-2 { animation-delay: .1s; } .hp-load-3 { animation-delay: .2s; } .hp-load-4 { animation-delay: .3s; }
  .hp-load-window .hp-window { animation: hp-slot 1.1s var(--hp-ease) .15s both; }
  .hp-load .hp-felt-text { animation: hp-felt 1.1s cubic-bezier(.65,.05,.25,1) .6s both; }
  /* section headings draw their felt line when revealed */
  .hp-body [data-reveal] .hp-felt-text { transition: background-size 1.1s cubic-bezier(.65,.05,.25,1) .45s; }
  .hp-body [data-reveal][data-armed]:not([data-in]) .hp-felt-text { background-size: 0% .3em; }
}
`;

export const PAPER_CSS = BODY_CSS + KIT_CSS;

export const cls = {
  wrap: 'mx-auto w-full max-w-[1360px] px-4 sm:px-8 lg:px-12',
  pad: 'py-[72px] lg:py-[112px]',
  h1: 'm-0 font-[family-name:var(--font-hh-display)] text-[clamp(2.1rem,3.6vw,3.2rem)] font-normal leading-[1.08] tracking-[-0.01em] text-[#1b4560] [overflow-wrap:break-word] [text-wrap:balance]',
  h2: 'm-0 font-[family-name:var(--font-hh-display)] text-[clamp(1.9rem,3.2vw,2.8rem)] font-normal leading-[1.1] tracking-[-0.01em] text-[#1b4560] [overflow-wrap:break-word] [text-wrap:balance]',
  h3: 'm-0 font-[family-name:var(--font-hh-display)] text-[1.375rem] font-normal leading-[1.22] text-[#1b4560] lg:text-[1.5rem]',
  lead: 'mb-0 mt-4 max-w-[40rem] text-[1.0625rem] leading-[1.6] text-[#3f5868] [text-wrap:pretty] sm:text-[1.1875rem]',
  body: 'm-0 text-[1rem] leading-[1.6] text-[#3f5868]',
  label: 'm-0 text-[0.9375rem] font-semibold text-[#1b4560]',
  btnPrimary:
    'hp-btn inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border-2 border-solid border-transparent bg-[#00796b] px-6 [&>svg]:shrink-0 text-[1.0625rem] font-semibold text-white no-underline shadow-[0_10px_24px_-12px_rgba(0,105,92,0.7)] hover:bg-[#00695c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#1b4560]',
  btnOutline:
    'hp-btn inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full border-2 border-solid border-[#1b4560] bg-transparent px-6 [&>svg]:shrink-0 text-[1.0625rem] font-semibold text-[#1b4560] no-underline hover:bg-[rgba(27,69,96,0.06)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#1b4560]',
  more: 'hp-more inline-flex min-h-11 items-center gap-1.5 font-semibold text-[#00695c] underline decoration-[rgba(0,105,92,0.35)] underline-offset-4 hover:decoration-[#00695c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1b4560]',
};

/* the site's copy carries a trailing arrow in a few CTA strings; the icon draws it instead */
export const noArrow = (s) => (typeof s === 'string' ? s.replace(/\s*(→|→)\s*$/, '') : s);
