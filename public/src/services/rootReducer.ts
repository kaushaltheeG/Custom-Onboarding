import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { IState } from './state';
import siteReducer from './site/reducer';
import userReducer from './user/reducer';

export const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  site: siteReducer,
  user: userReducer,
});

export type RootState = IState;

export default rootReducer;