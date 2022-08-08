import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../api';

export const loginUser = createAsyncThunk(
  // string action type value: 이 값에 따라 pending, fulfilled, rejected가 붙은 액션 타입이 생성된다.
  'userInfo/loginUser',
  // payloadCreator callback: 비동기 로직의 결과를 포함하고 있는 프로미스를 반환하는 비동기 함수
  async (access_token, thunkAPI) => {
    try {
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
      token: '', // jwt 토큰
    },
    isLogin: null,
  },
  reducers: {
    increment: (state) => {
      console.log('inc');
    },
    // login 성공 시
    loginSuccess: (state, action) => {
      // state.id = action.payload.id;
      // state.role = action.payload.role;
      // state.nickname = action.payload.nickname;
      state.id = 'id';
      state.role = 'role';
      state.nickname = 'nickname';
      state.isLogin = true;
      return state;
    },
    // login 실패 시
    loginFailure: (state) => {
      state.id = '';
      state.role = '';
      state.nickname = '';
      state.isLogin = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // state.loading = false;
        state.user.token = action.payload.appToken; // jwt 토큰, 분해해야됨
        console.log('fulfilled');
      })
      .addCase(loginUser.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.error; // action.error인 것을 주의
        console.log('rejected');
      });
  },
  // extraReducers: {
  //   [loadBucket.pending]: (state, action) => {
  //     console.log('pending');
  //   },
  //   // fullflled 되었을 때, 서버에서 받아온 데이터를 state에 넣어줌!
  //   // 첫번째 파라미터는 redux의 state이고 두번째 파라미터는 action
  //   [loadBucket.fulfilled]: (state, action) => {
  //     // state.list = action.payload;
  //     console.log('fulfilled');
  //   },
  //   [loadBucket.rejected]: (state, action) => {
  //     console.log('rejected');
  //   },
  // },
});

// export const { loginSuccess, loginFailure } = userInfoSlice.actions;

export default userInfoSlice.reducer;
