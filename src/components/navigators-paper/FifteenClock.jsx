/*
 * The closing call's one big figure: a paper clock face with the first quarter
 * hour marked in the film's felt teal (the kit draws the felt arc when the clock
 * drops onto the sheet). Decorative: the heading beside it says it in words.
 *
 * figure: the number taken from the heading (e.g. '15').
 */
const TICKS = Array.from({ length: 12 }, (_, i) => i * 30);

export default function FifteenClock({ figure, className = '' }) {
  return (
    <div data-reveal='drop' aria-hidden='true' className={`hp-note-pin ${className}`} style={{ '--r': '-4deg' }}>
      <div className='np-clock'>
        <svg viewBox='0 0 220 220' focusable='false' className='absolute inset-0 h-full w-full overflow-visible'>
          {TICKS.map((deg) => (
            <line
              key={deg}
              className='np-tick'
              x1='110'
              y1={deg % 90 === 0 ? 34 : 37}
              x2='110'
              y2='46'
              stroke='#1b4560'
              strokeOpacity={deg % 90 === 0 ? 0.55 : 0.32}
              strokeWidth={deg % 90 === 0 ? 3 : 2}
              strokeLinecap='round'
              transform={`rotate(${deg} 110 110)`}
            />
          ))}
          {/* a quarter of the dial: twelve o'clock round to three */}
          <g className='hp-felt'>
            <path className='hp-felt-line' d='M110 17A93 93 0 0 1 203 110' pathLength='1' fill='none' stroke='#2fa8b0' strokeWidth='11' strokeLinecap='round' />
            <path className='hp-felt-line' d='M110 15A95 95 0 0 1 205 110' pathLength='1' fill='none' stroke='#71cfcf' strokeOpacity='.6' strokeWidth='1.6' strokeLinecap='round' />
          </g>
        </svg>
        <span className='absolute inset-0 grid place-items-center'>
          <span className='text-center'>
            <span className='block font-[family-name:var(--font-hh-display)] text-[3.5rem] leading-none text-[#1b4560] [font-variant-numeric:lining-nums] lg:text-[4.5rem]'>{figure}</span>
            <span className='mt-1 block text-[0.9375rem] font-semibold text-[#3f5868] lg:text-[1rem]'>min</span>
          </span>
        </span>
      </div>
    </div>
  );
}
