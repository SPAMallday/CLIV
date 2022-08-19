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
  // 항목별 이름은 임시로 지정함
  // const reviewDatas = [
  //   {
  //     rating: 4.5,
  //     teacher: '서윗찬국',
  //     category: '가죽 공예',
  //     title: '가죽으로 DB만들기 - 가죽으로 못 만드는게 없어요!',
  //     selectReview: [
  //       '수업 설명이 자세해요!',
  //       '강사님이 친절해요!',
  //       '수업이 이해하기 쉬웠어요!',
  //       '강사님이 잘생겼어요!',
  //     ],
  //     content:
  //       '가죽으로 DB 만들기 너무 어려웠어요! 수업이 이해하기 쉬웠지만 원래 어려운 과정이라 하기 힘들었어요! 다음에는 더 쉬운 강의 들을 거에요!!!',
  //   },
  // ];

  return (
    <Grid item>
      {props.value.map((review) => (
        <Paper
          key={review.id}
          sx={{
            p: 2,
            display: 'flex',
            borderRadius: '15px',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: '75%' }}>
            <Stack spacing={1}>
              <Grid container columnSpacing={1}>
                <Grid item xs={4}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography fontWeight={700} sx={{ width: '2.7rem' }}>
                      별점 :
                    </Typography>
                    <StarRating ratingValue={review.score} type="review" />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography>강의자 : {review.nickname}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sx={{ mr: 1 }}>
                  <Typography>[{review.category}]</Typography>
                </Grid>
                <Grid>
                  <Typography>{review.className}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                {review.prList &&
                  review.prList.map((item) => (
                    <Grid item key={item.id} xs={6} md={3}>
                      <Paper className="reviewpaper" sx={{ p: 0.5 }}>
                        <Typography>{item.content}</Typography>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
              <Grid>
                <Typography>{review.textRv}</Typography>
              </Grid>
            </Stack>
          </Box>
          <Box sx={{ flex: '25%', textAlign: 'center' }}>
            <Button variant="contained" color="secondary" sx={{ mx: 1, my: 1 }}>
              수정
            </Button>
            <Button variant="outlined" color="error" sx={{ mx: 1, my: 1 }}>
              삭제
            </Button>
          </Box>
        </Paper>
      ))}
    </Grid>
  );
}

export default MyReview;
