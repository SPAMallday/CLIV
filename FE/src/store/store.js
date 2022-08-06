import { configureStore } from '@reduxjs/toolkit';
import videoClassReducer from './modules/VideoClassModule';
import userInfoReducer from './modules/loginUser';

export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), // serialize 오류 생길경우~
  // middleware: [sagaMiddleware] //  redux-saga를 사용할 경우에 씀 T_T
});
