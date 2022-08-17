import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Stack, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';

import './Profile.css';

function Profile() {
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
              <Typography fontWeight={700}>선생님 닉네임</Typography>
              <Typography>평균 평점 :</Typography>
              <Typography>총 개설한 강의 수 :</Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
