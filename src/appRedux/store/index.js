import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import reducers
import AdminUserReducer from '../reducers/adminUser';
import MenuReducer from '../reducers/menu';
import SocketReducer from '../reducers/account';

const persistConfig = {
  key: 'store',
  storage
};

const rootReducer = combineReducers({
  user: AdminUserReducer,
  account: SocketReducer,
  menu: MenuReducer
});

const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk, logger);

export const store = configureStore({ reducer: pReducer }, composeWithDevTools(middleware));
export const persistor = persistStore(store);
// export default store;
