import { ExternalLink } from 'lucide-react';
import { cls } from '@/components/paper/paperStyles';

/*
 * The partner pages (For Employers, For Providers) are each one shared Google
 * Doc. These are the paper objects that hold it: the employer file sits in a
 * manila folder, the provider file on a clinic clipboard. The page passes the
 * iframe in as children, unchanged; the panel only frames it.
 *
 * Both panels keep the old viewer's size (70vh, 80vh from 900px, never under
 * 600px) and its light #f8f9fa ground behind the document.
 */

/* the same paper grain as the kit's sheets */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .38 0 0 0 0 .3 0 0 0 .06 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E\")";

const PANEL_CSS = `
.pp-folder { display: grid; grid-template-columns: minmax(0, 1fr); grid-template-areas: "tab" "act" "body"; }
.pp-folder-tab { grid-area: tab; justify-self: start; max-width: 100%; position: relative; z-index: 1;
  background: #f4eee5 ${NOISE}; border-radius: 12px 12px 0 0; box-shadow: 0 -1px 0 rgba(70,50,30,.06); }
.pp-folder-act { grid-area: act; background: #f4eee5 ${NOISE}; border-radius: 0 14px 0 0; }
.pp-folder-body { grid-area: body; background: #f4eee5 ${NOISE}; border-radius: 0 0 14px 14px;
  box-shadow: 0 1px 0 rgba(70,50,30,.10), 0 22px 36px -22px rgba(70,50,30,.6); }
@media (min-width: 768px) {
  .pp-folder { grid-template-columns: minmax(0, 1fr) auto; grid-template-areas: "tab act" "body body"; align-items: end; }
  .pp-folder-act { background: none; border-radius: 0; }
  .pp-folder-body { border-radius: 0 14px 14px 14px; }
}

.pp-board { background: #1b4560 ${NOISE}; box-shadow: inset 0 -3px 0 rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.08), 0 26px 40px -24px rgba(20,40,55,.7); }
/* the clip: a felt-grey plate with its wire loop, laid over the top of the page */
.pp-clip { position: absolute; left: 50%; top: -22px; width: 176px; height: 64px; margin-left: -88px; z-index: 2; pointer-events: none; }
.pp-clip-loop { position: absolute; left: 50%; top: 0; width: 72px; height: 34px; margin-left: -36px; border: 7px solid #8a9299; border-bottom: 0; border-radius: 36px 36px 0 0; }
.pp-clip-plate { position: absolute; left: 0; right: 0; top: 22px; bottom: 0; border-radius: 12px 12px 8px 8px; background: #8a9299;
  box-shadow: inset 0 -4px 0 rgba(0,0,0,.16), inset 0 2px 0 rgba(255,255,255,.35), 0 8px 12px -6px rgba(0,0,0,.5); }
.pp-clip-plate::after { content: ""; position: absolute; left: 50%; top: 11px; width: 26px; height: 10px; margin-left: -13px; border-radius: 999px; background: #1b4560; box-shadow: inset 0 2px 0 rgba(0,0,0,.35); }
@media (max-width: 639px) { .pp-clip { transform: scale(.82); transform-origin: 50% 0; } }

/* the document page lying in the folder or under the clip */
.pp-doc { position: relative; overflow: hidden; border-radius: 4px; box-shadow: 0 1px 0 rgba(70,50,30,.14), 0 10px 18px -12px rgba(40,30,20,.45); }

@media (forced-colors: active) {
  .pp-folder-tab, .pp-folder-body, .pp-board, .pp-doc { border: 1px solid CanvasText; }
}
`;

/* the iframe's frame, at the old viewer's size */
function DocViewport({ children }) {
  return <div className='relative h-[70vh] min-h-[600px] w-full bg-[#f8f9fa] min-[900px]:h-[80vh]'>{children}</div>;
}

/* "Open Document": the Google Doc in a new tab (same href, target and rel as before) */
export function OpenDocumentLink({ href, label, newTabLabel, variant = 'primary', className = '' }) {
  return (
    <a href={href} target='_blank' rel='noreferrer' className={`${variant === 'primary' ? cls.btnPrimary : cls.btnOutline} ${className}`}>
      <ExternalLink aria-hidden='true' className='size-5' />
      {label}
      {newTabLabel ? <span className='sr-only'>{newTabLabel}</span> : null}
    </a>
  );
}

/* For Employers: a manila folder with the title on its tab and the document inside */
export function DocumentFolder({ titleId, title, action, children }) {
  return (
    <>
      <style>{PANEL_CSS}</style>
      <div data-reveal='rise' className='pp-folder w-full'>
        <div className='pp-folder-tab px-5 pb-3 pt-4 sm:px-7 sm:pt-5'>
          <h2
            id={titleId}
            className='m-0 font-[family-name:var(--font-hh-display)] text-[1.375rem] font-normal leading-[1.2] text-[#1b4560] [overflow-wrap:break-word] sm:text-[1.625rem] lg:text-[1.75rem]'
          >
            {title}
          </h2>
        </div>
        {action ? <div className='pp-folder-act px-3 pt-3 md:px-0 md:pb-4 md:pt-0 [&>a]:w-full md:[&>a]:w-auto'>{action}</div> : null}
        <div className='pp-folder-body p-3 sm:p-5 lg:p-6'>
          <div className='pp-doc'>
            <DocViewport>{children}</DocViewport>
          </div>
        </div>
      </div>
    </>
  );
}

/* For Providers: the document held on a navy clipboard, set in the middle of the sheet */
export function DocumentClipboard({ titleId, title, action, children }) {
  return (
    <>
      <style>{PANEL_CSS}</style>
      <div className='mx-auto w-full max-w-[920px]'>
        <div data-reveal='rise' className='text-center'>
          <h2 id={titleId} className={cls.h2}>
            {title}
          </h2>
          {action ? <div className='mt-7 flex justify-center [&>a]:w-full sm:[&>a]:w-auto'>{action}</div> : null}
        </div>
        <div data-reveal='rise' style={{ '--i': 1 }} className='pp-board relative mt-16 rounded-[18px] px-2.5 pb-2.5 pt-10 sm:mt-20 sm:px-5 sm:pb-5 sm:pt-12 lg:px-7 lg:pb-7'>
          <div aria-hidden='true' className='pp-clip'>
            <span className='pp-clip-loop' />
            <span className='pp-clip-plate' />
          </div>
          <div className='pp-doc'>
            <DocViewport>{children}</DocViewport>
          </div>
        </div>
      </div>
    </>
  );
}
