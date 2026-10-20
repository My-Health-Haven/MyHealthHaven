'use client';

import Link from 'next/link';
import { House } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PaperPage from '@/components/paper/PaperPage';
import PageHero from '@/components/paper/PageHero';
import { cls } from '@/components/paper/paperStyles';
import { useLanguage } from '@/context/LanguageContext';

const COPY = {
  en: {
    title: 'Page not found',
    home: 'Go Home',
    alt: 'Illustration from the MyHealth Haven film: a patient stands in a maze of grey paths.',
  },
  es: {
    title: 'Página no encontrada',
    home: 'Ir al inicio',
    alt: 'Ilustración de la película de MyHealth Haven: una paciente de pie en un laberinto de caminos grises.',
  },
};

/*
 * 404 in the paper world: the site header and footer (so a lost visitor can find
 * their way), and the film's maze before the path is found, with the way home as
 * the one action. Same words as before ("404", "Page not found", "Go Home").
 */
export default function NotFound() {
  const { language } = useLanguage();
  const t = COPY[language === 'es' ? 'es' : 'en'];

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex-1'>
        <PaperPage>
          <PageHero id='nf-title' title='404' emphasis={t.title} frame={{ src: '/pages/lost-maze.webp', alt: t.alt }}>
            <Link href='/' className={cls.btnPrimary}>
              <House aria-hidden='true' className='size-5' />
              {t.home}
            </Link>
          </PageHero>
        </PaperPage>
      </main>
      <Footer />
    </div>
  );
}
