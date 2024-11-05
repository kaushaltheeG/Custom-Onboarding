import { DeepPartial } from "../utils";
import IUser from "./model";

export const SET_USER = 'user/SET_USER';
export const GET_USERS = 'user/GET_USERS';
export const SET_USERS = 'user/SET_USERS';
export const VALIDATE_USER = 'user/VALIDATE_USER';
export const ADD_USER_INFO = 'user/ADD_USER_INFO';
export const INSERT_USER = 'user/INSERT_USER';


export interface ISetUser {
  payload: { user: IUser | null };
  type: typeof SET_USER;
}

export interface ISetUsers {
  payload: { users: IUser[] };
  type: typeof SET_USERS;
}

export interface IGetUsers {
  type: typeof GET_USERS;
}

export interface IValidateUser {
  payload: { email: string, password: string };
  type: typeof VALIDATE_USER;
}

export interface IAddUserInfo {
  payload: { user: DeepPartial<IUser> };
  type: typeof ADD_USER_INFO;
}

export interface IInsertUser {
  type: typeof INSERT_USER;
}

export type IUserActions = (
  IGetUsers |
  ISetUser |
  IValidateUser |
  IAddUserInfo |
  ISetUsers |
  IInsertUser
);

export const fetchUsers = (): IGetUsers => {
  return {
    type: GET_USERS,
  };
};

export const validateUser = (email: string, password: string): IValidateUser => {
  return {
    payload: { email, password },
    type: VALIDATE_USER,
  };
};

export const setUser = (user: IUser | null): ISetUser => {
  return {
    payload: { user },
    type: SET_USER,
  };
};

export const setUsers = (users: IUser[]): ISetUsers => {
  return {
    payload: { users },
    type: SET_USERS,
  };
};

export const addUserInfo = (user: DeepPartial<IUser>): IAddUserInfo => {
  return {
    payload: { user },
    type: ADD_USER_INFO,
  };
};

export const insertUser = (): IInsertUser => {
  return {
    type: INSERT_USER,
  };
};
