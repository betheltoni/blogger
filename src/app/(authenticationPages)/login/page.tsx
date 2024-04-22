'use client';
import { useFormik } from 'formik';
import React from 'react';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';

import {
  LOGIN_EMAIL,
  LOGIN_PASSWORD,
} from '@/app/(authenticationPages)/login/utils/constants';
import {
  loginInitialValues,
  loginValidationSchema,
} from '@/app/(authenticationPages)/login/utils/loginValidationSchema';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: () => {
      //logic here
    },
  });

  function getFormikPropsInput(id: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  }
  return (
    <section>
      <div className='mx-auto my-[150px] flex w-[40%] flex-col gap-6 '>
        <div className='flex flex-col gap-2'>
          <p className='text-[32px] font-semibold leading-[44px]'>Log in</p>
          <p className='text-base'>Log in to your blogger account</p>
        </div>
        <form>
          <section className='flex flex-col gap-6'>
            <div>
              <Input
                id={LOGIN_EMAIL}
                type='email'
                label='Email Address'
                placeholder='Email Address'
                inputClassName='bg-[#F2F4F7]'
                {...getFormikPropsInput(LOGIN_EMAIL)}
              />
            </div>
            <div>
              <Input
                id={LOGIN_PASSWORD}
                type='password'
                label='Password'
                placeholder='Password'
                inputClassName='bg-[#F2F4F7]'
                {...getFormikPropsInput(LOGIN_PASSWORD)}
              />
            </div>
            <div className=''>
              <Button
                type='submit'
                className='flex w-full items-center justify-center py-3 text-center'
              >
                Log in
              </Button>
            </div>
          </section>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
