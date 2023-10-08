import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { type AppType } from "next/app";

import Footer from "~/components/Footer";
import ESNextNavbar from "~/components/Navbar";
import { ESNextProviders } from "~/pages/providers";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ESNextProviders>
        <ESNextNavbar />
        <Component {...pageProps} />
        <Footer />
      </ESNextProviders>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
