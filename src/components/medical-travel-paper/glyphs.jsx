/*
 * Small solid glyphs for the journey loop: a filled silhouette reads at
 * 16-22px where an outline icon blurs.
 *
 * PlaneGlyph: a small solid airliner seen from above, nose up (rotate it to
 * point the way it flies).
 */
export function PlaneGlyph({ className = '', style }) {
  return (
    <svg aria-hidden='true' viewBox='0 0 24 24' className={className} style={style} fill='currentColor'>
      <path d='M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z' />
    </svg>
  );
}

/* HouseGlyph: home, where the loop starts and ends */
export function HouseGlyph({ className = '' }) {
  return (
    <svg aria-hidden='true' viewBox='0 0 24 24' className={className} fill='currentColor'>
      <path d='M12 2.8 1.8 11.2l1.3 1.5L4.6 11.5V21h5.6v-5.6h3.6V21h5.6v-9.5l1.5 1.2 1.3-1.5z' />
    </svg>
  );
}
