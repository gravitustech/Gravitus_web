import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import configReducer from '../reducers/appConfig';
import AdminUserReducer from '../reducers/adminUser';
import SocketReducer from '../reducers/account';
import MenuReducer from '../reducers/menu';

const persistConfig = {
  key: 'store',
  storage
};

const rootReducer = combineReducers({
  config    : configReducer,
  user      : AdminUserReducer,
  account   : SocketReducer,
  menu      : MenuReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk, logger);

export const store = configureStore({ reducer: persistedReducer }, composeWithDevTools(middleware));
export const persistor = persistStore(store);
// export default store;