import React from 'react';
// import styled from "styled-components";
import { KAKAO_AUTH_URL } from './KaKaoLoginInfo';
import { Button, Box, Container } from '@mui/material';
// import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledKaKaoBtn = styled(Button)`
  background-image: url(images/kakao_login_large_wide.png);
  background-repeat: no-repeat;
  background-size: cover;
  // color: transparent;
  width: 480px;
  height: 72px;
  justify-content: center;
  align-items: center;
`;

const loginImage = styled.img`
  height: 100vh;
  width: 100vw;
  // background-size : cover;
  // // color: transparent;
  // width: 480px;
  // height: 72px;
  // justify-content: center;
  // align-items: center;
`;

// const Login = () => {
function Login() {
  return (
    <div>
      <Container>
        <Box>
          <a href={KAKAO_AUTH_URL}>
            <StyledKaKaoBtn></StyledKaKaoBtn>
          </a>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
