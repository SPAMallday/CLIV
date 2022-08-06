import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { REST_API_KEY, REDIRECT_URI } from './KaKaoLoginInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUser } from '../../store/modules/loginUser';

function KaKaoLogin() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const AUTHORIZE_CODE = location.search.split('=')[1]; // 인가코드

  useEffect(() => {
    if (!location.search) return <div>err</div>;
    try {
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
          null,
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        )
        .then((res) => {
          if ((res.status = '200')) {
            const access_token = res.data.access_token;

            sessionStorage.setItem('token', access_token);
            sessionStorage.setItem('code', AUTHORIZE_CODE);

            dispatch(loginUser(access_token));
            // dispatch(loginUser());
          } else {
            console.log('로그인 ERR');
          }
        });
    } catch (err) {
      console.log(err);
    }

    navigate('/', { replace: true });
  }, [dispatch]);

  return <div></div>;
}

export default KaKaoLogin;
