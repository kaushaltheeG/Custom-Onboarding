import { call, put, takeEvery } from "redux-saga/effects"
import { getMainSite, updateSiteLayout } from "./api"
import { FETCH_MAIN_SITE, IUpdateLayoutAction, setMainSite, setSiteError, UPDATE_LAYOUT } from "./actions";
import ISite from "./model";
import { validateNewSiteLayout } from "./utils";
import { setModal } from "../modal/action";

const fetchAndSetMainSite = function* () {
  try {
    const mainSite: ISite | null = yield call(getMainSite);
    yield put(setMainSite(mainSite));
  } catch (e) {
    console.error(e)
  }
};

const updateSiteLayoutSaga = function* ({ payload }: IUpdateLayoutAction) {
  try {
    const { layout, navigate } = payload;
    if (!validateNewSiteLayout(layout)) {
      yield put(setSiteError(new Error('Invalid Site Layout, please recheck your values')));
      return;
    }
    // validate the layout
    const updatedSite: ISite | null = yield call(updateSiteLayout, layout);
    if (!updatedSite) {
      yield put(setSiteError(new Error('Updating Main Site returned null value')));
      return;
    }
    yield put(setMainSite(updatedSite));
    yield put(setSiteError(null));
    yield put(setModal({
      title: 'Successful Change',
      message: 'Congratulations, your new form layout has been applied',
      onConfirm: () => { navigate('/') },
    }));
  } catch (e) {
    console.error(e);
    yield put(setSiteError(new Error('Failed api request to update the site layout')))
  }
}

const siteSaga = function* () {
  yield takeEvery(FETCH_MAIN_SITE, fetchAndSetMainSite);
  yield takeEvery(UPDATE_LAYOUT, updateSiteLayoutSaga)
};
export default siteSaga;
