import { AxiosError } from 'axios';

import logger from '@/lib/logger';

import { customToast } from '@/utils/toast';

export default class BloggerError extends Error {
  constructor(message: string, error?: string) {
    super(message);
    this.name = 'Blogger Error';
    this.message = message;
    this.cause = error;
  }
}

export const handleErrors = (error: unknown) => {
  logger({ error });
  if (error instanceof AxiosError) {
    logger(
      {
        error: error.message,
      },
      'Axios Error'
    );

    customToast.error('Error!', error.message);

    return;
  }

  if (typeof error === 'object' && error) {
    if ('data' in error) {
      const errorobj = error.data;
      if (
        errorobj &&
        typeof errorobj === 'object' &&
        'data' in errorobj &&
        errorobj.data &&
        typeof errorobj.data === 'object' &&
        'error' in errorobj.data &&
        typeof errorobj.data.error === 'string'
      ) {
        customToast.error('Error!', errorobj.data.error);

        logger(errorobj.data);
      }
    }
  }
};
