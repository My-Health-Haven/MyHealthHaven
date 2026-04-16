import React from 'react';
import { Box, Typography } from '@mui/material';
import TimelineCard from './TimelineCard';
import TimelineArrow from './TimelineArrow';
import TimelineConnector from './TimelineConnector';
import FadeIn from './FadeIn';
import { useLanguage } from '../context/LanguageContext';

// Import custom illustrations for each step
import {
  PhoneIllustration,
  ClipboardIllustration,
  VirtualConsultIllustration,
  CalendarIllustration,
  TravelIllustration,
  ArrivalIllustration,
  EvalIllustration,
  ProcedureIllustration,
  RecoveryIllustration,
  HomeIllustration
} from './TimelineIllustrations';

// Icons array for each step (0-indexed)
const stepIcons = [
  <PhoneIllustration key="1" />,
  <ClipboardIllustration key="2" />,
  <VirtualConsultIllustration key="3" />,
  <CalendarIllustration key="4" />,
  <TravelIllustration key="5" />,
  <ArrivalIllustration key="6" />,
  <EvalIllustration key="7" />,
  <ProcedureIllustration key="8" />,
  <RecoveryIllustration key="9" />,
  <HomeIllustration key="10" />,
];

// Step variants (teal for certain steps)
const stepVariants = [
  'default', // 1
  'default', // 2
  'default', // 3
  'default', // 4
  'teal',    // 5
  'teal',    // 6
  'default', // 7
  'teal',    // 8
  'default', // 9
  'teal',    // 10
];

/**
 * MedicalCareTimeline - Complete 2-row timeline layout
 * Row 1: 5 cards (steps 1-5)
 * Row 2: 5 cards (steps 6-10)
 * Uses translations for all text content
 */
const MedicalCareTimeline = () => {
  const { t } = useLanguage();

  // Get timeline card data from translations
  const timelineCards = t('medicalTravelPage.timelineCards') || [];
  const title = t('medicalTravelPage.timelineCardTitle') || 'A Clear, Supportive Journey';
  const subtitle = t('medicalTravelPage.timelineCardSubtitle') || 'So You Always Know What Comes Next';

  // Build step configs from translations + icons
  const stepConfigs = timelineCards.map((card, index) => ({
    stepNumber: String(index + 1),
    title: card.title,
    timing: card.timing || '',
    caption: card.caption,
    icon: stepIcons[index],
    variant: stepVariants[index],
  }));

  const row1Steps = stepConfigs.slice(0, 5);
  const row2Steps = stepConfigs.slice(5);

  const renderRow = (rowSteps) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        gap: 0,
        width: '100%',
        flexWrap: 'nowrap',
      }}
    >
      {rowSteps.map((step, index) => (
        <React.Fragment key={`${step.stepNumber}-${index}`}>
          <TimelineCard
            stepNumber={step.stepNumber}
            title={step.title}
            timing={step.timing}
            icon={step.icon}
            caption={step.caption}
            variant={step.variant}
          />
          {index < rowSteps.length - 1 && <TimelineArrow />}
        </React.Fragment>
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1300,
        mx: 'auto',
        py: 6,
        px: 2,
      }}
    >
      {/* Title Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            color: '#1A365D',
            fontWeight: 400,
            lineHeight: 1.3,
          }}
        >
          <Box component="span" sx={{ fontWeight: 700 }}>
            {title}
          </Box>
          {': '}
          <Box component="span" sx={{ fontStyle: 'italic', color: '#2D4A6F' }}>
            {subtitle}
          </Box>
        </Typography>
      </Box>

      {/* --- DESKTOP LAYOUT (2 rows exactly as before) --- */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 0,
            overflowX: 'auto',
            pb: 1,
          }}
        >
          {renderRow(row1Steps)}
        </Box>

        {/* Connector between rows */}
        <TimelineConnector />

        {/* Row 2 - 5 Cards */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            overflowX: 'auto',
            pb: 1,
          }}
        >
          {renderRow(row2Steps)}
        </Box>
      </Box>

      {/* --- MOBILE LAYOUT (1 vertical column) --- */}
      <Box 
        sx={{ 
          display: { xs: 'flex', md: 'none' }, 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 0,
          mt: 2,
          pb: 2
        }}
      >
        {stepConfigs.map((step, index) => (
          <React.Fragment key={`mobile-${step.stepNumber}-${index}`}>
            <FadeIn style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <TimelineCard
                stepNumber={step.stepNumber}
                title={step.title}
                timing={step.timing}
                icon={step.icon}
                caption={step.caption}
                variant={step.variant}
                sx={{ maxWidth: 320, width: '100%' }} // Let cards be wider on mobile
              />
            </FadeIn>
            {index < stepConfigs.length - 1 && (
              <FadeIn delay={150} style={{ display: 'flex', justifyContent: 'center' }}>
                <TimelineArrow sx={{ transform: 'rotate(90deg)', my: 2 }} />
              </FadeIn>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default MedicalCareTimeline;
