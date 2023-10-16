import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { type AppType } from "next/app";

import Footer from "~/components/Footer";
import ESNextNavbar from "~/components/Navbar";
import { ESNextProviders } from "~/components/Providers";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import "~/styles/readme.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ESNextProviders>
        <ESNextNavbar />
        <div className="mx-auto w-full max-w-screen-2xl px-20 max-lg:px-12 max-md:px-5">
          <Component {...pageProps} />
        </div>
        <Footer />
      </ESNextProviders>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
