import { apiClient } from '.';

// 클래스 생성
export const classCreate = async () => {
  try {
    const res = await apiClient.post(`/api/class/create`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 목록
export const classList = async () => {
  try {
    const res = await apiClient.get(`/api/class/list`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 메인 클래스 목록
export const mainList = async () => {
  try {
    const res = await apiClient.get(`/api/main/list`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 상세
export const classDetail = async (classId) => {
  try {
    const res = await apiClient.get(`/api/class/${classId}`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 신청
export const registClass = async (classId) => {
  try {
    const res = await apiClient.post(`/api/class/${classId}`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 신청내역
export const reserveClass = async (userId) => {
  try {
    // const res = await apiClient.get(`/api/class/re`);   //**** */
    // return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 개최내역
export const holdClass = async (userId) => {
  try {
    // const res = await apiClient.get(`/api/class/${userId}`);
    // return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 실시간 클래스 입장
export const getToken = async (classId) => {
  try {
    const res = await apiClient.post(`/api/class/session/${classId}`);
    return res.data.token;
  } catch (err) {
    // response와 request의 특성, if의 조건문 순서를 이용해서 error를 핸들링
    if (err.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      // console.log(err.response.data);
      // console.log(err.response.status);
      // console.log(err.response.headers);
    } else if (err.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      // console.log(err.request);
    } else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      // console.log('Error', err.message);
    }
    // console.log(err.config);
  }
};

// 클래스 관리 - 예정 클래스 조회
export const getExClass = async () => {
  try {
    const res = await apiClient.get(`/api/class/manage/expected`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 관리 - 지난 클래스 조회
export const getClosedClass = async () => {
  try {
    const res = await apiClient.get(`/api/class/manage/close`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 실시간 클래스 퇴장
export const exitClass = async (classId) => {
  try {
    const res = await apiClient.patch(`/api/class/session/${classId}`);
    return res.status;
  } catch (err) {
    // response와 request의 특성, if의 조건문 순서를 이용해서 error를 핸들링
    if (err.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      // console.log(err.response.data);
      // console.log(err.response.status);
      // console.log(err.response.headers);
    } else if (err.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      // console.log(err.request);
    } else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      // console.log('Error', err.message);
    }
    // console.log(err.config);
  }
};
