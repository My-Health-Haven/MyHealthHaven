/*
 * Local styles for the paper Medical Travel page (on top of the shared kit in
 * src/components/paper). Same rules as the kit: every hidden state needs the
 * kit's [data-armed] without [data-in], so the server HTML, reduced motion and
 * no-JS always show the finished page.
 *
 * The journey loop: the ten steps of the care timeline sit on one felt road.
 * Desktop: a round trip. Steps 1-5 run left to right along the top road, a
 * dashed flight arc turns down on the right, steps 6-10 run back right to left
 * along the lower road, and both roads meet at home on the left. Below 1024px
 * the same road runs down the left edge and ends at home. One DOM for both:
 * subgrid places each step's text and road in the loop's rows on desktop.
 */
export const TRAVEL_CSS = `
/* the hero title: each half balanced on its own; a slightly wider text column */
.mt-bal { display: inline-block; max-width: 100%; text-wrap: balance; }
@media (min-width: 1024px) { .mt-hero > div { grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr); } }

/* Where we operate: the operations map in a window cut into the paper */
.hp-window.mt-map { aspect-ratio: auto; height: 400px; }
@media (min-width: 768px) { .hp-window.mt-map { height: 460px; } }
@media (min-width: 1024px) { .hp-window.mt-map { height: auto; aspect-ratio: 5 / 4; } }
.mt-map iframe { position: absolute; inset: 0; display: block; }

/* Why Cancun: the back of the postcard */
.hp-postcard.mt-back { transform: rotate(.6deg); }
@media (min-width: 1024px) { .hp-postcard.mt-back { transform: rotate(1.1deg); } }
.mt-stamp { position: absolute; display: block; width: 54px; height: 64px; padding: 5px; transform: rotate(4deg);
  background: radial-gradient(circle, transparent 2.6px, #fffaf1 3.1px) -4.5px -4.5px / 9px 9px;
  filter: drop-shadow(0 1px 1px rgba(70,50,30,.28)); }
.mt-stamp-face { display: grid; place-items: center; width: 100%; height: 100%; background: #00796b; color: #f4eee5;
  box-shadow: inset 0 0 0 2px rgba(244,238,229,.35), inset 0 -3px 0 rgba(0,40,40,.25); }
.mt-postmark { position: absolute; display: none; pointer-events: none; }
@media (min-width: 640px) { .mt-stamp { width: 64px; height: 76px; } .mt-postmark { display: block; } }

/* the journey loop */
.mt-disc { display: grid; place-items: center; flex: none; width: 52px; height: 52px; border-radius: 999px;
  background: #fffaf1; color: #1b4560; font-family: var(--font-hh-display); font-size: 1.375rem; line-height: 1;
  font-variant-numeric: lining-nums;
  box-shadow: inset 0 0 0 3px #2fa8b0, inset 0 -4px 0 rgba(0,60,70,.10), 0 2px 0 rgba(70,50,30,.12), 0 12px 18px -12px rgba(70,50,30,.55); }
.mt-disc-on { background: #00796b; color: #fffaf1;
  box-shadow: inset 0 -4px 0 rgba(0,40,40,.28), inset 0 1px 0 rgba(255,255,255,.25), 0 2px 0 rgba(70,50,30,.12), 0 12px 18px -12px rgba(70,50,30,.55); }
.mt-seg { position: relative; display: flex; }
.mt-pw { display: flex; align-items: center; justify-content: center; }
.mt-piece { display: block; border-radius: 999px; background: #2fa8b0;
  box-shadow: inset 0 -2px 0 rgba(0,60,70,.22), inset 0 1px 0 rgba(255,255,255,.35), 0 1px 0 rgba(255,255,255,.6);
  transform: translateY(var(--y, 0px)) rotate(var(--r, 0deg)); }
.mt-plane, .mt-house { position: absolute; display: none; place-items: center; border-radius: 999px; pointer-events: none; }
.mt-plane { width: 34px; height: 34px; background: #fffaf1; color: #00796b; box-shadow: 0 0 0 2px rgba(0,121,107,.35), 0 6px 12px -8px rgba(70,50,30,.5); }
.mt-plane svg { transform: rotate(var(--rot, 0deg)); }
.mt-house { width: 46px; height: 46px; background: #1b4560; color: #f4eee5;
  box-shadow: inset 0 -3px 0 rgba(0,0,0,.22), 0 2px 0 rgba(70,50,30,.12), 0 12px 18px -12px rgba(70,50,30,.6); }
.mt-cap { display: none; position: relative; }
.mt-cap svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.mt-road-felt { filter: drop-shadow(0 2px 0 rgba(20,60,70,.22)); }

/* reveal order: --id runs along the whole loop on desktop, --im restarts at each
   step on phones (each step scrolls in on its own there) */
.mt-loop [data-reveal] { --i: var(--im, 0); }
@media (prefers-reduced-motion: no-preference) {
  .hp-body .mt-loop [data-reveal] .hp-felt-line { transition-duration: .8s; transition-delay: calc(var(--i, 0) * 90ms); }
}

@media (min-width: 1024px) {
  .mt-loop [data-reveal] { --i: var(--id, 0); }
  .mt-loop { display: grid; grid-template-columns: 64px repeat(5, minmax(0, 1fr)) 76px; grid-template-rows: auto 52px 72px 52px auto; }
  .mt-stop { display: grid; grid-template-rows: subgrid; grid-column: var(--col); }
  .mt-stop[data-lane='1'] { grid-row: 1 / 3; }
  .mt-stop[data-lane='2'] { grid-row: 4 / 6; }
  .mt-stop[data-lane='1'] .mt-text { grid-row: 1; align-self: end; padding: 0 18px 20px 2px; }
  .mt-stop[data-lane='1'] .mt-road { grid-row: 2; }
  .mt-stop[data-lane='2'] .mt-road { grid-row: 1; }
  .mt-stop[data-lane='2'] .mt-text { grid-row: 2; padding: 20px 18px 0 2px; }
  .mt-road { display: flex; align-items: center; min-width: 0; }
  .mt-seg { flex: 1; align-self: stretch; align-items: center; gap: 5px; padding: 0 5px; min-width: 0; }
  .mt-pw { flex: 1 1 0; min-width: 0; height: 100%; }
  .mt-piece { width: 100%; height: 12px; }
  .mt-seg[data-d='flight'] { gap: 8px; }
  .mt-seg[data-d='flight'] .mt-piece { height: 3px; border-radius: 2px; background: #00796b; box-shadow: none; transform: none; }
  .mt-plane-d { display: grid; left: 50%; top: 50%; margin: -17px 0 0 -17px; }
  .mt-cap { display: block; grid-row: 2 / 5; }
  .mt-cap-l { grid-column: 1; }
  .mt-cap-r { grid-column: 7; }
  .mt-cap .mt-house { display: grid; left: -21px; top: 65px; }
  .mt-cap .mt-plane { display: grid; left: 45px; top: 71px; }
}
@media (min-width: 1024px) and (max-width: 1279.98px) {
  .mt-seg .mt-pw:nth-child(5) { display: none; }
}
@media (max-width: 1023.98px) {
  .mt-loop { display: flex; flex-direction: column; }
  .mt-stop { display: grid; grid-template-columns: 52px minmax(0, 1fr); column-gap: 20px; }
  .mt-text { grid-column: 2; grid-row: 1; padding: 12px 0 44px; }
  .mt-road { grid-column: 1; grid-row: 1; display: flex; flex-direction: column; align-items: center; }
  .mt-seg { flex: 1; flex-direction: column; align-items: center; gap: 6px; padding: 6px 0; width: 14px; }
  .mt-pw { flex: 1 1 0; width: 100%; min-height: 14px; }
  .mt-seg .mt-pw:nth-child(n+4) { display: none; }
  .mt-piece { width: 12px; height: 100%; }
  .mt-seg[data-m='flight'] { gap: 8px; }
  .mt-seg[data-m='flight'] .mt-pw:nth-child(n+4) { display: flex; }
  .mt-seg[data-m='flight'] .mt-piece { width: 3px; border-radius: 2px; background: #00796b; box-shadow: none; transform: none; }
  .mt-plane-m { display: grid; left: 50%; top: 50%; margin: -17px 0 0 -17px; }
  .mt-home-end { position: relative; display: grid; width: 46px; height: 46px; margin-top: 2px; }
  .mt-home-end .mt-house { display: grid; inset: 0; }
  .mt-stop:last-child .mt-text { padding-bottom: 8px; }
}
/* tablets: two columns of road, 1-5 then 6-10 */
@media (min-width: 768px) and (max-width: 1023.98px) {
  .mt-loop { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(5, auto); grid-auto-flow: column; column-gap: 40px; }
}
@media (min-width: 1024px) { .mt-home-end { display: none; } }

@media (forced-colors: active) {
  .mt-piece, .mt-disc, .mt-house, .mt-plane, .mt-stamp-face { forced-color-adjust: none; }
}
`;
