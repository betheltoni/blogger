import * as Yup from 'yup';

import {
  CREATE_POST_BODY,
  CREATE_POST_DESCRIPTION,
  CREATE_POST_TAGS,
  CREATE_POST_TITLE,
} from '@/app/(authenticatedPages)/posts/utils/constants';

export const createPostInitialValues: {
  [CREATE_POST_TITLE]: string;
  [CREATE_POST_DESCRIPTION]: string;
  [CREATE_POST_TAGS]: string[];
  [CREATE_POST_BODY]: string;
} = {
  [CREATE_POST_TITLE]: '',
  [CREATE_POST_DESCRIPTION]: '',
  [CREATE_POST_TAGS]: [],
  [CREATE_POST_BODY]: '',
};

export const createPostValidationSchema = Yup.object().shape({
  [CREATE_POST_TITLE]: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(20, 'Title must be less than 20 characters'),
  [CREATE_POST_DESCRIPTION]: Yup.string()
    .required('Description is required')
    .min(3, 'Description must be at least 3 characters')
    .max(50, 'Description must be less than 50 characters'),
  [CREATE_POST_TAGS]: Yup.string().required('Tags is required'),
  [CREATE_POST_BODY]: Yup.string().required('Body is required'),
});
