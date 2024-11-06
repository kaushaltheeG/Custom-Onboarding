import { createStore, applyMiddleware, compose, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { RootState } from './rootReducer';
import rootSaga from './rootSaga';
import { logger } from 'redux-logger';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

// Function to configure the Redux store
const configureStore = (): Store<RootState> => {
  // Create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // Middleware array
  const middleware: any[] = [sagaMiddleware];

  let enhancer;
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    // Production: apply saga middleware only
    enhancer = applyMiddleware(...middleware);
  } else {
    // Development: add logger and compose with Redux DevTools
    middleware.push(logger);
    const composeEnhancers =
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    enhancer = composeEnhancers(applyMiddleware(...middleware));
  }

  // Create the store with the root reducer and enhancer
  const store = createStore(rootReducer(history), enhancer);

  // Run the root saga
  sagaMiddleware.run(rootSaga);

  // @ts-ignore
  return store;
};

export const store = configureStore();
