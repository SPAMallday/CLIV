import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Stack, Typography, Paper } from '@mui/material';
import StarRating from '../../starrating/StarRating';

import './ClassListItem.css';

// 선생님이 클래스 입장 (내 클래스)
// 선생님이 클래스 입장 (다른 사람 클래스)
// 학생이 클래스 입장
// 리뷰 쓰기
// 리뷰 보기
// 선생님이 클래스 입장

function ClassListItem(props) {
  return (
    <Box sx={{ my: 2 }}>
      <Grid container columnSpacing={3} sx={{ px: 1 }}>
        <Grid item sx={{ width: '25%', height: 'inherit' }}>
          <Paper sx={{ borderRadius: '15px', height: '152px' }}>
            클래스 대표 사진
          </Paper>
        </Grid>
        <Grid item sx={{ width: '75%' }}>
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
                <Typography fontWeight={700}>
                  가죽으로 DB 만들기 - 가죽으로 못 만드는게 없어요
                </Typography>
                <Typography>일정</Typography>
                <Typography>강의자</Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography>난이도 : </Typography>
                  <StarRating ratingValue={props.rating} type="class" />
                </Box>
              </Stack>
            </Box>
            <Box sx={{ flex: '25%', textAlign: 'center' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={props.typeHandler.work}
              >
                {props.typeHandler.text}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ClassListItem;
