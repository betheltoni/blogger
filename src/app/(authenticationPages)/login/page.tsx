'use client';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

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
import { handleErrors } from '@/utils/custom-error';

const LoginPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      //logic here
      setSubmitting(true);
      try {
        const result = await signIn('login', {
          ...values,
          redirect: false,
        });
        router.push('/dashboard');
        setSubmitting(false);
        if ((!result || result.error) && result?.error !== undefined) {
          if (result?.error === 'CredentialsSignin') {
            (await import('react-hot-toast')).toast.error(
              'Error!, Something went wrong'
            );
            return;
          }
          (await import('react-hot-toast')).toast.error(
            'Error!, Something went wrong'
          );
        }
        formik.resetForm();
      } catch (error) {
        handleErrors(error);
      } finally {
        setSubmitting(false);
      }
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
        <form onSubmit={formik.handleSubmit}>
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
                isLoading={submitting}
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
