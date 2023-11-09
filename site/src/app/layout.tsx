import { Inter as FontSans, Recursive } from 'next/font/google';
import { headers } from 'next/headers';
import { Toaster } from 'sonner';

import Footer from '~/components/Footer';
import MainNavbar from '~/components/MainNavbar';
import GlobalStyles from '~/styles/GlobalStyles';
import { TRPCReactProvider } from '~/trpc/react';
import { api } from '~/trpc/server';

import { ESNextProviders } from './providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontRecursive = Recursive({
  subsets: ['latin'],
  variable: '--font-recursive',
});

export const metadata = {
  title: 'ESNext.Dev',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await api.project.categories.query();

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`font-sans ${fontSans.variable} ${fontRecursive.variable}`}
      >
        <TRPCReactProvider headers={headers()}>
          <ESNextProviders categories={categories}>
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
