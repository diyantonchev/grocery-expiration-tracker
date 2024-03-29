import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ClerkProvider } from '@clerk/nextjs';

import { Inter } from 'next/font/google';
import '~/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Grocery Expiration Tracker',
  description: 'Track your groceries and never let them go to waste.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`font-sans ${inter.variable}`}>
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </ClerkProvider>
    </html>
  );
}
