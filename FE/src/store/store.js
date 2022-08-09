import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './modules/loginUser';
import classDetailReducer from './modules/classDetail';

export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    classDetail: classDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), // serialize 오류 생길경우~
  // middleware: [sagaMiddleware] //  redux-saga를 사용할 경우에 씀 T_T
});
