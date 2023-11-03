import { Inter as FontSans } from 'next/font/google';
import { headers } from 'next/headers';
import { Toaster } from 'sonner';

import Footer from '~/components/Footer';
import MainNavbar from '~/components/MainNavbar';
import GlobalStyles from '~/styles/GlobalStyles';
import { TRPCReactProvider } from '~/trpc/react';

import { ESNextProviders } from './providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'ESNext.Dev',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`font-sans ${fontSans.variable}`}>
        <TRPCReactProvider headers={headers()}>
          <ESNextProviders>
            <MainNavbar />
            <div className='mx-auto w-full'>{children}</div>
            <Footer />
            <Toaster />
          </ESNextProviders>
        </TRPCReactProvider>
        <GlobalStyles />
      </body>
    </html>
  );
}
