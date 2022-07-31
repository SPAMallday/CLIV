import React, { useEffect } from 'react';
import { REST_API_KEY, REDIRECT_URI } from './KaKaoLoginInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function KaKaoLogin() {
    const location = useLocation();
    const navigate = useNavigate();
    const AUTHORIZE_CODE = location.search.split('=')[1];   // 인가코드

    // const kakaoAuth = axios.create({
    //     baseURL:"https://kauth.kakao.com/oauth/token",
    //     headers: {
    //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     },
    //     params: {
            
    //         'grant_type'='authorization_code'
    //         '&'client_id=${REST_API_KEY}
    //         &redirect_uri=${REDIRECT_URI}
    //         &code=${AUTHORIZE_CODE}
    //     }
    // });
    useEffect(() => {
        if (!location.search) return <div>err</div>;
        try {
            axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`
                , null, {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
            }).then((res) => {
                if(res.status = '200')    {
                    console.log(res)
                    sessionStorage.setItem('token', res.data.access_token);
                    sessionStorage.setItem('code', AUTHORIZE_CODE);
                }
                else {
                    console.log("로그인 ERR");
                }
            })
        }catch(err) {
            console.log(err);
        }
        
        navigate("/", { replace: true });   // 
        // getKaKaoToken();
    }, []);
    
    return (
        <div> a</div>
    );
};

export default KaKaoLogin;