import React, { PropsWithChildren } from 'react';

import SideNavigation from '@/components/sideNavigation';
import TopNavigation from '@/components/topNavigation';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  return (
    <div className='md:grid-cols-layout relative mx-auto grid h-[100dvh] max-w-screen-2xl grid-cols-1'>
      <SideNavigation />
      <div className='grid-rows-layout grid h-[100dvh]'>
        <TopNavigation />
        <main className='overflow-auto bg-[#F9F9F9] px-4 pb-20 pt-6 md:px-6 md:pt-10'>
          {children}
        </main>
      </div>
    </div>
  );
}
