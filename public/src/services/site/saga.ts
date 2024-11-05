import { call, put, takeEvery } from "redux-saga/effects"
import { getMainSite } from "./api"
import { FETCH_MAIN_SITE, setMainSite } from "./actions";
import ISite from "./model";

const fetchAndSetMainSite = function* () {
  const mainSite: ISite | null = yield call(getMainSite);
  yield put(setMainSite(mainSite));
};

const siteSaga = function* () {
  yield takeEvery(FETCH_MAIN_SITE, fetchAndSetMainSite);
};
export default siteSaga;
