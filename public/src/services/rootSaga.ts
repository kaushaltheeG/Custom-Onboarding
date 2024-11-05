import { all, spawn } from 'redux-saga/effects';
import siteSaga from './site/saga';
import userSaga from './user/saga';

const sagas: any[] = [
  siteSaga,
  userSaga,
];

const rootSaga = function* () {
  yield all(sagas.map(saga => spawn(saga)));
}
export default rootSaga;