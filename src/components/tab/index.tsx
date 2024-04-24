'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import useTab from '@/components/tab/useTab';

export { useTab };

const Tab = ({
  tabs,
  activeTab,
  handleChangeTab,
}: {
  tabs: TabArrayProps<string>;
  activeTab: string | null;
  handleChangeTab: (value: string) => void;
}) => {
  return (
    <div className='flex w-full gap-4 overflow-x-auto  pt-1 md:gap-8'>
      {tabs.map((item, idx) => (
        <button
          key={idx}
          className={cn(
            'whitespace-nowrap border-b-2 border-transparent px-6 pt-1 text-[16px]',
            'outline-none',
            {
              'border-primary-100 text-primary-100': activeTab === item.value,
            }
          )}
          onClick={() => handleChangeTab(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Tab;
