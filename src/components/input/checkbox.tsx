import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, ReactElement, ReactNode } from 'react';

import InputLabel from '@/components/input/inputLabel';
import { RadioProps } from '@/components/input/types';

export type CheckboxProps = Omit<
  RadioProps,
  | 'initialError'
  | 'initialTouched'
  | 'initialValue'
  | 'setError'
  | 'label'
  | 'value'
> & {
  label: ReactElement | string;
  formValue: string[];
  value: string;
  initialError?: unknown;
  initialTouched?: unknown;
  initialValue?: unknown;
  setError?: unknown;
  touched?: unknown;
};

export default function Checkbox({
  name,
  id,
  label,
  setValue,
  value,
  setTouched,
  formValue,
  ...rest
}: CheckboxProps) {
  delete rest.initialError;
  delete rest.initialTouched;
  delete rest.initialValue;
  delete rest.setError;
  delete rest.touched;

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const id = formValue.indexOf(e.target.value);
    const formValueCopy = [...formValue];

    formValueCopy.splice(id, 1);
    const newFormValue: string[] =
      id === -1 ? [...formValue, e.target.value] : formValueCopy;

    await setValue?.(newFormValue, true);
    await setTouched?.(true, true);
  }

  async function handleBlur() {
    await setTouched?.(true, true);
  }

  return (
    <div>
      <div className='flex items-start gap-2'>
        <input
          type='checkbox'
          name={name}
          id={id}
          onChange={handleChange}
          checked={formValue.includes(value)}
          value={value}
          onBlur={handleBlur}
          {...rest}
          className='!border-secondary text-secondary relative cursor-pointer focus:ring-0'
        />
        <div className='flex flex-col gap-1'>
          {label && <InputLabel id={id} label={label} />}
        </div>
      </div>
    </div>
  );
}

type CheckboxGroupProps = {
  children: ReactNode;
  error: string | string[] | undefined;
  touched: boolean | undefined;
};

export function CheckboxGroup({
  children,
  touched,
  error,
}: CheckboxGroupProps) {
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
