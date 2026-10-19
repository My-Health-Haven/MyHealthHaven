'use client';
import PaperPage from '@/components/paper/PaperPage';
import TravelHero from '@/components/medical-travel-paper/TravelHero';
import WhereWeOperate from '@/components/medical-travel-paper/WhereWeOperate';
import WhyCancunPostcard from '@/components/medical-travel-paper/WhyCancunPostcard';
import JourneyLoop from '@/components/medical-travel-paper/JourneyLoop';
import JourneyClose from '@/components/medical-travel-paper/JourneyClose';
import { TRAVEL_CSS } from '@/components/medical-travel-paper/travelStyles';

/*
 * Medical Travel, in the paper world of the home page. The old sections
 * (src/components/medical-travel/*) stay on disk; their copy, map and timeline
 * data all carry over: hero, where we operate + the operations map, why Cancún
 * + the trust row, the ten-step journey, and its conclusion with the button
 * to /schedule.
 */
const MedicalTravel = () => {
  return (
    <PaperPage>
      <style>{TRAVEL_CSS}</style>
      <TravelHero />
      <WhereWeOperate />
      <WhyCancunPostcard />
      <JourneyLoop />
      <JourneyClose />
    </PaperPage>
  );
};

export default MedicalTravel;
