import { TRPCReactProvider } from "~/trpc/react";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

import { ESNextProviders } from "./providers";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ESNext.Dev",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider headers={headers()}>
          <ESNextProviders>
            <Navbar />
            <div className="mx-auto w-full">{children}</div>
            <Footer />
          </ESNextProviders>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
