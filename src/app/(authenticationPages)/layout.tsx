'use client';
import Image from 'next/image';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        <div className='ml-4 mt-4'>
          <Image
            src='/svg/blogger-logo.svg'
            alt='logo'
            width={200}
            height={200}
          />
        </div>
        {children}
        <div>
          <hr className='mx-auto' />
          <div className='flex justify-center bg-[#F9F9F9] pt-2 text-[15px] text-[#131E4B] lg:text-[20px] 2xl:text-[25px] 2xl:leading-normal'>
            &copy; Betheltoni {new Date().getFullYear()}. All rights Reserved
          </div>
        </div>
      </div>
    </section>
  );
}
