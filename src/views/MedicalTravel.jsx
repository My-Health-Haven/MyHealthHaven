'use client';
import MedicalTravelHero from '@/components/medical-travel/MedicalTravelHero';
import OperationsAndCancunSection from '@/components/medical-travel/OperationsAndCancunSection';
import OperationsMapSection from '@/components/medical-travel/OperationsMapSection';
import MedicalCareTimelineSection from '@/components/medical-travel/MedicalCareTimelineSection';

const MedicalTravel = () => {
  return (
    <>
      <MedicalTravelHero />
      <OperationsAndCancunSection />
      <OperationsMapSection />
      <MedicalCareTimelineSection />
    </>
  );
};

export default MedicalTravel;
