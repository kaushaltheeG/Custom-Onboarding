import { call, put, takeEvery } from "redux-saga/effects"
import { getMainSite, updateSiteLayout } from "./api"
import { FETCH_MAIN_SITE, IUpdateLayoutAction, setMainSite, UPDATE_LAYOUT } from "./actions";
import ISite from "./model";
import { validateNewSiteLayout } from "./utils";

const fetchAndSetMainSite = function* () {
  try {
    const mainSite: ISite | null = yield call(getMainSite);
    yield put(setMainSite(mainSite));
  } catch (error) {
    console.error(error)
  }
};

const updateSiteLayoutSage = function* ({ payload }: IUpdateLayoutAction) {
  try {
    const { layout } = payload;
    if (!validateNewSiteLayout(layout)) {
      throw new Error('Invalid Site Layout, please recheck your values');
    }
    // validate the layout
    const updatedSite: ISite | null = yield call(updateSiteLayout, layout);
    if (!updatedSite) {
      throw new Error('Updating Main Site returned null value');
    }
    yield put(setMainSite(updatedSite));
  } catch (error) {
    console.log(error)
  }
}

const siteSaga = function* () {
  yield takeEvery(FETCH_MAIN_SITE, fetchAndSetMainSite);
  yield takeEvery(UPDATE_LAYOUT, updateSiteLayoutSage)
};
export default siteSaga;
