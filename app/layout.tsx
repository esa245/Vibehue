import type { Metadata, Viewport } from 'next';
import './globals.css'; // Global styles

export const viewport: Viewport = {
  themeColor: '#090d16',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'IM Softworks - VibeHue Studio',
  description: 'IM Softworks mobile touch application with full display color vibration experience and corporate software portal.',
  applicationName: 'IM Softworks',
  authors: [{ name: 'Mohammad Esa Ali', url: 'https://res.cloudinary.com/dlklqihg6/image/upload/v1760308052/kkchmpjdp9izcjfvvo4k.jpg' }],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'IM Softworks',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'IM Softworks - VibeHue Studio',
    description: 'IM Softworks mobile touch application with full display color vibration experience and corporate software portal.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IM Softworks - VibeHue Studio',
    description: 'IM Softworks mobile touch application with full display color vibration experience and corporate software portal.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body suppressHydrationWarning className="bg-slate-950 text-white select-none antialiased">
        {children}
      </body>
    </html>
  );
}
