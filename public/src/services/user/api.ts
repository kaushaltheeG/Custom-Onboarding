import { DeepPartial } from "../utils";
import IUser from "./model";
import axios from 'axios';

export const getUsers = async (): Promise<IUser[]> => {
  const { data } = await axios.get(`api/user/all`);
  return data;
}

export const validateUser = async ({
  email,
  password,
}: {
  email: string,
  password: string,
}): Promise<IUser | null> => {
  const { data } = await axios.post(`api/user/validate`, { email, password });
  return data
};

export type NewUserType = DeepPartial<IUser> & { password?: string };
export const addNewUser = async (newUser: NewUserType): Promise<IUser | null> => {
  const { data } = await axios.post(`api/user/new`, newUser);
  return data
};
