import { cls } from './paperStyles';

/*
 * A list with the film's felt markers: teal path tiles for what MyHealth Haven
 * does, grey maze tiles for problems. Items are strings or { title, body }
 * (title and body may be nodes, e.g. <LinkNav />). Rendered as role=list divs:
 * the site theme paints any hovered <li> in <main> solid teal.
 */
export default function TileList({ items, tone = 'teal', columns = 1, onDark = false, className = '' }) {
  const grid = columns === 2 ? 'sm:grid-cols-2' : columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : '';
  const titleColor = onDark ? 'text-[#f4eee5]' : 'text-[#1b4560]';
  const bodyColor = onDark ? 'text-[#d3dde2]' : 'text-[#3f5868]';
  return (
    <div role='list' className={`m-0 grid list-none grid-cols-1 gap-x-8 gap-y-5 p-0 ${grid} ${className}`}>
      {items.map((item, i) => {
        const rich = item && typeof item === 'object' && !Array.isArray(item) && ('title' in item || 'body' in item);
        return (
          <div role='listitem' key={i} data-reveal='lay' style={{ '--i': i }} className='flex gap-3.5'>
            <span aria-hidden='true' className={`hp-tile ${tone === 'teal' ? 'hp-tile-teal' : ''}`} />
            {rich ? (
              <div>
                {item.title ? <p className={`m-0 font-semibold leading-[1.5] ${titleColor}`}>{item.title}</p> : null}
                {item.body ? <p className={`${cls.body} ${bodyColor} ${item.title ? 'mt-1' : ''}`}>{item.body}</p> : null}
              </div>
            ) : (
              <span className={`${cls.body} ${bodyColor}`}>{item}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
