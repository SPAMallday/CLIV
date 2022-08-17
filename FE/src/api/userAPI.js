import { apiClient } from '.';

// 메인 클래스 목록
export const changeAuth = async () => {
  try {
    const res = await apiClient.patch(`/api/user/change/role`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};
