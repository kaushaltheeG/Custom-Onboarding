import IModel from "./IModel";

export interface IAddress {
  streetName: string;
  city: string;
  state: string;
  zip: string;
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

export type ICreateUser = Omit<IUser, 'passwordHash'> & {
  password: string;
};

interface IUser extends IModel {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  data: IUserData;
}
export default IUser;

export const isValidUserData = (obj: any, checkLength = true): boolean => {
  const firstCheck = (
    'aboutMe' in obj && typeof obj.aboutMe === 'string' &&
    'address' in obj && isValidAddress(obj.address, checkLength) &&
    'birthday' in obj && isValidBirthday(obj.birthday, checkLength)
  )
  if (!checkLength) {
    return firstCheck;
  }
  return firstCheck && obj.aboutMe.length;
};

export const isValidAddress = (obj: any, checkLength = true): boolean => {
  const firstCheck = (
    'streetName' in obj && typeof obj.streetName === 'string' &&
    'city' in obj && typeof obj.city === 'string' &&
    'state' in obj && typeof obj.state === 'string' &&
    'zip' in obj && typeof obj.zip === 'string'
  );
  if (!checkLength) {
    return firstCheck;
  }
  return (
    firstCheck &&
    obj.streetName.length &&
    obj.city.length &&
    obj.state.length
  );
};

export const isValidBirthday = (obj: any, checkLength = true): boolean => {
  const firstCheck = (
    'month' in obj && typeof obj.month === 'string' &&
    'day' in obj && typeof obj.day === 'number' &&
    'year' in obj && typeof obj.year === 'number'
  );
  if (!checkLength) {
    return firstCheck;
  }
  return firstCheck  && obj.month.length;
};
