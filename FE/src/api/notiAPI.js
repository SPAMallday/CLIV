import { apiClient } from '.';

// 알림 전체 조회
export const getAllNoti = async () => {
  try {
    const res = await apiClient.get(`/api/noti`);
    return res;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 선택 알림 확인처리
export const setNotiRead = async (notificationId) => {
  try {
    const res = await apiClient.post(`/api/noti/${notificationId}`);
    return res.status;
  } catch (err) {
    console.log('Error >>', err);
  }
};
