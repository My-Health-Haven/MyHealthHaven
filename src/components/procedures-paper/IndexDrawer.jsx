import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { RowList, SpecialityMark } from './indexParts';

/*
 * List view: one speciality as a drawer of the index. Same behaviour as
 * components/procedures/SpecialitySection: the whole head opens and closes it
 * (expanded and onToggle come from the page, which keeps every drawer open
 * while the visitor searches). The toggle is a real <button> inside the h2.
 */
const IndexDrawer = ({ speciality, procedures, expanded, onToggle, aboutLabel, index = 0 }) => {
  const { key, displayName, Icon, description } = speciality;
  const title = displayName || key;
  const panelId = useId();

  return (
    <div data-reveal='rise' style={{ '--i': index }} className='pr-drawer'>
      <h2 className='pr-drawer-h'>
        <button type='button' aria-expanded={expanded} aria-controls={expanded ? panelId : undefined} onClick={onToggle} className='pr-drawer-btn'>
          <SpecialityMark Icon={Icon} />
          <span className='pr-name'>{title}</span>
          {description ? <span className='pr-desc'>{description}</span> : null}
          <span aria-hidden='true' className='pr-count'>
            {procedures.length}
          </span>
          <span aria-hidden='true' className='pr-plus'>
            <ChevronDown className='size-[18px]' />
          </span>
        </button>
      </h2>

      {expanded ? (
        <div id={panelId} className='pr-drawer-panel'>
          <RowList procedures={procedures} aboutLabel={aboutLabel} split />
        </div>
      ) : null}
    </div>
  );
};

export default IndexDrawer;
