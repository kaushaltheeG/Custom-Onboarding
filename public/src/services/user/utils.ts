import { ICreateUser, INewUserInfo } from "./model";

// Function to map input data to ICreateUser
export const createUserFromInput = (newUserInfo: INewUserInfo): ICreateUser => {
    const {
      firstName, lastName, email, password, aboutMe,
      streetName, state, city, zip, month, day, year
    } = newUserInfo;
    return {
        firstName,
        lastName,
        email,
        password, // Ensure this is properly hashed in your final logic
        data: {
          aboutMe,
          address: {
              streetName,
              city,
              state,
              zip,
          },
          birthday: {
              month,
              day,
              year,
          },
        },
        pendingCustomer: {
          firstName: '',
          lastName: '',
          email: '',
          data: {
            aboutMe: '',
            address: {
                streetName: '',
                city: '',
                state: '',
                zip: 0,
            },
            birthday: {
                month: '',
                day: 0,
                year: 0,
            },
          },
        },
    };
};