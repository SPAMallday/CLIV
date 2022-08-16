import { apiClient } from '.';

// 카테고리 요청
export const cateList = async () => {
  try {
    const res = await apiClient.get(`/api/matching/category`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 매칭 요청서 생성
export const matchingCreate = async () => {
  try {
    const res = await apiClient.post('/api/matching');
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 내가 이전에 요청한 매칭
export const myPreReq = async (userId) => {
  try {
    const res = await apiClient.get(`/api/matching/board/list/${userId}`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 받은 요청 목록 (선생님)
export const recReq = async (userId) => {
  try {
    const res = await apiClient.get(`/api/matching/tboard/list/${userId}`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};
