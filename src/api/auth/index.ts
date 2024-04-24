import { globalApi } from '@/api';
import { POST_METHOD, SIGNUP_PATH } from '@/constant/appConstants';

import { CreateUserRequest, CreateUserResponse } from '@/types';

const authApi = globalApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<CreateUserResponse, CreateUserRequest>({
      query: (data) => ({
        url: SIGNUP_PATH,
        method: POST_METHOD,
        data: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateUserMutation } = authApi;
