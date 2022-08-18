import { apiClient } from '.';

// 1대1 클래스 생성
export const privateCreate = async (data) => {
  try {
    console.log('api >> ' + JSON.stringify(data));
    const res = await apiClient.post(`/api/privateclass`, data);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};
