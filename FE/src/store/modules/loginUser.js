import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../api';
import jwtDecode from 'jwt-decode';

export const loginUser = createAsyncThunk(
  // string action type value: 이 값에 따라 pending, fulfilled, rejected가 붙은 액션 타입이 생성된다.
  'userInfo/loginUser',
  // payloadCreator callback: 비동기 로직의 결과를 포함하고 있는 프로미스를 반환하는 비동기 함수
  async (access_token, thunkAPI) => {
    try {
      console.log('액토', access_token);
      const res = await apiClient.post('/api/kakao/login', {
        accessToken: `${access_token}`,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
  // 세 번째 파라미터로 추가 옵션을 설정할 수 있다.
  // condition(arg, { getState, extra } ): boolean (비동기 로직 실행 전에 취소하거나, 실행 도중에 취소할 수 있다.)
  // dispatchConditionRejection: boolean (true면, condition()이 false를 반환할 때 액션 자체를 디스패치하지 않도록 한다.)
  // idGenerator(): string (requestId를 만들어준다. 같은 requestId일 경우 요청하지 않는 등의 기능을 사용할 수 있게 된다.)
);

// 저장되는 내용
// id, role, nickname
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    user: {
      id: '',
      role: '',
      nickname: '',
      expTime: 0,
      token: '', // jwt 토큰
    },
    isLogin: false,
    loading: false,
  },
  reducers: {
    // login 성공 시
    loginSuccess: (state) => {
      // state.id = action.payload.id;
      // state.role = action.payload.role;
      // state.nickname = action.payload.nickname;
      state.isLogin = true;
      // return state;
    },
    // login 실패 시
    loginFailure: (state) => {
      state.isLogin = false;
      // return state;
    },
    // logout 성공 시
    logout: (state) => {
      // state.id = action.payload.id;
      // state.role = action.payload.role;
      // state.nickname = action.payload.nickname;
      state.isLogin = false;
      // return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        // 로딩중
        state.loading = true;

        console.log('pending');
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        sessionStorage.setItem('jwt', action.payload.appToken);
        state.user.token = action.payload.appToken; // jwt 토큰, 분해해야됨

        const decoded = jwtDecode(action.payload.appToken);

        state.user.id = decoded.sub;
        state.user.role = decoded.role;
        state.user.nickname = decoded.nickname;
        state.user.expTime = decoded.exp;

        state.isLogin = true;

        state.loading = false;
        console.log('fulfilled');
      })
      .addCase(loginUser.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.error; // action.error인 것을 주의
        console.log('rejected');
      });
  },
});

export const { loginSuccess, loginFailure, logout } = userInfoSlice.actions;

export default userInfoSlice.reducer;
