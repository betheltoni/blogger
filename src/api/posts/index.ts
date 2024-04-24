import { globalApi } from '@/api';
import {
  DELETE_METHOD,
  GET_METHOD,
  MY_POSTS_PATH,
  PATCH_METHOD,
  POST_METHOD,
  PUT_METHOD,
} from '@/constant/appConstants';

import {
  CreatePostRequest,
  getMyPostsResponse,
  IGetMyPostsParams,
  updateMyPostRequest,
} from '@/types';

const postApi = globalApi.injectEndpoints({
  endpoints: (build) => ({
    getMyPosts: build.query<getMyPostsResponse, IGetMyPostsParams>({
      query: (params) => ({
        url: MY_POSTS_PATH,
        method: GET_METHOD,
        params,
      }),
    }),
    getMyPostsById: build.query<getMyPostsResponse, string>({
      query: (id) => ({
        url: `${MY_POSTS_PATH}/${id}`,
        method: GET_METHOD,
      }),
    }),
    publishMyPost: build.mutation<getMyPostsResponse, string>({
      query: (id) => ({
        url: `${MY_POSTS_PATH}/${id}`,
        method: PATCH_METHOD,
      }),
    }),
    deleteMyPost: build.mutation<getMyPostsResponse, string>({
      query: (id) => ({
        url: `${MY_POSTS_PATH}/${id}`,
        method: DELETE_METHOD,
      }),
    }),
    updateMyPost: build.mutation<getMyPostsResponse, updateMyPostRequest>({
      query: ({ _id, ...data }) => ({
        url: `${MY_POSTS_PATH}/${_id}`,
        method: PUT_METHOD,
        data,
      }),
    }),
    createPost: build.mutation<getMyPostsResponse, CreatePostRequest>({
      query: (data) => ({
        url: MY_POSTS_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
  }),
});

export const {
  useGetMyPostsQuery,
  useGetMyPostsByIdQuery,
  usePublishMyPostMutation,
  useDeleteMyPostMutation,
  useUpdateMyPostMutation,
  useCreatePostMutation,
} = postApi;
