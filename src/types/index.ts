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
