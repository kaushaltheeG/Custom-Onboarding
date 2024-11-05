import { IState } from "../state";

export const isLoggedIn = (state: IState) => Boolean(state.user.user);

export const getLoggedInUser = (state: IState) => state.user.user;

export const getNewUserInfo = (state: IState) => state.user.newUser;

export const getAllUsers = (state: IState) => state.user.users;
