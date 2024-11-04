import IModel from "./IModel";

export interface IAddress {
  streetName: string,
  city: string,
  state: string,
  zip: number,
};

export interface IBirthday {
  month: string,
  day: number,
  year: number,
}

export interface IUserData {
  aboutMe: string,
  address: IAddress,
  birthday: IBirthday,
}

interface IUser extends IModel {
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
  data: IUserData,
  pendingCustomer: {
    firstName: string,
    lastName: string,
    email: string,
    data: IUserData,
  },
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
    'streeName' in obj && typeof obj.streeName === 'string' &&
    'city' in obj && typeof obj.city === 'string' &&
    'state' in obj && typeof obj.state === 'string' &&
    'zip' in obj && typeof obj.zip === 'number'
  );
  if (!checkLength) {
    return firstCheck;
  }
  return (
    firstCheck &&
    obj.streeName.length &&
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

export const isValidPendingCustomer = (obj: any): boolean => {
  return (
    'firstName' in obj &&
    'lastName' in obj &&
    'email' in obj &&
    'data' in obj &&
    isValidUserData(obj.data, false)
  );
};
