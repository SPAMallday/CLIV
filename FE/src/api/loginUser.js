// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { apiClient } from '.';

// export const loginUser = createAsyncThunk(
//   // string action type value: 이 값에 따라 pending, fulfilled, rejected가 붙은 액션 타입이 생성된다.
//   'users/fetchByIdStatus',
//   // payloadCreator callback: 비동기 로직의 결과를 포함하고 있는 프로미스를 반환하는 비동기 함수
//   async (userId, thunkAPI) => {
//     const response = await userAPI.fetchById(userId);
//     return response.data;
//   },
//   // 세 번째 파라미터로 추가 옵션을 설정할 수 있다.
//   // condition(arg, { getState, extra } ): boolean (비동기 로직 실행 전에 취소하거나, 실행 도중에 취소할 수 있다.)
//   // dispatchConditionRejection: boolean (true면, condition()이 false를 반환할 때 액션 자체를 디스패치하지 않도록 한다.)
//   // idGenerator(): string (requestId를 만들어준다. 같은 requestId일 경우 요청하지 않는 등의 기능을 사용할 수 있게 된다.)
// );
