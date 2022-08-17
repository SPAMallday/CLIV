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
        reviewName: '수업이 재밌어요!',
      },
      {
        reviewValue: 3,
        reviewName: '수업이 알찼어요!',
      },
      {
        reviewValue: 4,
        reviewName: '따라하기 쉬워요!',
      },
    ],
  },
  {
    reviewTitle: '',
    selectReview: [
      {
        reviewValue: 5,
        reviewName: '강사님이 친절해요!',
      },
      {
        reviewValue: 6,
        reviewName: '소통이 잘돼요!',
      },
      {
        reviewValue: 7,
        reviewName: '수업 준비가 철저해요!',
      },
      {
        reviewValue: 8,
        reviewName: '강사님이 전문적이에요!',
      },
    ],
  },
  {
    reviewTitle: '',
    selectReview: [
      {
        reviewValue: 9,
        reviewName: '강사님이 불친절해요',
      },
      {
        reviewValue: 10,
        reviewName: '따라하기 어려워요',
      },
      {
        reviewValue: 11,
        reviewName: '진도가 빨라요',
      },
      {
        reviewValue: 12,
        reviewName: '소통이 잘 안돼요',
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
  console.log(formats);
  return (
    <>
      <Box sx={{ mt: 5, minWidth: '1200px' }}>
        {selectReviewList &&
          selectReviewList.map((reviewselect, i) => (
            <Box sx={{ display: 'flex', mt: 3 }}>
              {/* <Box sx={{ flex: '10%' }}>
              <Grid container sx={{ justifyContent: 'center' }}></Grid>
            </Box> */}
              <Box sx={{ flex: '80%', paddingInline: '14px' }}>
                <Grid container>
                  {reviewselect.selectReview &&
                    reviewselect.selectReview.map((reviewbtn, i) => (
                      <ToggleButtonGroup
                        value={formats}
                        onChange={handleFormat}
                        sx={{
                          width: '25%',
                        }}
                        color="secondary"
                      >
                        <ToggleButton
                          key={i}
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
