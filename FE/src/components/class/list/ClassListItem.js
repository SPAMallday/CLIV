import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Stack, Typography, Paper } from '@mui/material';
import StarRating from '../../starrating/StarRating';

import './ClassListItem.css';

// 지난클래스면 항상 ok
// 예정클래스면 필터필요

function ClassListItem(props) {
  let timeCheck = false;
  const year = props.data.classDatetime.getFullYear();
  const month = props.data.classDatetime.getMonth() + 1;
  const date = props.data.classDatetime.getDate();
  const hour = props.data.classDatetime.getHours();
  const min = props.data.classDatetime.getMinutes();

  if (
    props.typeHandler.type === 'reserve' &&
    year === props.nowTime.getFullYear() &&
    month === props.nowTime.getMonth() + 1 &&
    date === props.nowTime.getDate()
    // 테스트용으로 일부러 < 로 맞춤
    // date < props.nowTime.getDate())
  ) {
    timeCheck = true;
  }

  const imgStyle = {
    width: '100%',
    borderRadius: '15px',
    height: '152px',
  };

  return (
    <Box sx={{ my: 2 }}>
      <Grid container columnSpacing={3} sx={{ px: 1 }}>
        <Grid item sx={{ width: '25%', height: 'inherit' }}>
          <Paper sx={{ borderRadius: '15px', height: '152px' }}>
            <img
              src={props.data.classImg}
              alt="classThumbnail"
              style={imgStyle}
            />
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
                  [{props.data.category}] {props.data.className}
                </Typography>
                <Typography>
                  일정 : {`${year}.${month}.${date} ${hour}시 ${min}분`}
                </Typography>
                <Typography>강의자 : {props.data.teacherNickname}</Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography>난이도 : </Typography>
                  <StarRating ratingValue={props.data.level} />
                </Box>
              </Stack>
            </Box>
            {timeCheck ? (
              <Box sx={{ flex: '25%', textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={props.typeHandler.work}
                >
                  {props.typeHandler.text}
                </Button>
              </Box>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ClassListItem;
