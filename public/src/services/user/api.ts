import IUser, { ICreateUser } from "./model";
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


export const addNewUser = async (newUser: ICreateUser): Promise<IUser | null> => {
  const { data } = await axios.post(`api/user/new`, newUser);
  return data
};
