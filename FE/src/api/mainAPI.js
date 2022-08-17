import { apiClient } from '.';

// 메인 클래스 목록
export const mainList = async () => {
  try {
    const res = await apiClient.get(`/api/main/list`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};
