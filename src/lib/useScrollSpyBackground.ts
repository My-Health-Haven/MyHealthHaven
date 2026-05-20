import { useEffect, type RefObject } from 'react';

interface ScrollSection {
  ref: RefObject<HTMLElement | null>;
  color: string;
}

export function useScrollSpyBackground(sections: ScrollSection[]): void {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const triggerPoint = window.innerHeight / 2;
          let newColor = '#ffffff';
          const reversed = [...sections].reverse();
          for (const s of reversed) {
            const top = s.ref.current ? s.ref.current.offsetTop : 0;
            if (scrollY + triggerPoint >= top) {
              newColor = s.color;
              break;
            }
          }
          document.body.style.backgroundColor = newColor;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.backgroundColor = '';
    };
  }, [sections]);
}
