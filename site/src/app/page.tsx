import Image from 'next/image';

import Banner from '~/components/Banner';
import Popular from '~/components/Banner/Popular';

export default function Home() {
  return (
    <main>
      <div className='relative'>
        <Banner />
        <Popular className='translate-y-[-20px]' />
        <section>
          <div className='px-5 py-16 md:px-10 md:py-24 lg:py-32'>
            <div className='mx-auto mb-8 max-w-3xl text-center md:mb-12 lg:mb-16'>
              <h2 className='text-3xl font-bold md:text-5xl'>
                Focus your efforts on building your best product
              </h2>
              <p className='mx-auto mb-8 mt-4 max-w-lg text-[#647084] md:mb-12 lg:mb-16'>
                Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                aliquam,purus sit amet luctus magna fringilla urna
              </p>
              <div className='flex justify-center'>
                <div className='mr-6 md:mr-10 lg:mr-12'>
                  <h3 className='text-2xl font-bold text-[#276ef1] md:text-3xl'>
                    45k+
                  </h3>
                  <p className='text-sm text-[#636262]'>Happy Customers</p>
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-[#276ef1] md:text-3xl'>
                    200K+
                  </h3>
                  <p className='text-sm text-[#636262]'>Emails Sent</p>
                </div>
              </div>
            </div>
            <Image width={2190} height={1000} src='/home.png' alt='' />
          </div>
        </section>

        <section>
          <div className='mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32'>
            <div className='mx-auto flex max-w-3xl flex-col items-center text-center'>
              <h2 className='text-3xl font-bold md:text-5xl'>
                Seamlessly Organize and Prioritize Tasks.
              </h2>
              <p className='mx-auto mb-8 mt-4 text-[#636262] md:mb-12 lg:mb-16'>
                Lorem ipsum dolor sit amet consectetur adipiscing
              </p>
            </div>
            <ul className='grid gap-5 sm:grid-cols-2 md:gap-4 lg:gap-6'>
              <li className='rounded-md bg-zinc-200 p-8 dark:bg-zinc-900 md:p-10'>
                <div className='flex flex-row items-center justify-between'>
                  <p className='bg-background mr-4 rounded-md px-4 py-2 font-semibold uppercase'>
                    Strategy
                  </p>
                  <svg
                    width='40'
                    height='40'
                    viewBox='0 0 40 40'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M34.2972 10.8739L20.4472 5.0869C20.1603 4.97103 19.8397 4.97103 19.5528 5.0869L5.70277 10.8739C5.4697 10.9755 5.276 11.1505 5.15104 11.3724C5.02607 11.5943 4.97665 11.8511 5.01027 12.1037L7.3186 29.4647C7.34387 29.6509 7.41342 29.8283 7.52139 29.9819C7.62935 30.1355 7.77257 30.2608 7.93897 30.3472L19.4806 36.1343C19.6432 36.2105 19.8205 36.25 20 36.25C20.1795 36.25 20.3568 36.2105 20.5194 36.1343L32.061 30.3472C32.2274 30.2608 32.3706 30.1355 32.4786 29.9819C32.5866 29.8283 32.6561 29.6509 32.6814 29.4647L34.9897 12.1037C35.0233 11.8511 34.9739 11.5943 34.849 11.3724C34.724 11.1505 34.5303 10.9755 34.2972 10.8739V10.8739ZM25.7131 25.7176C25.5493 25.7902 25.3728 25.8296 25.1937 25.8334C24.979 25.8332 24.7684 25.7737 24.5852 25.6614C24.4019 25.5491 24.2531 25.3884 24.155 25.1968L22.9431 22.7518H17.0569L15.845 25.1968C15.7073 25.4731 15.4657 25.6831 15.1735 25.7808C14.8813 25.8785 14.5624 25.8558 14.2869 25.7176C14.0114 25.5795 13.8019 25.3373 13.7045 25.0442C13.6071 24.7512 13.6298 24.4314 13.7675 24.1551L18.9613 13.7385C19.0596 13.5472 19.2085 13.3868 19.3917 13.2748C19.575 13.1627 19.7854 13.1035 20 13.1035C20.2146 13.1035 20.425 13.1627 20.6083 13.2748C20.7915 13.3868 20.9404 13.5472 21.0387 13.7385L26.2325 24.1551C26.3645 24.4323 26.3841 24.7501 26.2873 25.0415C26.1904 25.3329 25.9846 25.5753 25.7131 25.7176V25.7176ZM20 16.849L21.789 20.437H18.211L20 16.849Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </div>
                <div className='mb-20 mt-4 h-0.5 w-full bg-zinc-800'></div>
                <p className='mb-3 text-xl font-semibold'>
                  Intuitive Calendar Interface
                </p>
                <p className='text-sm text-[#636262]'>
                  The XYZ Payment App is a user-friendly mobile application that
                  revolutionizes the way you handle your payments and
                  transactions. With its intuitive interface and robust
                  functionality.
                </p>
              </li>
              <li className='rounded-md bg-zinc-200 p-8 dark:bg-zinc-900 md:p-10'>
                <div className='flex flex-row items-center justify-between'>
                  <p className='bg-background mr-4 rounded-md px-4 py-2 font-semibold uppercase'>
                    Strategy
                  </p>
                  <svg
                    width='40'
                    height='40'
                    viewBox='0 0 40 40'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M34.2972 10.8739L20.4472 5.0869C20.1603 4.97103 19.8397 4.97103 19.5528 5.0869L5.70277 10.8739C5.4697 10.9755 5.276 11.1505 5.15104 11.3724C5.02607 11.5943 4.97665 11.8511 5.01027 12.1037L7.3186 29.4647C7.34387 29.6509 7.41342 29.8283 7.52139 29.9819C7.62935 30.1355 7.77257 30.2608 7.93897 30.3472L19.4806 36.1343C19.6432 36.2105 19.8205 36.25 20 36.25C20.1795 36.25 20.3568 36.2105 20.5194 36.1343L32.061 30.3472C32.2274 30.2608 32.3706 30.1355 32.4786 29.9819C32.5866 29.8283 32.6561 29.6509 32.6814 29.4647L34.9897 12.1037C35.0233 11.8511 34.9739 11.5943 34.849 11.3724C34.724 11.1505 34.5303 10.9755 34.2972 10.8739V10.8739ZM25.7131 25.7176C25.5493 25.7902 25.3728 25.8296 25.1937 25.8334C24.979 25.8332 24.7684 25.7737 24.5852 25.6614C24.4019 25.5491 24.2531 25.3884 24.155 25.1968L22.9431 22.7518H17.0569L15.845 25.1968C15.7073 25.4731 15.4657 25.6831 15.1735 25.7808C14.8813 25.8785 14.5624 25.8558 14.2869 25.7176C14.0114 25.5795 13.8019 25.3373 13.7045 25.0442C13.6071 24.7512 13.6298 24.4314 13.7675 24.1551L18.9613 13.7385C19.0596 13.5472 19.2085 13.3868 19.3917 13.2748C19.575 13.1627 19.7854 13.1035 20 13.1035C20.2146 13.1035 20.425 13.1627 20.6083 13.2748C20.7915 13.3868 20.9404 13.5472 21.0387 13.7385L26.2325 24.1551C26.3645 24.4323 26.3841 24.7501 26.2873 25.0415C26.1904 25.3329 25.9846 25.5753 25.7131 25.7176V25.7176ZM20 16.849L21.789 20.437H18.211L20 16.849Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </div>
                <div className='mb-20 mt-4 h-0.5 w-full bg-zinc-800'></div>
                <p className='mb-3 text-xl font-semibold'>
                  Intuitive Calendar Interface
                </p>
                <p className='text-sm text-[#636262]'>
                  The XYZ Payment App is a user-friendly mobile application that
                  revolutionizes the way you handle your payments and
                  transactions. With its intuitive interface and robust
                  functionality.
                </p>
              </li>
              <li className='rounded-md bg-zinc-200 p-8 dark:bg-zinc-900 md:p-10'>
                <div className='flex flex-row items-center justify-between'>
                  <p className='bg-background mr-4 rounded-md px-4 py-2 font-semibold uppercase'>
                    Strategy
                  </p>
                  <svg
                    width='40'
                    height='40'
                    viewBox='0 0 40 40'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M34.2972 10.8739L20.4472 5.0869C20.1603 4.97103 19.8397 4.97103 19.5528 5.0869L5.70277 10.8739C5.4697 10.9755 5.276 11.1505 5.15104 11.3724C5.02607 11.5943 4.97665 11.8511 5.01027 12.1037L7.3186 29.4647C7.34387 29.6509 7.41342 29.8283 7.52139 29.9819C7.62935 30.1355 7.77257 30.2608 7.93897 30.3472L19.4806 36.1343C19.6432 36.2105 19.8205 36.25 20 36.25C20.1795 36.25 20.3568 36.2105 20.5194 36.1343L32.061 30.3472C32.2274 30.2608 32.3706 30.1355 32.4786 29.9819C32.5866 29.8283 32.6561 29.6509 32.6814 29.4647L34.9897 12.1037C35.0233 11.8511 34.9739 11.5943 34.849 11.3724C34.724 11.1505 34.5303 10.9755 34.2972 10.8739V10.8739ZM25.7131 25.7176C25.5493 25.7902 25.3728 25.8296 25.1937 25.8334C24.979 25.8332 24.7684 25.7737 24.5852 25.6614C24.4019 25.5491 24.2531 25.3884 24.155 25.1968L22.9431 22.7518H17.0569L15.845 25.1968C15.7073 25.4731 15.4657 25.6831 15.1735 25.7808C14.8813 25.8785 14.5624 25.8558 14.2869 25.7176C14.0114 25.5795 13.8019 25.3373 13.7045 25.0442C13.6071 24.7512 13.6298 24.4314 13.7675 24.1551L18.9613 13.7385C19.0596 13.5472 19.2085 13.3868 19.3917 13.2748C19.575 13.1627 19.7854 13.1035 20 13.1035C20.2146 13.1035 20.425 13.1627 20.6083 13.2748C20.7915 13.3868 20.9404 13.5472 21.0387 13.7385L26.2325 24.1551C26.3645 24.4323 26.3841 24.7501 26.2873 25.0415C26.1904 25.3329 25.9846 25.5753 25.7131 25.7176V25.7176ZM20 16.849L21.789 20.437H18.211L20 16.849Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </div>
                <div className='mb-20 mt-4 h-0.5 w-full bg-zinc-800'></div>
                <p className='mb-3 text-xl font-semibold'>
                  Intuitive Calendar Interface
                </p>
                <p className='text-sm text-[#636262]'>
                  The XYZ Payment App is a user-friendly mobile application that
                  revolutionizes the way you handle your payments and
                  transactions. With its intuitive interface and robust
                  functionality.
                </p>
              </li>
              <li className='rounded-md bg-zinc-200 p-8 dark:bg-zinc-900 md:p-10'>
                <div className='flex flex-row items-center justify-between'>
                  <p className='bg-background mr-4 rounded-md px-4 py-2 font-semibold uppercase'>
                    Strategy
                  </p>
                  <svg
                    width='40'
                    height='40'
                    viewBox='0 0 40 40'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M34.2972 10.8739L20.4472 5.0869C20.1603 4.97103 19.8397 4.97103 19.5528 5.0869L5.70277 10.8739C5.4697 10.9755 5.276 11.1505 5.15104 11.3724C5.02607 11.5943 4.97665 11.8511 5.01027 12.1037L7.3186 29.4647C7.34387 29.6509 7.41342 29.8283 7.52139 29.9819C7.62935 30.1355 7.77257 30.2608 7.93897 30.3472L19.4806 36.1343C19.6432 36.2105 19.8205 36.25 20 36.25C20.1795 36.25 20.3568 36.2105 20.5194 36.1343L32.061 30.3472C32.2274 30.2608 32.3706 30.1355 32.4786 29.9819C32.5866 29.8283 32.6561 29.6509 32.6814 29.4647L34.9897 12.1037C35.0233 11.8511 34.9739 11.5943 34.849 11.3724C34.724 11.1505 34.5303 10.9755 34.2972 10.8739V10.8739ZM25.7131 25.7176C25.5493 25.7902 25.3728 25.8296 25.1937 25.8334C24.979 25.8332 24.7684 25.7737 24.5852 25.6614C24.4019 25.5491 24.2531 25.3884 24.155 25.1968L22.9431 22.7518H17.0569L15.845 25.1968C15.7073 25.4731 15.4657 25.6831 15.1735 25.7808C14.8813 25.8785 14.5624 25.8558 14.2869 25.7176C14.0114 25.5795 13.8019 25.3373 13.7045 25.0442C13.6071 24.7512 13.6298 24.4314 13.7675 24.1551L18.9613 13.7385C19.0596 13.5472 19.2085 13.3868 19.3917 13.2748C19.575 13.1627 19.7854 13.1035 20 13.1035C20.2146 13.1035 20.425 13.1627 20.6083 13.2748C20.7915 13.3868 20.9404 13.5472 21.0387 13.7385L26.2325 24.1551C26.3645 24.4323 26.3841 24.7501 26.2873 25.0415C26.1904 25.3329 25.9846 25.5753 25.7131 25.7176V25.7176ZM20 16.849L21.789 20.437H18.211L20 16.849Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </div>
                <div className='mb-20 mt-4 h-0.5 w-full bg-zinc-800'></div>
                <p className='mb-3 text-xl font-semibold'>
                  Intuitive Calendar Interface
                </p>
                <p className='text-sm text-[#636262]'>
                  The XYZ Payment App is a user-friendly mobile application that
                  revolutionizes the way you handle your payments and
                  transactions. With its intuitive interface and robust
                  functionality.
                </p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
