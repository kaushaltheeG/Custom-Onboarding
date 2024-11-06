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

export interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  aboutMe: string;
  streetName: string;
  city: string;
  state: string;
  zip: number;
  month: string;
  day: number;
  year: number;
}
export const addNewUser = async (newUser: INewUser): Promise<IUser | null> => {
  // create IUser 
  const { data } = await axios.post(`api/user/new`, newUser);
  return data
};
