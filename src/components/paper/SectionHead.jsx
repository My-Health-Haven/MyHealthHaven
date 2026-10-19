import { cls } from './paperStyles';

/*
 * A section's heading block: Young Serif h2 (with an optional felt-underlined
 * part that draws in when it scrolls into view) and a lead paragraph. No label
 * above the heading: the heading leads.
 */
export default function SectionHead({ id, title, emphasis, lead, align = 'left', className = '', children }) {
  const centered = align === 'center';
  return (
    <div data-reveal='rise' className={`${centered ? 'mx-auto text-center' : ''} max-w-[46rem] ${className}`}>
      <h2 id={id} className={cls.h2}>
        {title}
        {emphasis ? (
          <>
            {title ? ' ' : null}
            <span className='hp-felt-text'>{emphasis}</span>
          </>
        ) : null}
      </h2>
      {lead ? <p className={`${cls.lead} ${centered ? 'mx-auto' : ''}`}>{lead}</p> : null}
      {children}
    </div>
  );
}
