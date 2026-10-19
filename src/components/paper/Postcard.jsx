/*
 * A real photograph in the paper world: set as a postcard dropped on the sheet
 * (white border, a slight tilt, a handwritten-style caption in Young Serif).
 * Pass a pre-sized image (src + optional srcSet) so it skips the dev optimizer.
 */
export default function Postcard({ src, srcSet, sizes = '(min-width: 1024px) 520px, 92vw', alt, caption, width, height, aspect = '4 / 3', tilt = '2.2deg', className = '' }) {
  return (
    <div data-reveal='card' className={`mx-auto w-full max-w-[540px] ${className}`}>
      <figure className='hp-postcard m-0 rounded-[4px] p-3 pb-4 sm:p-4 sm:pb-5' style={{ transform: `rotate(${tilt})` }}>
        <div className='relative overflow-hidden rounded-[2px]' style={{ aspectRatio: aspect }}>
          <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} width={width} height={height} loading='lazy' decoding='async' className='absolute inset-0 h-full w-full object-cover' />
        </div>
        {caption ? <figcaption className='mt-3 px-1 font-[family-name:var(--font-hh-display)] text-[1.375rem] leading-none text-[#1b4560]'>{caption}</figcaption> : null}
      </figure>
    </div>
  );
}
