import {
  Box,
  Button,
  Paper,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ReviewButton from '../../components/review/ReviewButton';
import { applyReview } from '../../api/reviewAPI.js';
import { useSelector } from 'react-redux';

function ClassReview() {
  const userId = useSelector((state) => state.userInfo.user.id);
  const [score, setScore] = useState(0);
  const [textRv, setValue] = useState('');
  const [prList, setPrList] = useState([]);

  const handleScoreChange = (event) => {
    // event.preventDefault();
    setScore(event.target.value);
  };

  const handletextRvChange = (event) => {
    // event.preventDefault();
    setValue(event.target.value.tostr);
  };

  const saveHandler = (event) => {
    // event.preventDefault();
    const data = {
      authId: userId,
      score: score,
      textRv: textRv,
      classId: 1,
      prList: prList,
    };
    console.log(data);
    console.log(userId);
    applyReview(data).then((res) => {
      console.log(res);
    });
  };
  console.log(prList);
  const getprList = (pList) => {
    setPrList(prList);
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
        <Rating value={score} precision={1} onChange={handleScoreChange} />
      </Paper>

      <Typography className="miniTitle" sx={{ mt: 5 }}>
        수업은 어땠나요?
      </Typography>

      <ReviewButton getprList={getprList} />

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
          <TextField
            multiline
            rows={10}
            color="secondary"
            onChange={handletextRvChange}
          />
        </div>
      </Box>
      <Box sx={{ textAlign: 'center', my: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mx: 1 }}
          onClick={saveHandler}
        >
          완료
        </Button>
        {/* <Button variant="outlined" color="error" sx={{ mx: 1 }}>
          삭제
        </Button> */}
      </Box>
    </>
  );
}

export default ClassReview;
