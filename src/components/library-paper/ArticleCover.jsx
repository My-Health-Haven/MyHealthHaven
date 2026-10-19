import { articlePicture } from './libraryImages';

/* the slip's tilt and line lengths vary a little from card to card */
const SLIPS = [
  { tilt: '-3deg', lines: ['92%', '78%', '86%', '54%'] },
  { tilt: '2.4deg', lines: ['84%', '94%', '62%', '74%'] },
  { tilt: '-1.6deg', lines: ['88%', '70%', '90%', '48%'] },
];

/*
 * Paper version of ArticlePlaceholder: an article's picture glued into a paper
 * note (the pre-sized webp, never next/image), or, for an article without one,
 * a cream slip with a felt marker laid on kraft instead of the old gradient.
 * The slip is decoration only: it carries no alt text, since there is no
 * picture to describe (the card's title says what the article is).
 */
export default function ArticleCover({ image, alt, sizes = '(min-width: 1024px) 400px, 92vw', aspect = '16 / 9', variant = 0, className = '' }) {
  const pic = articlePicture(image);
  const slip = SLIPS[variant % SLIPS.length];
  return (
    <div className={`hl-cover w-full ${className}`} style={{ aspectRatio: aspect }}>
      {pic ? (
        <img
          src={pic.src}
          srcSet={pic.srcSet}
          sizes={sizes}
          alt={alt || ''}
          width={pic.width}
          height={pic.height}
          loading='lazy'
          decoding='async'
          className='absolute inset-0 h-full w-full object-cover'
        />
      ) : (
        <div aria-hidden='true' className='hl-slip-ground'>
          <div className='hl-slip' style={{ '--slip': slip.tilt }}>
            <span className='hl-slip-head'>
              <b />
              <i />
            </span>
            {slip.lines.map((w, i) => (
              <i key={i} style={{ width: w }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
