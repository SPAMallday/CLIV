import React, { useEffect } from 'react';
import { REST_API_KEY, REDIRECT_URI } from './KaKaoLoginInfo';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function KaKaoLogin() {
    const location = useLocation();
    const navagate = useNavigate();
    const AUTHORIZE_CODE = location.search.split('=')[1];

    const getKaKaoToken = () => {
        fetch(`https://kauth.kakao.com/oauth/token`, {
            method: 'POST',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
        })
        .then(res  => res.json())
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
            } else {
                navagate('/');
            }
        });
    };
    
    useEffect(() => {
        if (!location.search) return <div>err</div>;
        getKaKaoToken();
    }, []);
    
    return (
        <div> </div>
    );
};

export default KaKaoLogin;