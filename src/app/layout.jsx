import { Inter } from 'next/font/google';
import '../tailwind.css';
import Providers from './providers';
import JsonLd from '@/components/JsonLd';
import {
  DEFAULT_META_DESCRIPTION,
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
    default: 'MyHealth Haven | Medical Care in Mexico for U.S. Patients',
    template: '%s | MyHealth Haven',
  },
  description: DEFAULT_META_DESCRIPTION,
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
  // logo.png is 495x442. Google only shows a favicon in results when it is
  // square and a multiple of 48px, so these are padded square renders of it.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180' },
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
    <html lang='en' className={inter.variable}>
      <body style={{ margin: 0 }}>
        <JsonLd data={siteSchemas} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
