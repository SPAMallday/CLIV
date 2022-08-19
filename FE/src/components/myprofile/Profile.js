import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Stack, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { cateList } from '../../api/matchingAPI';
import { changeAuth } from '../../api/userAPI';

import MarkPath from '../../assets/Teacher_mark.png';
import './Profile.css';

function Profile() {
  // TODO 카카오에서 사진 받아올 수 있게 세팅변경 필요
  // TODO 닉네임을 redux store에서 가져올지 바로 받을지

  const role = useSelector((state) => state.userInfo.user.role);

  let inputOptions = {};

  useEffect(() => {
    cateList().then((res) => {
      res.map((item, i) => {
        inputOptions[item.id] = item.content;
      });
    });
  }, []);

  const changeAuthHandler = (event) => {
    const { id: category } = Swal.fire({
      width: 'fit-content',
      text: '선생님이 되고 싶은 분야를 선택해주세요', // Alert 제목
      icon: 'question', // Alert 타입
      input: 'radio',
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '신청',
      confirmButtonColor: '#FF7E67',
      showLoaderOnConfirm: true,
      inputOptions: inputOptions,
      inputValidator: (id) => {
        if (!id) {
          return '하나의 분야를 선택해주세요!';
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(() => {
      changeAuth().then((res) => {
        console.log(res);
      });
    });
  };
  return (
    <Box sx={{ my: 2 }}>
      <Grid container sx={{ px: 1 }}>
        <Grid item sx={{ width: '120px', height: 'inherit' }}>
          <Paper sx={{ borderRadius: '15px', height: '120px' }}>
            프로필 사진
          </Paper>
        </Grid>
        <Grid item sx={{ width: '75%' }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
            }}
          >
            <Stack spacing={1}>
              <Typography fontWeight={700}>
                선생님 닉네임{' '}
                <img
                  alt="teacher_mark"
                  src={MarkPath}
                  style={{ height: '1.2rem' }}
                />
              </Typography>
              {role === 'TEACHER' ? null : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={changeAuthHandler}
                  sx={{ borderRadius: '20px' }}
                >
                  선생님 전환
                </Button>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
