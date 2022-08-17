import { apiClient } from '.';

// 리뷰등록
export const applyReview = async (data) => {
  try {
    console.log('api >> ' + JSON.stringify(data));
    const res = await apiClient.post(`/api/review`, data);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 자기가 쓴 리뷰 조회
export const myReview = async (userId) => {
  try {
    const res = await apiClient.get(`/api/review/list/${userId}`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 자기가 쓴 리뷰 조회
export const teacherReview = async (userId) => {
  try {
    const res = await apiClient.get(`/api/review/list/teacher/${userId}`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};
