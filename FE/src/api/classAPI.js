import { apiClient } from '.';

// 클래스 생성
// export const classCreate = async () => {
//   try {
//     const res = await apiClient.post(`/api/class/create`);
//     return res.data;
//   } catch (err) {
//     console.log('Error >>', err);
//   }
// };

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
    const res = await apiClient.post(`/api/class/${classId}`, null);
    console.log(res);
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
