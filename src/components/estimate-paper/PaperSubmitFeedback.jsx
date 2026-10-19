'use client';
import React, { useEffect, useRef } from 'react';
import { CircleAlert, CircleCheck, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cls } from '@/components/paper/paperStyles';

/*
 * Paper version of src/components/estimate/SubmitFeedback: the same success and
 * error messages (role=alert, as the MUI Alert had) and the same disclaimer,
 * set on the form card. A message that appears is brought into view (no smooth
 * scroll with reduced motion) and takes focus, so on a phone it is never left
 * below the screen. The success note stands in place of the emptied fields.
 */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const bringIntoView = (el) => {
  if (!el) return;
  el.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};

/* an error that belongs to no single field (server answers, rate limit); attempt
   changes on every submit, so a repeated error is brought back into view too */
export function ErrorSlip({ message, attempt }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    bringIntoView(ref.current);
  }, [message, attempt]);

  return (
    <div ref={ref} tabIndex={-1} role='alert' className='hp-est-note hp-est-err'>
      <CircleAlert aria-hidden='true' />
      <span>{message}</span>
    </div>
  );
}

/* the request went out: the note replaces the emptied fields, with a way back */
export function SuccessNote({ againLabel, onAgain }) {
  const { t } = useLanguage();
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    bringIntoView(ref.current);
  }, []);

  const again = () => {
    onAgain();
    window.requestAnimationFrame(() => document.getElementById('estimate-name')?.focus());
  };

  return (
    <div ref={ref} tabIndex={-1} role='alert' className='hp-est-done'>
      <span aria-hidden='true' className='hp-est-done-mark'>
        <CircleCheck />
      </span>
      <p className='m-0 max-w-[30rem] font-[family-name:var(--font-hh-display)] text-[1.375rem] leading-[1.35] text-[#1b4560] [text-wrap:balance] sm:text-[1.5rem]'>
        {t('estimatePage.feedback.success')}
      </p>
      <button type='button' onClick={again} className={`${cls.btnOutline} mt-7`}>
        <RotateCcw aria-hidden='true' className='size-5' />
        {againLabel}
      </button>
    </div>
  );
}

export function Disclaimer() {
  const { t } = useLanguage();
  return (
    <div className='mt-6 border-0 border-t border-dashed border-[rgba(27,69,96,0.22)] pt-4'>
      <p className='m-0 max-w-[36rem] text-[0.875rem] leading-[1.55] text-[#3f5868]'>
        {t('estimatePage.disclaimer')}
      </p>
    </div>
  );
}
