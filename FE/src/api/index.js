import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './config';

export const apiClient = axios.create({
  baseURL: BASE_URL, // 환경변수로 지정한 BASE_URL을 사용
});

const Interceptor = ({ children }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.userInfo.user.token);
  console.log('Interceptor');

  useEffect(() => {
    apiClient.interceptors.request.use(
      (config) => {
        console.log(config.headers.Authorization);
        if (!config.headers.Authorization) {
          // useSelector((state) => state.userInfo.user.token);
          if (token && token.length > 0) {
            config.headers.Authorization = 'Bearer ' + token;
          }
        }
        console.log('request');
        return config;
      },
      (error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.log('error');
        return Promise.reject(error);
      },
    );
  }, []);

  return children;
};

export { Interceptor };

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = useSelector((state) => state.userInfo.user.token);

//     if (!config.headers.Authorization) {
//       // useSelector((state) => state.userInfo.user.token);
//       // if (token && token.length > 0) {
//       //   config.headers.Authorization = 'Bearer ' + token;
//       // }
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   },
// );
