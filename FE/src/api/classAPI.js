import { useSelector } from 'react-redux';
import { apiClient } from '.';

// const user = useSelector((state) => state.userInfo.user);
// console.log(user);

// 클래스 생성
export const classCreate = async () => {
  try {
    const res = await apiClient.post(`/api/class/create`);
    return res.json();
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 목록
export const classList = async () => {
  try {
    const res = await apiClient.get(`/api/class`);
    return res.json();
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 상세
export const classDetail = async (classId) => {
  try {
    const res = await apiClient.get(`/api/class/${classId}`);
    return res.json();
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 신청
export const registClass = async (classId) => {
  try {
    const res = await apiClient.post(`/api/class/${classId}`);
    return res.json();
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 신청내역
export const reserveClass = async (userId) => {
  try {
    // const res = await apiClient.get(`/api/class/re`);   //**** */
    // return res.json();
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 개최내역
export const holdClass = async (userId) => {
  try {
    // const res = await apiClient.get(`/api/class/${userId}`);
    // return res.json();
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 클래스 입장
export const getToken = async (classId) => {
  try {
    const res = await apiClient.post(`/api/class/session/${classId}`);
    return res.data.token;
  } catch (err) {
    console.log('Error >>', err);
  }
};