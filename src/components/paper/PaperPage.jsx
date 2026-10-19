'use client';

import { useRef } from 'react';
import { display } from './fonts';
import { PAPER_CSS } from './paperStyles';
import { usePaperMotion } from './usePaperMotion';

/*
 * The paper world for one page: the display font, the shared stylesheet and the
 * scroll motion. Wrap a page's sheets in it once; everything inside can use the
 * kit (Sheet, PageHero, SectionHead, TileList, Postcard, VideoWindow,
 * ClosingCall, the hp-prose and hp-form styles).
 */
export default function PaperPage({ children, className = '' }) {
  const rootRef = useRef(null);
  usePaperMotion(rootRef);

  return (
    <div ref={rootRef} className={`hp-body ${display.variable} ${className}`}>
      <style>{PAPER_CSS}</style>
      {children}
    </div>
  );
}
