import { takeEvery, call, put, select } from "redux-saga/effects";
import { addNewUserInfo, GET_USERS, INSERT_USER, IValidateUser, setUser, setUsers, VALIDATE_USER } from "./actions";
import { addNewUser, getUsers, validateUser } from "./api";
import IUser from "./model";
import { IState } from "../state";
import { getNewUserInfo, isLoggedIn } from "./selectors";
import { createUserFromInput } from "./utils";
import { setCurrentFormPage } from "../form/action";
import { INIT_NEW_USER_INFO } from "./reducer";

const fetchAndSetUsersSaga = function* () {
  try {
    const users: IUser[] = yield call(getUsers);
    yield put(setUsers(users));
  } catch (error) {
    console.error(error);
    // show error model or add to error state
  }
};

const validateUserSaga = function* ({ payload }: IValidateUser) {
  const { email, password } = payload;
  // add error checks for email and password
  try {
    const validUser: IUser | null = yield call(validateUser, { email, password});
    console.log(validUser);
    if (!validUser) {
      const state: IState = yield select();
      const newUserInfo = getNewUserInfo(state);
      yield put(addNewUserInfo({ ...newUserInfo, email }));
      return;
    }
    yield put(setUser(validUser));
  } catch (error) {
    console.error(error);
  }
};

const addNewUserSaga = function* () {
  try {
    const state: IState = yield select();
    const newUserInfo = getNewUserInfo(state);
    const loggedIn = isLoggedIn(state);
    const userData = createUserFromInput(newUserInfo);

    const newUser : IUser | null = yield call(addNewUser, userData);
    if (!newUser) {
      // error handle
      console.error('Failed to create user')
      return;
    }

    if (!loggedIn) {
      yield put(setUser(newUser));
    }
    yield put(addNewUserInfo(INIT_NEW_USER_INFO));
    yield put(setCurrentFormPage(1));
  } catch (error) {
    console.error(error);
  }
}

const userSaga = function* () {
  yield takeEvery(GET_USERS, fetchAndSetUsersSaga);
  yield takeEvery(VALIDATE_USER, validateUserSaga);
  yield takeEvery(INSERT_USER, addNewUserSaga)
}
export default userSaga;