import { API_URL } from "../utils";
import IUser, { ICreateUser } from "./model";
import axios from 'axios';

export const getUsers = async (): Promise<IUser[]> => {
  const { data } = await axios.get(`${API_URL}/api/user/all`);
  return data;
}

export const validateUser = async ({
  email,
  password,
}: {
  email: string,
  password: string,
}): Promise<IUser | null> => {
  const { data } = await axios.post(`${API_URL}/api/user/validate`, { email, password });
  return data
};


export const addNewUser = async (newUser: ICreateUser): Promise<IUser | null> => {
  const { data } = await axios.post(`${API_URL}/api/user/new`, newUser);
  return data
};
