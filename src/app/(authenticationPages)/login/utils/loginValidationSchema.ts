import * as Yup from 'yup';

import {
  LOGIN_EMAIL,
  LOGIN_PASSWORD,
} from '@/app/(authenticationPages)/login/utils/constants';

export const loginInitialValues: {
  [LOGIN_EMAIL]: string;
  [LOGIN_PASSWORD]: string;
} = {
  [LOGIN_EMAIL]: '',
  [LOGIN_PASSWORD]: '',
};

// const passwordRule =
//   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const loginValidationSchema = Yup.object().shape({
  [LOGIN_EMAIL]: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  [LOGIN_PASSWORD]: Yup.string().required('Password is required'),
});
