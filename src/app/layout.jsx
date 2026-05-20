import { Inter } from 'next/font/google';
import '../tailwind.css';
import Providers from './providers';
import JsonLd from '@/components/JsonLd';
import {
  createMedicalBusinessSchema,
  createOrganizationSchema,
  createWebsiteSchema,
} from '@/lib/siteSeo';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL('https://www.myhealthhaven.org'),
  title: {
    default:
      'MyHealth Haven | Health Navigation Between the U.S. and Mexico',
    template: '%s | MyHealth Haven',
  },
  description:
    'MyHealth Haven helps U.S. patients navigate trusted medical care in Mexico with bilingual support, transparent planning, and continuity before and after treatment.',
  openGraph: {
    siteName: 'MyHealth Haven',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/cancun-skyline.jpg', alt: 'MyHealth Haven' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  other: {
    'format-detection': 'telephone=no',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00897B',
};

const siteSchemas = [
  createOrganizationSchema(),
  createMedicalBusinessSchema(),
  createWebsiteSchema(),
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ margin: 0 }}>
        <JsonLd data={siteSchemas} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
