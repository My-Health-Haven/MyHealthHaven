import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { RowList, SpecialityCount, SpecialityMark, SpecialityName } from './indexParts';

/*
 * List view: one speciality as a drawer of the index. Same behaviour as
 * components/procedures/SpecialitySection: the whole head opens and closes it
 * (expanded and onToggle come from the page, which keeps every drawer open
 * while the visitor searches). The toggle is a real <button> inside the h2; its
 * name is the speciality and its count ("Bariatric 5 procedures"), and the
 * description is its description, not part of the name.
 */
const IndexDrawer = ({
  speciality,
  procedures,
  expanded,
  onToggle,
  aboutLabel,
  countWord,
  index = 0,
}) => {
  const { key, displayName, Icon, description } = speciality;
  const title = displayName || key;
  const uid = useId();
  const nameId = `${uid}-name`;
  const countId = `${uid}-count`;
  const descId = `${uid}-desc`;
  const panelId = `${uid}-panel`;

  return (
    <div data-reveal='rise' style={{ '--i': index }} className='pr-drawer'>
      <h2 className='pr-drawer-h'>
        <button
          type='button'
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-labelledby={`${nameId} ${countId}`}
          aria-describedby={description ? descId : undefined}
          onClick={onToggle}
          className='pr-drawer-btn'
        >
          <SpecialityMark Icon={Icon} />
          <span id={nameId} className='pr-name'>
            <SpecialityName>{title}</SpecialityName>
          </span>
          {description ? (
            <span id={descId} className='pr-desc'>
              {description}
            </span>
          ) : null}
          <SpecialityCount id={countId} count={procedures.length} countWord={countWord} />
          <span aria-hidden='true' className='pr-plus'>
            <ChevronDown className='size-[18px]' />
          </span>
        </button>
      </h2>

      {/* Rendered whether or not the drawer is open, for the same reason as the
          slip in IndexRow: mounting on open kept the entries out of the HTML. */}
      <div id={panelId} className='pr-drawer-panel' hidden={!expanded}>
        <RowList procedures={procedures} aboutLabel={aboutLabel} split />
      </div>
    </div>
  );
};

export default IndexDrawer;
