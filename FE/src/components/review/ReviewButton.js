import React, { useEffect } from 'react';

import {
  Box,
  Grid,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import './ReviewButton.css';

const selectReviewList = [
  {
    reviewTitle: '',
    selectReview: [
      {
        reviewValue: 1,
        reviewName: '수업 설명이 자세해요!',
      },
      {
        reviewValue: 2,
        reviewName: '강사님이 친절해요!',
      },
      {
        reviewValue: 3,
        reviewName: '수업이 이해하기 쉬웠어요!',
      },
      {
        reviewValue: 4,
        reviewName: '강사님이 잘생겼어요!',
      },
    ],
  },
  {
    reviewTitle: '',
    selectReview: [
      {
        reviewValue: 5,
        reviewName: '수업 설명이 자세해요!',
      },
      {
        reviewValue: 6,
        reviewName: '강사님이 친절해요!',
      },
      {
        reviewValue: 7,
        reviewName: '수업이 이해하기 쉬웠어요!',
      },
      {
        reviewValue: 8,
        reviewName: '강사님이 잘생겼어요!',
      },
    ],
  },
  {
    reviewTitle: '',
    selectReview: [
      {
        reviewValue: 9,
        reviewName: '수업 설명이 자세해요!',
      },
      {
        reviewValue: 10,
        reviewName: '강사님이 친절해요!',
      },
      {
        reviewValue: 11,
        reviewName: '수업이 이해하기 쉬웠어요!',
      },
      {
        reviewValue: 12,
        reviewName: '강사님이 잘생겼어요!',
      },
    ],
  },
];

function ReviewButton(props) {
  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const sendprList = () => {
    props.getprList(formats);
  };

  useEffect(() => {
    sendprList();
  }, [formats]);

  return (
    <>
      <Box sx={{ mt: 5, minWidth: '1200px' }}>
        {selectReviewList.map((reviewselect, i) => (
          <Box sx={{ display: 'flex', mt: 3 }}>
            {/* <Box sx={{ flex: '10%' }}>
              <Grid container sx={{ justifyContent: 'center' }}></Grid>
            </Box> */}
            <Box sx={{ flex: '80%', paddingInline: '14px' }}>
              <Grid container>
                {reviewselect.selectReview.map((reviewbtn, i) => (
                  <ToggleButtonGroup
                    value={formats}
                    onChange={handleFormat}
                    sx={{
                      width: '25%',
                    }}
                    color="secondary"
                  >
                    <ToggleButton
                      value={reviewbtn.reviewValue}
                      sx={{
                        width: '100%',
                        padding: '2%',
                        mx: '2%',
                        backgroundColor: 'white',
                        border: '0',
                        boxShadow: '1',
                      }}
                    >
                      {reviewbtn.reviewName}
                    </ToggleButton>
                  </ToggleButtonGroup>
                ))}
              </Grid>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default ReviewButton;
