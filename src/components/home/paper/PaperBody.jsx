'use client';

import PaperPage from '@/components/paper/PaperPage';
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
 * src/components/home/ for comparison. The shared kit lives in
 * src/components/paper/.
 */
export default function PaperBody() {
  return (
    <PaperPage>
      <GuidedSection />
      <StepsSection />
      <NotesSection />
      <MexicoSection />
      <NavigatorSection />
      <FaqLedger />
      <ClosingSection />
    </PaperPage>
  );
}
