import { ADD_USER_INFO, IUserActions, SET_USER, SET_USERS } from "./actions";
import { INewUser } from "./api";
import IUser from "./model";


export interface IUserState {
  newUser: INewUser,
  user: IUser | null,
  users: IUser[],
}

const INITIAL_USER_STATE: IUserState = {
  user: null,
  users: [],
  newUser: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    aboutMe: '',
    streetName: '',
    city: '',
    state: '',
    zip: 0,
    month: '',
    day: 0,
    year: 0,
  },
};

const userReducer = (state: IUserState = INITIAL_USER_STATE, action: IUserActions) => {
  switch (action.type) {
    case SET_USER:
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    case SET_USERS:
      const { users } = action.payload;
      return {
        ...state,
        users,
      };
    case ADD_USER_INFO:
      const { user: userInfo } = action.payload;
      return {
        ...state,
        newUser: userInfo,
      };
    default:
      return state;
  }
};
export default userReducer;
