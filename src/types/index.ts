import {
  CREATE_POST_BODY,
  CREATE_POST_DESCRIPTION,
  CREATE_POST_TAGS,
  CREATE_POST_TITLE,
} from '@/app/(authenticatedPages)/posts/utils/constants';

export interface LoginResponse {
  token: string;
  user: IUserObject;
  message: string;
}

export interface IUserObject {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface CreateUserResponse {
  user: IUserObject;
  message: string;
}

export interface CreateUserRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}
export interface IFetchQueryParams {
  limit: number;
  page: number;
  sort: string[];
  search?: string;
  searchFields?: string[];
}

export interface IBlogObject {
  _id: string;
  title: string;
  description: string;
  author: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    __v: number;
  };
  state: string;
  read_count: number;
  reading_time: number;
  tags: string[];
  body: string;
  timeStamp: Date | string;
  __v: number;
}

export interface IGetMyPostsParams extends IFetchQueryParams {
  query?: {
    state?: string;
    author?: string;
  };
}

export interface getMyPostsResponse {
  message: string;
  blogs: IBlogObject[];
  totalData: number;
  totalPages: number;
  page: number;
}

export interface CreatePostRequest {
  [CREATE_POST_TITLE]: string;
  [CREATE_POST_DESCRIPTION]: string;
  [CREATE_POST_TAGS]: string[];
  [CREATE_POST_BODY]: string;
}

export interface updateMyPostRequest {
  _id: string;
  [CREATE_POST_TITLE]: string;
  [CREATE_POST_DESCRIPTION]: string;
  [CREATE_POST_TAGS]: string[];
  [CREATE_POST_BODY]: string;
}
