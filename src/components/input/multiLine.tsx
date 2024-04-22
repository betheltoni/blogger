'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

import InputLabel from '@/components/input/inputLabel';
import { MultilineProps } from '@/components/input/types';

const MultiLine = ({
  id,
  error,
  touched,
  label,
  labelClassName,
  rows,
  variant = 'primary',
  inputClassName,
  containerClassName,
  className,
  maxLength,
  eagerError,
  ...rest
}: MultilineProps) => {
  delete rest.initialError;
  delete rest.initialTouched;
  delete rest.initialValue;
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-1'>
          {label && !!label.length && (
            <InputLabel className={labelClassName} id={id} label={label} />
          )}
        </div>
        <div
          className={cn(
            'flex w-full flex-col rounded-[8px] border text-xs transition-all duration-300 ease-linear md:text-sm lg:text-base',
            [
              variant === 'primary' && 'border-tertiary-grey bg-white',
              variant === 'secondary' && 'bg-secondary-grey',
            ],
            [touched && error && 'bg-primary-red/10'],
            [containerClassName && containerClassName]
          )}
        >
          <textarea
            id={id}
            rows={rows}
            {...rest}
            className={cn(
              'placeholder:text-secondary-grey text-primary-black w-full border-0 bg-transparent px-2 py-2.5 text-xs shadow-none outline-none ring-0 placeholder:text-xs focus:ring-0 md:px-4 md:py-3.5 md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base',
              'resize-none',
              [className && className],
              [inputClassName && inputClassName]
            )}
          />
          {maxLength && (
            <div className='mb-2 mr-2 text-right text-xs'>
              {`${rest?.value}`.length}
              <span className='text-gray-600'>&nbsp;/&nbsp;{maxLength}</span>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {(eagerError || touched) && error && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            className='pl-1 pt-1 text-xs font-semibold text-red-300'
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiLine;
