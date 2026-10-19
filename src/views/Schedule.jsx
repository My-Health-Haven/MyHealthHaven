'use client';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import PaperPage from '@/components/paper/PaperPage';
import FormSheet from '@/components/estimate-paper/FormSheet';

/*
 * Schedule, in the paper world of the home page (branch
 * redesign/without-the-maze-hero): the title and its lines beside the film
 * frame of the patient on a video call with her Navigator, then Google's live
 * booking calendar seen through a window cut in a paper panel, across the full
 * width (straight after the words on a phone). The iframe is unchanged.
 */
const Schedule = () => {
  const { language, t } = useLanguage();
  const isSpanish = language === 'es';
  /* the title's last word carries the felt underline on its own line */
  const titleWords = t('schedulePage.title').trim().split(/\s+/);
  const titleHead = titleWords.slice(0, -1).join(' ');
  const titleTail = titleWords[titleWords.length - 1];
  const frameAlt = isSpanish
    ? 'Ilustración de la película de MyHealth Haven: la paciente, en el sofá de su casa, en una videollamada con su Health Navigator y una doctora.'
    : 'Illustration from the MyHealth Haven film: the patient, on the sofa at home, on a video call with her Health Navigator and a doctor.';

  return (
    <PaperPage>
      <FormSheet
        id='schedule-title'
        layout='below'
        title={titleHead}
        emphasis={titleTail}
        sub={t('schedulePage.subtitle')}
        lead={
          language === 'es'
            ? 'Use el calendario en vivo para elegir un horario que le permita revisar opciones de procedimientos, logistica de viaje y el mejor siguiente paso con nuestro equipo.'
            : 'Use the live calendar below to pick a time to review procedure options, travel logistics, and the best next step with our team.'
        }
        frame={{ src: '/pages/schedule-call.webp', alt: frameAlt }}
        frameSizes='(min-width: 1024px) 640px, (min-width: 768px) 704px, 100vw'
      >
        <div className='hp-cal-panel'>
          <div className='hp-cal-window'>
            {/* Google Calendar Appointment Scheduling begin */}
            <iframe
              src='https://calendar.google.com/calendar/appointments/schedules/AcZssZ28J-ANGLgITYbd7PIuSgbWErbc8QVKQu_DQzl5pzXxlQ_mEmhMwi49B0GKipy88u1mv32pA65M?gv=true'
              title={t('schedulePage.title')}
              width='100%'
              height='600'
              style={{ border: 0, display: 'block' }}
              frameBorder='0'
            ></iframe>
            {/* end Google Calendar Appointment Scheduling */}
          </div>
        </div>
      </FormSheet>
    </PaperPage>
  );
};

export default Schedule;
