import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { RowList, SpecialityCount, SpecialityMark, SpecialityName } from './indexParts';

const DEFAULT_VISIBLE = 5;

/*
 * Grid view: one speciality of the index. Same behaviour as
 * components/procedures/SpecialityCard: the first five entries show, "View N
 * more" opens the rest and "Show less" closes them; while the visitor searches,
 * every match shows and the toggle hides. The wide group (the last one when the
 * count is odd) spans both columns and sets its entries in two stacks. Side by
 * side, two groups share their head row (CSS subgrid), so the navy rules line up.
 */
const IndexGroup = ({ speciality, procedures, viewMoreLabel, viewLessLabel, wide = false, forceShowAll = false, aboutLabel, countWord, index = 0 }) => {
  const [showAll, setShowAll] = useState(false);
  const { key, displayName, Icon, description } = speciality;
  const title = displayName || key;
  const count = procedures.length;

  const isExpanded = forceShowAll || showAll;
  const hiddenCount = Math.max(count - DEFAULT_VISIBLE, 0);
  const visibleProcedures = isExpanded ? procedures : procedures.slice(0, DEFAULT_VISIBLE);

  const hasMoreToShow = hiddenCount > 0;

  return (
    <div data-reveal='rise' style={{ '--i': index % 2 }} className={`pr-group ${wide ? 'pr-group-wide' : ''}`}>
      <div className='pr-head'>
        <SpecialityMark Icon={Icon} />
        <div className='min-w-0'>
          <h2 className='pr-name'>
            <SpecialityName>{title}</SpecialityName>
          </h2>
          {description ? <p className='pr-desc'>{description}</p> : null}
        </div>
        <SpecialityCount count={count} countWord={countWord} />
      </div>

      <div className='pr-body'>
        <RowList procedures={visibleProcedures} aboutLabel={aboutLabel} split={wide} />

        {hasMoreToShow && !forceShowAll ? (
          <button type='button' aria-expanded={showAll} onClick={() => setShowAll((prev) => !prev)} className='pr-more'>
            {showAll ? viewLessLabel || 'Show less' : viewMoreLabel ? viewMoreLabel(hiddenCount) : `View ${hiddenCount} more`}
            <ChevronDown aria-hidden='true' className='size-[18px]' />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default IndexGroup;
