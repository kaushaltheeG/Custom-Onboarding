import { takeEvery, call, put, select } from "redux-saga/effects";
import { addNewUserInfo, GET_USERS, IInsertUser, INSERT_USER, IValidateUser, setUser, setUsers, VALIDATE_USER } from "./actions";
import { addNewUser, getUsers, validateUser } from "./api";
import IUser from "./model";
import { IState } from "../state";
import { getNewUserInfo, isLoggedIn } from "./selectors";
import { createUserFromInput } from "./utils";
import { setCurrentFormPage, setFormError } from "../form/action";
import { INIT_NEW_USER_INFO } from "./reducer";

const fetchAndSetUsersSaga = function* () {
  try {
    const users: IUser[] = yield call(getUsers);
    yield put(setUsers(users));
  } catch (error) {
    console.error(error);
  }
};

const validateUserSaga = function* ({ payload }: IValidateUser) {
  const { email, password } = payload;
  // add error checks for email and password
  try {
    const validUser: IUser | null = yield call(validateUser, { email, password});
    if (!validUser) {
      const state: IState = yield select();
      const newUserInfo = getNewUserInfo(state);
      yield put(addNewUserInfo({ ...newUserInfo, email }));
      return;
    }
    yield put(setUser(validUser));
  } catch (e) {
    console.error(e);
    yield put(setFormError(new Error('Failed validating the user')))
  }
};

const addNewUserSaga = function* ({ payload }: IInsertUser) {
  try {
    const { navigate } = payload;
    const state: IState = yield select();
    const newUserInfo = getNewUserInfo(state);
    const loggedIn = isLoggedIn(state);
    const userData = createUserFromInput(newUserInfo);

    const newUser : IUser | null = yield call(addNewUser, userData);
    if (!newUser) {
      yield put(setFormError(new Error('New user failed, double check values')));
      return;
    }

    if (!loggedIn) {
      yield put(setUser(newUser));
    }
    yield put(setFormError(null));
    yield put(addNewUserInfo(INIT_NEW_USER_INFO));
    yield put(setCurrentFormPage(1));
    navigate('/data');
  } catch (e: any) {
    console.error(e);
    yield put(setFormError(new Error(e?.response?.data?.error || 'Failed add user api request')));
  }
}

const userSaga = function* () {
  yield takeEvery(GET_USERS, fetchAndSetUsersSaga);
  yield takeEvery(VALIDATE_USER, validateUserSaga);
  yield takeEvery(INSERT_USER, addNewUserSaga)
}
export default userSaga;