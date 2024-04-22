import * as Yup from 'yup';

import {
  SIGNUP_EMAIL,
  SIGNUP_FIRST_NAME,
  SIGNUP_LAST_NAME,
  SIGNUP_PASSWORD,
} from '@/app/(authenticationPages)/signup/utils/constants';

export const signupInitialValues: {
  [SIGNUP_FIRST_NAME]: string;
  [SIGNUP_LAST_NAME]: string;
  [SIGNUP_EMAIL]: string;
  [SIGNUP_PASSWORD]: string;
} = {
  [SIGNUP_FIRST_NAME]: '',
  [SIGNUP_LAST_NAME]: '',
  [SIGNUP_EMAIL]: '',
  [SIGNUP_PASSWORD]: '',
};

const passwordRule =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const signupValidationSchema = Yup.object().shape({
  [SIGNUP_FIRST_NAME]: Yup.string()
    .required('Please enter your first name')
    .min(3, 'First name must be at least 3 characters')
    .max(20, 'First name must be less than 20 characters'),
  [SIGNUP_LAST_NAME]: Yup.string()
    .required('Please enter your last name')
    .min(3, 'Last name must be at least 3 characters')
    .max(20, 'Last name must be less than 20 characters'),
  [SIGNUP_EMAIL]: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  [SIGNUP_PASSWORD]: Yup.string()
    .required('Password is required')
    .matches(
      passwordRule,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),
});
