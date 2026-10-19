import { Young_Serif } from 'next/font/google';

/* One instance shared by the hero and the paper body: Young Serif sets the
   headlines only; everything else stays in the site's Inter. */
export const display = Young_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-hh-display',
});
