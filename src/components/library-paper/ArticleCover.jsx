import { articlePicture } from './libraryImages';

/*
 * Paper version of ArticlePlaceholder for an article that has a picture: the
 * pre-sized webp (never next/image) glued into the paper note. An article
 * without a picture gets no cover at all (ArticleNote lays it out as a
 * typographic note instead), so this returns nothing for it.
 */
export default function ArticleCover({ image, alt, sizes = '(min-width: 1024px) 400px, 92vw', aspect = '16 / 9', className = '' }) {
  const pic = articlePicture(image);
  if (!pic) return null;
  return (
    <div className={`hl-cover w-full ${className}`} style={{ aspectRatio: aspect }}>
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
    </div>
  );
}
