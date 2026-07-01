import type {Metadata} from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: 'italic',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: 'Brasa Viva',
  description: 'Buffet Halal à volonté',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-[var(--text-primary)] bg-[var(--bg-page)]">{children}</body>
    </html>
  );
}
