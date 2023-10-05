// import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import Head from "next/head";

import ESNextBanner from "~/components/Banner";
import ESNextNavbar from "~/components/Navbar";
import Top from "~/components/Top";
import Project from "~/pages/_home/_project";
import Categories from "~/pages/_home/categories";
import Tags from "~/pages/_home/tags";

// import { api } from "~/utils/api";

export default function Home() {
  const [filterVisible, setFilterVisible] = useState(true);
  // const hello = api.example.hello.useQuery(
  //   { text: "from tRPC" },
  //   { refetchOnWindowFocus: false },
  // );

  const onChangeFilterVisible = useCallback(() => {
    setFilterVisible((prev) => !prev);
  }, []);

  return (
    <>
      <Head>
        <title>ESNext</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ESNextNavbar />
      <ESNextBanner />
      <div></div>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col px-5 md:px-10 lg:px-16">
        <Tags
          onChangeFilter={onChangeFilterVisible}
          categoryVisible={filterVisible}
        />
        <div className="flex">
          <Categories visible={filterVisible} />
          <Project />
        </div>
      </div>
      <Top />
      {/* <main className="bg-primary-color flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main> */}
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
