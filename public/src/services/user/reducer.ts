import { allMonthList, stateAcronymList } from "../../utils";
import { ADD_USER_INFO, IUserActions, SET_USER, SET_USERS } from "./actions";
import { INewUserInfo } from "./model";
import IUser from "./model";


export interface IUserState {
  newUser: INewUserInfo,
  user: IUser | null,
  users: IUser[],
}
export const INIT_NEW_USER_INFO = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  aboutMe: '',
  streetName: '',
  city: '',
  state: stateAcronymList[0],
  zip: '',
  month: allMonthList[0],
  day: 1,
  year: 0,
}
const INITIAL_USER_STATE: IUserState = {
  user: null,
  users: [],
  newUser: INIT_NEW_USER_INFO,
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
