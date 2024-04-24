'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import { NAV_LINKS } from '@/components/sideNavigation/constants';

const SideNavigation = () => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        'text-primary-text flex flex-col justify-between border-r border-[#F0F0F0] bg-white py-1 md:py-8',
        'fixed bottom-0 left-0 right-0 z-[1] md:static'
      )}
    >
      <div>
        <Link
          href='/dashboard'
          className='mb-10 ml-10 hidden text-center md:block'
        >
          <Image
            src='/svg/blogger-logo.svg'
            alt='logo'
            width={120}
            height={120}
          />
        </Link>
        <nav className='flex justify-between px-4 md:flex-col md:justify-start md:gap-2 md:px-0 md:pl-5'>
          {NAV_LINKS.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                'text-primary-bg-contrast rounded-s-lg',
                'flex flex-col items-center gap-1 md:flex-row md:gap-4',
                'py-3 md:px-7 md:py-4 md:pr-16',
                [
                  pathname === item.href &&
                    '!text-primary rounded-lg border-r-[3px] border-[#3C688C] bg-[#E7ECF1]',
                ]
              )}
            >
              <item.icon
                className={cn(' h-5 w-5 md:h-6 md:w-6', [
                  pathname === item.href && 'stroke-primary-100',
                ])}
              />
              <span
                className={cn('text-xs font-medium md:text-sm', [
                  pathname === item.href && 'text-primary-100',
                ])}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideNavigation;
