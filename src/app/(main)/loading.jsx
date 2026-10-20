/*
 * Any page while it loads, as blank paper: the cream hero sheet (title, lead and
 * button blocks beside a frame window) and the start of a kraft sheet below.
 * Blocks pulse only when motion is allowed.
 */
const block = 'rounded-[6px] bg-[rgba(27,69,96,0.09)] motion-safe:animate-pulse';

export default function Loading() {
  return (
    <div aria-busy='true'>
      <div className='bg-[#f4eee5]'>
        <div className='mx-auto grid w-full max-w-[1360px] grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 sm:px-8 md:pb-20 md:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:px-12 lg:pb-24 lg:pt-16'>
          <div className='max-w-[38rem]'>
            <div className={`${block} h-12 w-[70%]`} />
            <div className={`${block} mt-3 h-12 w-[50%]`} />
            <div className={`${block} mt-8 h-5 w-[90%]`} />
            <div className={`${block} mt-3 h-5 w-[75%]`} />
            <div className={`${block} mt-9 h-[54px] w-[260px] max-w-full rounded-full`} />
          </div>
          <div className='aspect-video w-full rounded-[10px] bg-[#d1c5b4] motion-safe:animate-pulse' />
        </div>
      </div>
      <div className='min-h-[40vh] bg-[#e9dfcf]'>
        <div className='mx-auto w-full max-w-[1360px] px-4 py-14 sm:px-8 lg:px-12 lg:py-20'>
          <div className={`${block} h-9 w-[40%] max-w-[28rem]`} />
          <div className={`${block} mt-4 h-5 w-[60%] max-w-[36rem]`} />
        </div>
      </div>
    </div>
  );
}
