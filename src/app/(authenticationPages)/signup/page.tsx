'use client';
import { useFormik } from 'formik';
import React from 'react';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';

import {
  SIGNUP_EMAIL,
  SIGNUP_FIRST_NAME,
  SIGNUP_LAST_NAME,
  SIGNUP_PASSWORD,
} from '@/app/(authenticationPages)/signup/utils/constants';
import {
  signupInitialValues,
  signupValidationSchema,
} from '@/app/(authenticationPages)/signup/utils/signupValidationSchema';

const SignupPage = () => {
  const formik = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupValidationSchema,
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
          <p className='text-[32px] font-semibold leading-[44px]'>Sign up</p>
          <p className='text-base'>Create an account with blogger</p>
        </div>
        <form>
          <section className='flex flex-col gap-6'>
            <div>
              <Input
                id={SIGNUP_FIRST_NAME}
                type='text'
                label='First Name'
                placeholder='First Name'
                inputClassName='bg-[#F2F4F7]'
                {...getFormikPropsInput(SIGNUP_FIRST_NAME)}
              />
            </div>
            <div>
              <Input
                id={SIGNUP_LAST_NAME}
                type='text'
                label='Last Name'
                placeholder='Last Name'
                inputClassName='bg-[#F2F4F7]'
                {...getFormikPropsInput(SIGNUP_LAST_NAME)}
              />
            </div>
            <div>
              <Input
                id={SIGNUP_EMAIL}
                type='email'
                label='Email Address'
                placeholder='Email Address'
                inputClassName='bg-[#F2F4F7]'
                {...getFormikPropsInput(SIGNUP_EMAIL)}
              />
            </div>
            <div>
              <Input
                id={SIGNUP_PASSWORD}
                type='password'
                label='Password'
                placeholder='Password'
                inputClassName='bg-[#F2F4F7]'
                {...getFormikPropsInput(SIGNUP_PASSWORD)}
              />
            </div>
            <div className=''>
              <Button
                type='submit'
                className='flex w-full items-center justify-center py-2 text-center'
              >
                Continue
              </Button>
            </div>
          </section>
        </form>
      </div>
    </section>
  );
};

export default SignupPage;
