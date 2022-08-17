import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; // reducer가 실행될 때 persist도 묶어서 사용.
import storage from 'redux-persist/lib/storage'; // localStorage에 저장하기 위함.
import userInfoReducer from './modules/loginUser';

// config
// localStorage의 key, value
const persistConfig = {
  key: 'user', // localStorage에 저장될 때의 key값.
  storage,
  whitelist: ['userInfo'],
};

const rootReducers = combineReducers({
  userInfo: userInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), // serialize 오류 생길경우~ // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  // middleware: [sagaMiddleware] //  redux-saga를 사용할 경우에 씀 T_T
});

export const persistor = persistStore(store);
export default store;
