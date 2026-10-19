/* Film frames ship pre-sized (public/home/<name>.webp at 1600w and <name>-800.webp),
   as the hero's stills do, so they skip the runtime image optimizer. */
export const frameSrcSet = (src) => `${src.replace(/\.webp$/, '-800.webp')} 800w, ${src} 1600w`;

/* A film frame set into a window cut in the paper (16:9, the film's own ratio).
   Frames in the first screen (page heroes) pass loading='eager' fetchPriority='high'. */
export function FilmWindow({ src, alt, sizes, className = '', loading = 'lazy', fetchPriority, children }) {
  return (
    <div className={`hp-window ${className}`}>
      <img
        className='hp-still'
        src={src}
        srcSet={frameSrcSet(src)}
        sizes={sizes}
        alt={alt}
        width={1600}
        height={900}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding='async'
      />
      {children}
      <span aria-hidden='true' className='hp-window-lip' />
    </div>
  );
}

/* The hero's felt underline, drawn when its revealed parent arrives. */
export function FeltUnderline() {
  return (
    <svg
      aria-hidden='true'
      viewBox='0 0 300 18'
      preserveAspectRatio='none'
      className='pointer-events-none absolute -bottom-[0.24em] left-[-0.04em] h-[0.32em] w-[calc(100%+0.08em)] overflow-visible'
    >
      <g className='hp-felt'>
        <path className='hp-felt-line' d='M3 11c40-8 70 4 104-2s58-9 92-3 60 6 98-4' pathLength='1' fill='none' stroke='#2fa8b0' strokeWidth='8' strokeLinecap='round' />
        <path className='hp-felt-line' d='M6 9.6c40-8 70 4 102-2s58-9 92-3 58 6 96-4' pathLength='1' fill='none' stroke='#71cfcf' strokeOpacity='.55' strokeWidth='1.6' strokeLinecap='round' />
      </g>
    </svg>
  );
}

export function Underlined({ children }) {
  return (
    <span className='relative inline-block whitespace-nowrap'>
      {children}
      <FeltUnderline />
    </span>
  );
}
