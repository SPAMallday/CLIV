import { openViduApiClient as OVApi } from '.';

// 세션 종료
export const sessionClose = async (sessionId) => {
  try {
    const res = await apiClient.delete(`/sessions/${sessionId}`);
    // 204 성공 & 404 실패
    switch (res.status) {
      // 생성 성공
      case 204:
        return true;
      // 400은 body 문제 409는 Custom SessionID의 중복
      case 404:
        return false;
      default:
        break;
    }
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 아마 필요없을 듯
// 세션 생성
export const sessionInitilize = async () => {
  try {
    const res = await OVApi.post(
      `/sessions`,
      // 다양한 세팅을 보낼 수 있는데 그냥 빈칸으로 보냄
      {},
      // config 파트
      // 기본 axios 인스턴스 생성할 때 Auth 헤더를 설정하고
      // 여기서 추가 설정을 하는데 의도한 대로 Auth헤더를 덮어쓰지 않고
      // Content-Type만 추가적으로 적용되는지는 의문
      { headers: { 'Content-Type': 'application/json' } },
    );
    //sessionID를 리턴
    switch (res.status) {
      // 생성 성공
      case 200:
        return res.id;
      // 400은 body 문제 409는 Custom SessionID의 중복
      case (400, 409):
        return null;
      default:
        break;
    }
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 세션 입장
export const sessionJoin = async (sessionId) => {
  try {
    const res = await OVApi.post(
      `/sessions`,
      {
        // 세팅은 모두 기본값
      },
      { headers: { 'Content-Type': 'application/json' } },
    );
    //Connection Object를 리턴
    switch (res.status) {
      // 생성 성공
      case 200:
        return res.id;
      // 400은 body 문제 409는 Custom SessionID의 중복
      case (400, 409):
        return null;
      default:
        break;
    }
  } catch (err) {
    console.log('Error >>', err);
  }
};
