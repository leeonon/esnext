import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import ESNextBanner from "~/components/Banner";
import ESNextNavbar from "~/components/Navbar";
import Categories from "~/pages/_home/categories";
import Project from "~/pages/_home/project";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery(
    { text: "from tRPC" },
    { refetchOnWindowFocus: false },
  );

  return (
    <>
      <Head>
        <title>ESNext</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ESNextNavbar />
      <ESNextBanner />
      <div className="mx-auto mt-4 flex max-w-screen-xl">
        <Categories />
        <Project />
      </div>
      <main className="bg-primary-color flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
