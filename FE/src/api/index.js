import axios from 'axios';
// import { store } from '../store/store';
import { BASE_URL } from './config';

export const apiClient = axios.create({
  baseURL: BASE_URL, // 환경변수로 지정한 BASE_URL을 사용
});

apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = useSelector((state) => state.userInfo.user.token);
      if (token && token.length > 0) {
        config.headers.Authorization = 'Bearer ' + token;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
