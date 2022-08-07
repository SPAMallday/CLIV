import StarRating from '../starrating/StarRating';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import './MyReview.css';
import React from 'react';

function MyReview(props) {
  return (
    <Grid item>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          borderRadius: '15px',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: '75%' }}>
          <Stack spacing={1}>
            <Grid container>
              <Grid item xs={3}>
                <Box sx={{ display: 'flex' }}>
                  <Typography fontWeight={700}>별점 : </Typography>
                  <StarRating ratingValue={3} />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Typography>강의자 : 서윗찬국</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography>카테고리 : 가죽공예</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>
                  강의명 : 가죽으로 DB만들기 - 가죽으로 못 만드는게 없어요!
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Paper className="reviewpaper">
                  <Typography>수업 설명이 자세해요!</Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className="reviewpaper">
                  <Typography>강사님이 친절해요!</Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className="reviewpaper">
                  <Typography>수업이 이해하기 쉬웠어요!</Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className="reviewpaper">
                  <Typography>강사님이 잘생겼어요!</Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Typography>
                  가죽으로 DB 만들기 너무 어려웠어요! 수업이 이해하기 쉬웠지만
                  원래 어려운 과정이라 하기 힘들었어요! 다음에는 더 쉬운 강의
                  들을 거에요!!!
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Box>
        <Box sx={{ flex: '25%', textAlign: 'center' }}>
          <Button variant="contained" color="secondary" sx={{ mx: 1 }}>
            수정
          </Button>
          <Button variant="outlined" color="error" sx={{ mx: 1 }}>
            삭제
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default MyReview;
