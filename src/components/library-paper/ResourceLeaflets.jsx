import { ExternalLink } from 'lucide-react';

const TILT = ['-1.2deg', '1deg'];

/*
 * The official sources as two leaflets on the sheet: each is the same
 * external link the old outline button was (same label, same address, new
 * tab), with the site's host underneath so the visitor sees where it goes.
 *
 * links: [{ href, label }]
 */
export default function ResourceLeaflets({ links, newTabLabel }) {
  return (
    <div role='list' className='m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2'>
      {links.map((link, i) => (
        <div role='listitem' key={link.href} data-reveal='drop' style={{ '--i': i, '--r': TILT[i % TILT.length] }} className='hp-note-pin'>
          <a
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className='hl-leaflet hp-note flex h-full min-h-[112px] items-start justify-between gap-4 rounded-[6px] p-6 no-underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#1b4560]'
          >
            <span>
              <span className='block text-[1.125rem] font-semibold leading-[1.35] text-[#1b4560]'>{link.label}</span>
              <span className='mt-2 block text-[0.875rem] leading-[1.4] text-[#5b7180] [overflow-wrap:anywhere]'>{new URL(link.href).hostname}</span>
              <span className='sr-only'> {newTabLabel}</span>
            </span>
            <ExternalLink aria-hidden='true' className='mt-1 size-5 shrink-0 text-[#00796b]' />
          </a>
        </div>
      ))}
    </div>
  );
}
