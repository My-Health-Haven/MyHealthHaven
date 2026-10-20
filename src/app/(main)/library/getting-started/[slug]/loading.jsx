/*
 * An article while it loads, as blank paper: the kraft hero (crumbs, title,
 * excerpt, meta) and the cream reading sheet with lines at the reading measure.
 * Blocks pulse only when motion is allowed.
 */
const block = 'rounded-[6px] bg-[rgba(27,69,96,0.09)] motion-safe:animate-pulse';

export default function ArticleLoading() {
  return (
    <div aria-busy='true'>
      <div className='bg-[#e9dfcf]'>
        <div className='mx-auto w-full max-w-[1360px] px-4 pb-14 pt-8 sm:px-8 lg:px-12 lg:pb-20 lg:pt-12'>
          <div className={`${block} h-4 w-[260px] max-w-full`} />
          <div className={`${block} mt-8 h-11 w-[80%] max-w-[44rem]`} />
          <div className={`${block} mt-3 h-11 w-[55%] max-w-[30rem]`} />
          <div className={`${block} mt-7 h-5 w-[70%] max-w-[36rem]`} />
          <div className={`${block} mt-5 h-4 w-[220px] max-w-full`} />
        </div>
      </div>
      <div className='min-h-[60vh] bg-[#f4eee5]'>
        <div className='mx-auto w-full max-w-[1360px] px-4 py-14 sm:px-8 lg:px-12 lg:py-20'>
          <div className='max-w-[34rem]'>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`${block} mt-4 h-4`} style={{ width: `${86 + (i % 3) * 6}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
