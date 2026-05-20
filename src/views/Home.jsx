'use client';
import { useState, useEffect, useRef } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import HeroSection from '@/components/home/HeroSection';
import ProblemSolutionSection from '@/components/home/ProblemSolutionSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WhyMexicoSection from '@/components/home/WhyMexicoSection';
import NavigatorsPreviewSection from '@/components/home/NavigatorsPreviewSection';
import FaqSection from '@/components/home/FaqSection';
import FinalCtaSection from '@/components/home/FinalCtaSection';
import { useScrollSpyBackground } from '@/lib/useScrollSpyBackground';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { defaultMatches: true });
  const [hasMounted, setHasMounted] = useState(false);
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false);

  const howItWorksRef = useRef(null);
  const navigatorsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useScrollSpyBackground([
    { ref: howItWorksRef, color: '#F3E5F5' },
    { ref: navigatorsRef, color: '#ffffff' },
    { ref: testimonialsRef, color: '#E0F2F1' },
    { ref: ctaRef, color: '#ffffff' },
  ]);

  return (
    <>
      <HeroSection
        isHeroVideoPlaying={isHeroVideoPlaying}
        setIsHeroVideoPlaying={setIsHeroVideoPlaying}
        isMobile={isMobile}
      />
      <ProblemSolutionSection isMobile={isMobile} />
      <HowItWorksSection ref={howItWorksRef} hasMounted={hasMounted} />
      <TestimonialsSection ref={testimonialsRef} hasMounted={hasMounted} />
      <WhyMexicoSection isMobile={isMobile} />
      <NavigatorsPreviewSection ref={navigatorsRef} />
      <FaqSection />
      <FinalCtaSection ref={ctaRef} />
    </>
  );
};

export { default as UsFlagIcon } from '@/components/icons/UsFlagIcon';

export default Home;
