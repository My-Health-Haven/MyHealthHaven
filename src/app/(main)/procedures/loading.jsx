/*
 * The procedures page while it loads, as blank paper: the hero sheet (title,
 * search, frame window) and the kraft index sheet with two columns of ruled
 * entries. Blocks pulse only when motion is allowed.
 */
const block = 'rounded-[6px] bg-[rgba(27,69,96,0.09)] motion-safe:animate-pulse';

export default function ProceduresLoading() {
  return (
    <div aria-busy='true'>
      <div className='bg-[#f4eee5]'>
        <div className='mx-auto grid w-full max-w-[1360px] grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 sm:px-8 md:pb-20 md:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:px-12 lg:pb-24 lg:pt-16'>
          <div className='max-w-[38rem]'>
            <div className={`${block} h-12 w-[55%]`} />
            <div className={`${block} mt-10 h-[60px] w-full rounded-[14px]`} />
            <div className='mt-5 flex items-center justify-between gap-6'>
              <div className={`${block} h-6 w-[40%]`} />
              <div className={`${block} h-[50px] w-[180px] rounded-full`} />
            </div>
          </div>
          <div className='aspect-video w-full rounded-[10px] bg-[#d1c5b4] motion-safe:animate-pulse' />
        </div>
      </div>
      <div className='bg-[#e9dfcf]'>
        <div className='mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-14 px-4 py-14 sm:px-8 md:grid-cols-2 lg:px-12 lg:py-20'>
          {Array.from({ length: 2 }).map((_, g) => (
            <div key={g}>
              <div className={`${block} h-8 w-[50%]`} />
              <div className={`${block} mt-3 h-4 w-[70%]`} />
              <div className='mt-5 h-[2px] bg-[rgba(27,69,96,0.5)]' />
              {Array.from({ length: 5 }).map((__, r) => (
                <div key={r} className='flex h-14 items-center gap-3'>
                  <div className={`${block} h-4 w-[40%]`} />
                  <div className='h-[2px] flex-1 border-0 border-b-2 border-dotted border-[rgba(27,69,96,0.25)]' />
                  <div className={`${block} size-8 rounded-full`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
