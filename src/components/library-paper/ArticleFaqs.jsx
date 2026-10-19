import { Plus } from 'lucide-react';
import Sheet from '@/components/paper/Sheet';
import { cls } from '@/components/paper/paperStyles';
import { LIB_GRID } from './libraryStyles';

/*
 * An article's questions in the home page's FAQ ledger: the heading pinned on
 * the left anchor on desktop, the answers as native <details> on the right
 * one, so they open with a keyboard, a screen reader and no JavaScript.
 */
export default function ArticleFaqs({ id, title, faqs, tone }) {
  return (
    <Sheet tone={tone} labelledBy={id} innerClassName={`${LIB_GRID} gap-10`}>
      <div>
        <div data-reveal='rise' className='lg:sticky lg:top-[120px]'>
          <h2 id={id} className={cls.h2}>
            {title}
          </h2>
        </div>
      </div>
      <div className='hp-faq border-0 border-t border-solid border-[rgba(27,69,96,0.2)]'>
        {faqs.map((faq) => (
          <details key={faq.question} data-reveal='rise' className='border-0 border-b border-solid border-[rgba(27,69,96,0.2)]'>
            <summary className='flex cursor-pointer items-start justify-between gap-6 rounded-[4px] py-5 text-[1.0625rem] font-semibold leading-[1.45] text-[#1b4560] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4560]'>
              <h3 className='m-0 text-[inherit] font-[inherit] leading-[inherit]'>{faq.question}</h3>
              <span aria-hidden='true' className='hp-faq-icon mt-[-2px] grid size-8 shrink-0 place-items-center rounded-full bg-[rgba(0,121,107,0.1)] text-[#00796b]'>
                <Plus className='size-4' />
              </span>
            </summary>
            <p className={`${cls.body} max-w-[38rem] pb-6 pr-0 sm:pr-14`}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </Sheet>
  );
}
