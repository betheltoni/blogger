'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { InputLabel } from '@/components/input';
import { InputProps } from '@/components/input/types';

export default function Input({
  id,
  labelClassName,
  className,
  inputClassName,
  containerClassName,
  label,
  touched,
  error,
  type = 'text',
  value,
  variant = 'primary',
  required,
  eagerError,
  helperText,
  ...rest
}: InputProps) {
  const [hidden, setHidden] = useState<boolean>(true);

  const toggleVisibility = (): void => {
    setHidden((prevState) => !prevState);
  };

  delete rest.initialError;
  delete rest.initialTouched;
  delete rest.initialValue;

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col items-start justify-center gap-1'>
          {label && !!label.length && (
            <InputLabel className={labelClassName} id={id} label={label} />
          )}
          {helperText && !!helperText.length && (
            <label
              htmlFor={id}
              className='text-secondary-grey text-xs font-medium'
            >
              {helperText}
            </label>
          )}
        </div>
        {type === 'password' && (
          <div
            className={cn(
              'relative flex w-full flex-row items-center overflow-hidden rounded-lg border text-base transition-all duration-300 ease-linear md:text-base lg:text-base',
              [
                variant === 'primary' && 'border-tertiary-grey bg-white',
                variant === 'secondary' && 'bg-light-grey border-transparent',
              ],
              [touched && error && 'bg-primary-red/10'],
              [containerClassName && containerClassName]
            )}
          >
            <input
              type={hidden ? 'password' : 'text'}
              value={value}
              autoComplete='off'
              id={id}
              {...rest}
              className={cn(
                'placeholder:text-secondary-grey text-primary-black w-full border-0 bg-transparent py-2.5 pl-2 pr-[20%] text-base shadow-none outline-none ring-0 placeholder:text-base focus:ring-0 disabled:cursor-not-allowed md:py-3.5 md:pl-4 md:pr-[15%] md:text-base md:placeholder:text-base lg:pr-[8.33%] lg:text-base lg:placeholder:text-base',
                [className && className],
                [inputClassName && inputClassName]
              )}
              required={required}
            />

            <span className='text-secondary absolute right-0 -translate-x-1/2'>
              {!hidden ? (
                <span
                  onClick={toggleVisibility}
                  className='text-secondary-grey select-none text-base font-medium'
                >
                  Hide
                </span>
              ) : (
                <span
                  onClick={toggleVisibility}
                  className='text-secondary-grey select-none text-base font-medium'
                >
                  Show
                </span>
              )}
            </span>
          </div>
        )}

        {(type === 'email' ||
          type === 'date' ||
          type === 'text' ||
          type === 'number' ||
          type === 'time') && (
          <div
            className={cn(
              'flex w-full flex-row items-center overflow-hidden rounded-lg border text-base transition-all duration-300 ease-linear md:text-base lg:text-base',
              [
                variant === 'primary' && 'border-tertiary-grey bg-white',
                variant === 'secondary' && 'bg-light-grey border-transparent',
              ],
              [touched && error && 'bg-primary-red/10']
            )}
          >
            <input
              type={type}
              value={value}
              id={id}
              {...rest}
              className={cn(
                'placeholder:text-secondary-grey text-primary-black w-full border-0 bg-transparent px-2 py-2.5 text-base shadow-none outline-none ring-0 placeholder:text-base focus:ring-0 disabled:cursor-not-allowed md:px-4 md:py-3.5 md:text-base md:placeholder:text-base lg:text-base lg:placeholder:text-base',
                [className && className],
                [inputClassName && inputClassName]
              )}
              required={required}
            />
          </div>
        )}
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
}
