import React from 'react';
import styled from "styled-components";
import { KAKAO_AUTH_URL } from './KaKaoLoginInfo';
import { createTheme, Button } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';      // styled-components 를 이용하기 위함.

const StyledKaKaoBtn = styled(Button) `
    background-image: url(images/kakao_login_large_wide.png);
    background-repeat: no-repeat;
    background-size : cover;
    margin: 10px auto;
    /* padding: -10px; */
    // color: transparent;
    width: 480px;
    height: 72px;
`;

// # css
// .kakao_btn{
//     background-image: url("/src/images/kakao_login_medium_wide.png");
//     background-repeat: no-repeat;
//     background-size : cover;
//     margin: 10px auto;
//     /* padding: -10px; */
//     color: transparent;
//     width: 300px;
//     height: 45px;
// }


// const Login = () => {
function Login () {
    return (
        <div>
            <div>

            </div>
            <div>
                <a href={KAKAO_AUTH_URL}>
                <StyledEngineProvider injectFirst>
                    {/* <div 
                        className={StyledKaKaoBtn} 
                        >
                    </div> */}
                    <StyledKaKaoBtn></StyledKaKaoBtn>
                </StyledEngineProvider>
                </a>
            </div>
        </div>
    );
};
  
export default Login;