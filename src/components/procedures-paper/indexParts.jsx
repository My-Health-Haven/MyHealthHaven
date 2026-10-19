import React from 'react';
import IndexRow from './IndexRow';

/* the speciality's own line icon (from data/specialityMeta), in the logo teal, no badge */
export function SpecialityMark({ Icon }) {
  if (!Icon) return null;
  return (
    <span aria-hidden='true' className='pr-mark'>
      <Icon size={28} width={28} height={28} strokeWidth={1.75} />
    </span>
  );
}

/*
 * The entries of one speciality as a role=list (the site theme paints any
 * hovered <li> in <main> solid teal). split: two stacks side by side from
 * 768px, first half then second half, so the reading order stays alphabetical
 * and an opened slip only pushes its own stack.
 */
export function RowList({ procedures, aboutLabel, split = false }) {
  const row = (procedure) => <IndexRow key={procedure.procedure_id} procedure={procedure} aboutLabel={aboutLabel} />;
  if (!split) {
    return (
      <div role='list' className='pr-rows'>
        {procedures.map(row)}
      </div>
    );
  }
  const mid = Math.ceil(procedures.length / 2);
  return (
    <div role='list' className='pr-rows pr-rows-split'>
      <div role='none'>{procedures.slice(0, mid).map(row)}</div>
      <div role='none'>{procedures.slice(mid).map(row)}</div>
    </div>
  );
}
