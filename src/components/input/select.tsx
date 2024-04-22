'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useId, useMemo } from 'react';
import ReactSelect, { MultiValue, SingleValue } from 'react-select';

import styles from './styles/select.module.scss';

import { cn } from '@/lib/utils';

import InputLabel from '@/components/input/inputLabel';
import { SelectOption, SelectProps } from '@/components/input/types';
const Select = ({
  label,
  className,
  labelClassName,
  id,
  required,
  setTouched,
  setValue,
  placeholder,
  value,
  options,
  disabled,
  name,
  error,
  touched,
  isLoading,
  multiple,
  eagerError,
}: SelectProps) => {
  const handleChange = async (
    option: SingleValue<SelectOption> | MultiValue<SelectOption> | null
  ) => {
    // logic here

    await setTouched?.(true, true);

    if (setValue && option && 'value' in option && !multiple) {
      await setValue(option.value, true);
      return;
    }

    if (
      setValue &&
      option &&
      Array.isArray(option) &&
      Array.isArray(value) &&
      multiple
    ) {
      const newValue = option.map((item) => item.value);

      await setValue(newValue, true);
    }
  };

  const handleBlur = async () => {
    if (setTouched) {
      await setTouched(true, true);
    }
  };

  const selectedValue: SingleValue<SelectOption> | MultiValue<SelectOption> =
    useMemo(() => {
      if (!multiple) {
        if (!value || !options) {
          return {
            value: '',
            label: placeholder ? placeholder : 'Select Option',
          };
        }
        const findSelected = options.find((option) => option.value === value);

        if (!findSelected) {
          return {
            value: '',
            label: placeholder ? placeholder : 'Select Option',
          };
        }
        return findSelected;
      }

      if (multiple && Array.isArray(value) && options) {
        const valuesSet = new Set(value);
        return options.filter((option) => valuesSet.has(option.value));
      }

      return [] as SelectOption[];
    }, [options, value, placeholder, multiple]);

  return (
    <div className={cn('w-full', styles.select_wrapper, className)}>
      <div className='flex flex-col gap-2'>
        {label && !!label.length && (
          <div className='flex items-center gap-1'>
            <InputLabel className={labelClassName} id={id} label={label} />
          </div>
        )}
        <ReactSelect
          placeholder={`${placeholder ? placeholder : 'Select Option'}`}
          value={selectedValue}
          options={options}
          onBlur={handleBlur}
          onFocus={handleBlur}
          id={id}
          onChange={handleChange}
          isDisabled={disabled || isLoading}
          required={required}
          name={name}
          captureMenuScroll={true}
          instanceId={useId()}
          isLoading={isLoading}
          isMulti={multiple}
          classNames={{
            option: (state) =>
              cn(
                'hover:bg-[#F0F9FF] hover:text-[#1D2939] p-2 bg-transparent text-base lg:text-base focus:bg-primary focus-within:bg-primary capitalize',
                [state.isSelected && 'font-semibold'],
                [state.isFocused && 'bg-primary bg-opacity-10']
              ),
            control: () =>
              `w-full bg-[#F2F4F7] rounded-lg border px-2 py-2.5 capitalize md:py-3.5 text-base outline-none transition-all duration-300 ease-in placeholder:text-base md:px-4 lg:text-base xl:placeholder:text-base flex react-select`,
            placeholder: () =>
              'text-secondary-grey text-base md:text-base lg:text-base ',
            noOptionsMessage: () => 'text-base lg:text-base',
            dropdownIndicator: () => cn('text-primary-black/80 p-0'),
            input: () => cn('p-0'),
            multiValue: () => 'bg-primary/50 text-white flex rounded-sm px-1',
            multiValueLabel: () => 'text-[0.85em]',
            multiValueRemove: () => 'hover:bg-primary-red',
            valueContainer: () => cn([multiple && 'flex flex-wrap gap-1']),
          }}
          styles={{
            control: () => {
              return {};
            },
            option: () => ({}),
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              padding: 0,
              margin: 0,
              gap: '0.25rem',
            }),
            dropdownIndicator: () => ({}),
            input: (baseStyles) => ({ ...baseStyles, margin: 0, padding: 0 }),
            indicatorSeparator: () => ({}),
            placeholder: (base) => ({ ...base }),
            menuList: (base) => ({ ...base, maxHeight: '10rem' }),
            multiValue: () => ({}),
            multiValueLabel: () => ({}),
            multiValueRemove: () => ({}),
          }}
        />
      </div>
      <AnimatePresence>
        {error &&
          (eagerError || touched) &&
          ((!value && !multiple) || (multiple && !value?.length)) && (
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
    </div>
  );
};

export default Select;
