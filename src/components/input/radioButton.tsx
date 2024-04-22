import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, ReactNode } from 'react';

import InputLabel from '@/components/input/inputLabel';
import { RadioProps } from '@/components/input/types';

type RadioButtonProps = RadioProps & {
  helperText?: string;
  formValue?: string;
  setError?: unknown;
  initialValue?: unknown;
  initialTouched?: unknown;
  initialError?: unknown;
};

const RadioButton = ({
  name,
  id,
  label,
  helperText,
  setValue,
  value,
  formValue,
  setTouched,

  ...rest
}: RadioButtonProps) => {
  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    await setValue?.(e.target.value, true);
    await setTouched?.(true, true);
  }

  async function handleBlur() {
    await setTouched?.(true, true);
  }

  delete rest.setError;
  delete rest.touched;
  delete rest.initialValue;
  delete rest.initialTouched;
  delete rest.initialError;

  return (
    <div>
      <div className='flex cursor-pointer items-center gap-3'>
        <input
          type='radio'
          name={name}
          id={id}
          onBlur={handleBlur}
          onChange={handleChange}
          checked={value === formValue}
          value={value}
          {...rest}
          className='!border-secondary checked:before:bg-secondary relative cursor-pointer border !bg-transparent before:absolute before:left-[2px] before:top-[2px] before:h-[10px] before:w-[10px] before:rounded-[50%] checked:bg-none'
        />
        <div className='flex flex-col gap-1'>
          {label && !!label.length && <InputLabel id={id} label={label} />}
          {helperText && !!helperText.length && (
            <label
              htmlFor={id}
              className='text-secondary-grey text-xs font-medium'
            >
              {helperText}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default RadioButton;

type RadioGroupProps = {
  children: ReactNode;
  error: string | string[] | undefined;
  touched: boolean | undefined;
};

export function RadioGroup({ children, touched, error }: RadioGroupProps) {
  return (
    <>
      {children}
      <AnimatePresence>
        {error && !touched && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            className='pl-1 pt-1 text-sm font-semibold text-red-300'
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
