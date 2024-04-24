import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CiLogout } from 'react-icons/ci';

import { InputSearch } from '@/components/input';

const TopNavigation = () => {
  return (
    <div className='text-primary-text flex h-14 items-center justify-between border border-[#F0F0F0] bg-white px-8 md:h-24'>
      <Link href='/dashboard' className='inline text-lg md:hidden'>
        <Image
          src='/svg/blogger-logo.svg'
          alt='logo'
          width={100}
          height={100}
        />
      </Link>
      <InputSearch
        containerClassName='hidden md:inline-flex w-1/2'
        placeholder='Search'
      />
      <div className='flex items-center gap-6'>
        <div className='inline md:hidden'>
          <Search size={24} />
        </div>
        <div>
          <p className='underline'>Contact support</p>
        </div>
        <div className=''>
          <CiLogout size={24} color='#14241C' />
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
