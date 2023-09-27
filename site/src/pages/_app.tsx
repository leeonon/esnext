import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { ThemeProvider } from "next-themes";
import { type AppType } from "next/app";

import { NextUIProviders } from "~/pages/providers";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextUIProviders>
        <ThemeProvider attribute="class" storageKey="theme" defaultTheme="dark">
          <Component {...pageProps} />
        </ThemeProvider>
      </NextUIProviders>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
