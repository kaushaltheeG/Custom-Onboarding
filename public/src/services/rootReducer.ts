import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { IState } from './state';
import siteReducer from './site/reducer';
import userReducer from './user/reducer';
import formReducer from './form/reducer';

export const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  site: siteReducer,
  user: userReducer,
});

export type RootState = IState;

export default rootReducer;