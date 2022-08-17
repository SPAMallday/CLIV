import { apiClient } from '.';

// 채팅방 생성
export const chatCreate = async () => {
  try {
    const res = await apiClient.post(`/api/chat/room`, null);
    console.log('res' + res);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// roomId로 특정 채팅방 조회
export const chatRoom = async (roomId) => {
  try {
    const res = await apiClient.get(`/api/chat/room/${roomId}`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};

// authId로 채팅방 목록 조회
export const chatRoomList = async (authId) => {
  try {
    const res = await apiClient.get(`/api/chat/rooms/${authId}`);
    return res.data;
  } catch (err) {
    console.log('Error >>', err);
  }
};
