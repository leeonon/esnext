import type { GetServerSidePropsContext } from "next";

import Head from "next/head";
import { useParams } from "next/navigation";

import ProjectBaseInfo from "~/components/Info/Base";

export default function ProjectInfo() {
  const { name } = useParams();

  return (
    <div className="max-w-screen-xl py-8">
      <Head>
        <title>ESNext - {name}</title>
      </Head>
      <ProjectBaseInfo />
    </div>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { query } = context;
  const { name } = query;
  if (!name) {
    return { redirect: { destination: "/404" } };
  }

  return {
    props: {},
  };
};
