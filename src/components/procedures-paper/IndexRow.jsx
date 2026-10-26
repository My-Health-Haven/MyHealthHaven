import React, { useId, useState } from 'react';
import { Plus } from 'lucide-react';

/*
 * One entry of the index. Same behaviour as components/procedures/ProcedureRow:
 * an entry with a description opens and closes it (click, Enter or Space);
 * one without is plain text. The description opens as a paper slip under the
 * entry. A real <button> carries the toggle.
 *
 * The slip is always rendered and hidden with the `hidden` attribute rather
 * than being mounted on open. Mounting on open kept all 66 procedure
 * descriptions out of the served HTML, so the catalog's only indexable text was
 * the procedure names. `hidden` still removes the slip from the page and from
 * the accessibility tree, and the open animation still runs, because the
 * element goes from display:none to displayed.
 */
const IndexRow = ({ procedure, aboutLabel }) => {
  const { procedure_name, description } = procedure;
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const hasDescription = Boolean(description && description.trim());

  const handleToggle = () => {
    if (!hasDescription) return;
    setExpanded((prev) => !prev);
  };

  return (
    <div role='listitem' className='pr-row'>
      {hasDescription ? (
        <button
          type='button'
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={handleToggle}
          className='pr-row-btn'
        >
          <span className='pr-row-name'>{procedure_name}</span>
          <span aria-hidden='true' className='pr-leader' />
          <span aria-hidden='true' className='pr-plus'>
            <Plus className='size-4' />
          </span>
        </button>
      ) : (
        <p className='pr-row-text'>{procedure_name}</p>
      )}

      {hasDescription ? (
        <div id={panelId} className='pr-slip' hidden={!expanded}>
          <p className='pr-slip-label'>{aboutLabel}</p>
          <p className='pr-slip-text'>{description}</p>
        </div>
      ) : null}
    </div>
  );
};

export default IndexRow;
