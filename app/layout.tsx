import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sunday-os.vercel.app'),
  title: {
    default: 'Sunday — every day is sunday.',
    template: '%s · Sunday',
  },
  description:
    'A church for secular memory. Curated DJ mixtapes, archival video, daily scripture.',
  keywords: ['sunday', 'mixtapes', 'gospel', 'house', 'nostalgia', 'scripture'],
  openGraph: {
    type: 'website',
    title: 'Sunday',
    description: 'A church for secular memory.',
    siteName: 'Sunday',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunday',
    description: 'A church for secular memory.',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#00B7C3',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
