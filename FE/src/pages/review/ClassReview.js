import {
  Box,
  Button,
  Paper,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import ReviewButton from '../../components/review/ReviewButton';
import StarRating from '../../components/starrating/StarRating';

function ClassReview() {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Typography className="miniTitle" sx={{ mt: 5 }}>
        리뷰 작성
      </Typography>
      <Typography className="miniTitle" sx={{ mt: 5 }}>
        [가죽 공예] 가죽으로 DB 만들기 - 가죽으로 못 만드는 게 없어요!
      </Typography>
      <Typography className="miniTitle" sx={{ mt: 5 }}>
        강의자 : 서윗찬국
      </Typography>
      <Paper
        sx={{
          display: 'flex',
          mt: 5,
          width: '200px',
          padding: 1,
          justifyContent: 'center',
        }}
      >
        <Typography
          fontWeight={700}
          sx={{ width: '2.5rem', marginRight: '3px' }}
        >
          별점 :
        </Typography>
        <Rating
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Paper>

      <ReviewButton />

      <Typography className="miniTitle" sx={{ mt: 5 }}>
        상세 리뷰 작성하기 (선택)
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            p: 2,
            width: '100%',
            minWidth: '1200px',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField multiline rows={15} color="secondary" />
        </div>
      </Box>
      <Box sx={{ textAlign: 'center', my: 3 }}>
        <Button variant="contained" color="secondary" sx={{ mx: 1 }}>
          수정
        </Button>
        <Button variant="outlined" color="error" sx={{ mx: 1 }}>
          삭제
        </Button>
      </Box>
    </>
  );
}

export default ClassReview;
