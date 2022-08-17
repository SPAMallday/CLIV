import axios from 'axios';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './config';

export const apiClient = axios.create({
  baseURL: BASE_URL, // 환경변수로 지정한 BASE_URL을 사용
  // headers: {
  //   Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
  // },
});

const Interceptor = ({ children }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.userInfo.user.token);
  console.log('Interceptor');

  // useEffect를 쓰면 intial rendering 때도 동작이 되기 때문에
  // token 값이 업데이트되고 난 이후에 적용하려면 useLayoutEffect를 사용
  useLayoutEffect(() => {
    const interceptor = apiClient.interceptors.request.use(
      (config) => {
        console.log('Interceptor - useEffect : ' + token);
        if (!config.headers.Authorization) {
          if (token && token.length > 0) {
            config.headers.Authorization = 'Bearer ' + token; // 왜..............안될까 계속 안되면useEffect 안쓰는 방법으로 해야겠음..,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
          }
        }
        return config;
      },
      (error) => {
        console.log('error');
        navigate('/');
        return Promise.reject(error);
      },
    );
  }, [token]);
  // .... 언제마다 동작할지 지정하지 않고 []로 뒀기 때문에 처음 한 번만 수행하고
  // 정작 token값이 세팅되고 나서는 동작하지 않음!!

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
