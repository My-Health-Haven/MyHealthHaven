/*
 * The library's article pictures, pre-sized for the paper pages.
 *
 * The data (src/data/libraryContent.js) points at the original PNGs in /public
 * (1.5 to 1.9 MB each). The paper pages show webp copies made with sharp
 * (public/pages/article-*.webp at up to 1600w, plus an -800 twin), mapped here
 * by the data's own path, so the data stays untouched. A picture the map does
 * not know yet (a new article) falls back to its original file as a plain img.
 */
const SIZED = {
  '/Is medical travel right for me.png': { base: '/pages/article-right-for-me', width: 1600, height: 900 },
  '/how we vet hospitals and surgeons.png': { base: '/pages/article-vet-hospitals', width: 1600, height: 900 },
  '/talking to your us doctor about care in mexico.png': { base: '/pages/article-us-doctor', width: 1600, height: 900 },
  '/How To Prepare For.png': { base: '/pages/article-prepare', width: 1536, height: 1024 },
  '/What Acreditation Actually.png': { base: '/pages/article-accreditation', width: 1536, height: 1024 },
};

/* { src, srcSet, width, height } for an article picture, or null when it has none */
export function articlePicture(path) {
  if (!path) return null;
  const sized = SIZED[path];
  if (!sized) return { src: path, srcSet: undefined, width: undefined, height: undefined };
  return {
    src: `${sized.base}.webp`,
    srcSet: `${sized.base}-800.webp 800w, ${sized.base}.webp ${sized.width}w`,
    width: sized.width,
    height: sized.height,
  };
}
