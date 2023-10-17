import Banner from "~/components/Banner";
import Popular from "~/components/Popular";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await api.project.popular.query();

  return (
    <main>
      <Banner />
      <Popular projects={data} />
    </main>
  );
}
