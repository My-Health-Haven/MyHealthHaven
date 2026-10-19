'use client';

import { useRef } from 'react';
import { display } from './fonts';
import { PAPER_CSS } from './paperStyles';
import { usePaperMotion } from './usePaperMotion';
import GuidedSection from './GuidedSection';
import StepsSection from './StepsSection';
import NotesSection from './NotesSection';
import MexicoSection from './MexicoSection';
import NavigatorSection from './NavigatorSection';
import FaqLedger from './FaqLedger';
import ClosingSection from './ClosingSection';

/*
 * The home page below the maze hero, in the same world: paper sheets from the
 * brand film, in the old order and with all the old copy (it still comes from
 * src/data/translations.js). The previous section components stay on disk in
 * src/components/home/ for comparison.
 */
export default function PaperBody() {
  const rootRef = useRef(null);
  usePaperMotion(rootRef);

  return (
    <div ref={rootRef} className={`hp-body ${display.variable}`}>
      <style>{PAPER_CSS}</style>
      <GuidedSection />
      <StepsSection />
      <NotesSection />
      <MexicoSection />
      <NavigatorSection />
      <FaqLedger />
      <ClosingSection />
    </div>
  );
}
