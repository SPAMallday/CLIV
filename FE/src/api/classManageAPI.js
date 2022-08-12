import { apiClient } from '.';

const user = useSelector((state) => state.userInfo.user);
console.log(user);

// 예정 클래스
export const reserveClassAPI = async () => {
  try {
    // const res = await apiClient.post(`/api/class/create`);
    // return res.json();
  } catch (err) {
    console.log('Error >>', err);
  }
};

// 지난 클래스
export const closeClassAPI = async () => {
  try {
    // const res = await apiClient.get(`/api/class`);
    // return res.json();
  } catch (err) {
    console.log('Error >>', err);
  }
};

// Q&A
export const qnaAPI = async (classId) => {
  try {
    // const res = await apiClient.get(`/api/class/${classId}`);
    // return res.json();
  } catch (err) {
    console.log('Error >>', err);
  }
};
