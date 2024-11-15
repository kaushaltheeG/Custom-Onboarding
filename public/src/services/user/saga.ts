import { takeEvery, call, put, select } from "redux-saga/effects";
import { addNewUserInfo, GET_USERS, IInsertUser, INSERT_USER, IValidateUser, setUser, setUsers, VALIDATE_USER } from "./actions";
import { addNewUser, getUsers, validateUser } from "./api";
import IUser from "./model";
import { IState } from "../state";
import { getNewUserInfo } from "./selectors";
import { createUserFromInput } from "./utils";
import { setCurrentFormPage, setFormError } from "../form/action";
import { INIT_NEW_USER_INFO } from "./reducer";
import { setModal } from "../modal/action";

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
    const userData = createUserFromInput(newUserInfo);

    // check birthday year value
    if (userData.data.birthday.month) {
      const intValue = Number(userData.data.birthday.year);
      const currentYear = new Date().getFullYear()
      const check = currentYear - 100 < intValue && intValue < currentYear + 1;
      if (!check) {
        yield put(setFormError(new Error('Must be under a 100 years old')));
        return;
      }
    }
    
    // convert values to proper types

    const newUser : IUser | null = yield call(addNewUser, userData);
    if (!newUser) {
      yield put(setFormError(new Error('New user failed, double check values')));
      return;
    }

    yield put(setFormError(null));
    yield put(addNewUserInfo(INIT_NEW_USER_INFO));
    yield put(setCurrentFormPage(1));
    yield put(setModal({
      title: 'Successful Submission',
      message: `Congratulations ${newUser.firstName}, you been added to the system`,
      onConfirm: () => { navigate('/data') },
    }));
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