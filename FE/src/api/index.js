import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './config';

export const apiClient = axios.create({
  baseURL: BASE_URL, // 환경변수로 지정한 BASE_URL을 사용
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
  },
});

export const openViduApiClient = axios.create({
  baseURL:
    BASE_URL + ':' + process.env.REACT_APP_OPENVIDU_PORT + '/openvidu/api', // 환경변수로 지정한 BASE_URL을 사용
  headers: {
    // base64 Encode (OPENVIDU_SECRET)
    Authorization:
      'Basic ' + btoa(`OPENVIDUAPP:${process.env.REACT_APP_OPENVIDU_SECRET}`),
  },
});

const Interceptor = ({ children }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.userInfo.user.token);
  console.log('Interceptor');

  useEffect(() => {
    const interceptor = apiClient.interceptors.request.use(
      (config) => {
        console.log('request1');
        if (!config.headers.Authorization) {
          // useSelector((state) => state.userInfo.user.token);
          if (token && token.length > 0) {
            config.headers.Authorization = 'Bearer ' + token; // 왜..............안될까 계속 안되면useEffect 안쓰는 방법으로 해야겠음..,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
          }
        }
        console.log('request2');
        return config;
      },
      (error) => {
        console.log('error');
        navigate('/');
        return Promise.reject(error);
      },
    );
  }, []); // ....

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
