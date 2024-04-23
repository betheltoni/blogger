'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import toast, { CheckmarkIcon, ErrorIcon } from 'react-hot-toast';
import { PiXBold } from 'react-icons/pi';

import { toastVariant } from '@/utils/toast/utils/toastVariants';

type CustomToastType = {
  message: string;
  title: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isOpen: boolean;
  id: string;
};

const CustomToast: React.FC<CustomToastType> = ({
  message,
  type,
  title,
  isOpen,
  id,
}) => {
  return (
    <AnimatePresence mode='sync'>
      {isOpen && type === 'success' && (
        <motion.div
          variants={toastVariant}
          initial='initial'
          animate='animate'
          exit='exit'
          key={id}
          className='border-secondary-green w-max max-w-full rounded-lg border-l-8 bg-white p-2 shadow-md md:w-max md:max-w-xs'
        >
          <div className='item-start grid grid-cols-[1fr_auto] gap-2'>
            <div className='grid grid-cols-[auto_1fr] gap-2'>
              <div className='text-secondary-green aspect-square h-max rounded-xl border-2 border-[#B5E3C4] bg-[#E7F6EC] p-1'>
                <CheckmarkIcon
                  style={{
                    background: '#04802E',
                  }}
                />
              </div>
              <div className='border-r pr-2'>
                <p className='text-xs font-semibold md:text-sm'>{title}</p>
                <p className='text-xs font-normal text-[#475367] md:text-sm'>
                  {message}
                </p>
              </div>
            </div>
            <button onClick={() => toast.dismiss(id)} className='h-max'>
              <PiXBold />
            </button>
          </div>
        </motion.div>
      )}

      {isOpen && type === 'error' && (
        <motion.div
          variants={toastVariant}
          initial='initial'
          animate='animate'
          exit='exit'
          key={id}
          className='border-primary-red w-max max-w-full rounded-lg border-l-8 bg-white p-2 shadow-md md:w-max md:max-w-xs'
        >
          <div className='item-start grid grid-cols-[1fr_auto] gap-2'>
            <div className='grid grid-cols-[auto_1fr] gap-2'>
              <div className='text-primary-red aspect-square h-max rounded-xl border-2 border-[#dc262620] bg-[#dc262610] p-1'>
                <ErrorIcon
                  style={{
                    background: '#dc2626',
                  }}
                />
              </div>
              <div className='border-r pr-2'>
                <p className='text-xs font-semibold md:text-sm'>{title}</p>
                <p className='text-xs font-normal text-[#475367] md:text-sm'>
                  {message}
                </p>
              </div>
            </div>
            <button onClick={() => toast.dismiss(id)} className='h-max'>
              <PiXBold />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomToast;
