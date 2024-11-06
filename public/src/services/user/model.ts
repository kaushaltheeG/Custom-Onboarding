
export interface IAddress {
  streetName: string;
  city: string;
  state: string;
  zip: number;
};

export interface IBirthday {
  month: string;
  day: number;
  year: number;
}

export interface IUserData {
  aboutMe: string;
  address: IAddress;
  birthday: IBirthday;
}

export type ICreateUser = Omit<IUser, 'passwordHash' | '_id' | 'created'> & {
  password: string;
};

interface IUser {
  _id: string,
  created: number,
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  data: IUserData;
  pendingCustomer: {
    firstName: string;
    lastName: string;
    email: string;
    data: IUserData;
  },
}
export default IUser;

export interface INewUserInfo {
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
