import Banner from '~/components/Banner';
import Popular from '~/components/Banner/Popular';

// https://nextjs.org/docs/messages/app-static-to-dynamic-error
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main>
      <div className='relative'>
        <Banner />
        <Popular className='translate-y-[-20px]' />
      </div>
    </main>
  );
}
