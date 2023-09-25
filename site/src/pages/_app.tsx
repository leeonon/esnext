import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { NextUIProviders } from '~/pages/providers';

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextUIProviders>
        <Component {...pageProps} />
      </NextUIProviders>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
