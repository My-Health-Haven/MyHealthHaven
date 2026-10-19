import { cls } from './paperStyles';

/*
 * One sheet of paper: cream, kraft or navy, with the deckled top edge laid over
 * the sheet above it (except the first sheet under the site header). Alternate
 * cream and kraft down a page; use navy at most once per page.
 */
export default function Sheet({ tone = 'cream', first = false, id, labelledBy, pad = true, className = '', innerClassName = '', children }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`hp-sheet hp-${tone} ${first ? 'hp-first' : ''} ${pad ? cls.pad : ''} ${className}`}
    >
      <div className={`${cls.wrap} ${innerClassName}`}>{children}</div>
    </section>
  );
}
