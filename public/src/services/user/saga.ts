import { takeEvery, call, put } from "redux-saga/effects";
import { GET_USERS, IValidateUser, setUser, setUsers, VALIDATE_USER } from "./actions";
import { getUsers, validateUser } from "./api";
import IUser from "./model";

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
    yield put(setUser(validUser));
  } catch (error) {
    console.error(error);
  }
}

const userSaga = function* () {
  yield takeEvery(GET_USERS, fetchAndSetUsersSaga);
  yield takeEvery(VALIDATE_USER, validateUserSaga);
}
export default userSaga;