import React, { useState, useEffect } from 'react';
import ClassDetailInfo from '../../components/class/detail/ClassDetailInfo';
import ClassDetailItem from '../../components/class/detail/ClassDetailItem';
import QnaItem from '../../components/qna/QnaItem';
import MyCalendar from '../../components/mycalendar/MyCalendar';
import Box from '@mui/material/Box';
import { Grid, Stack, Typography } from '@mui/material';
import { classDetail } from '../../api/classAPI';
import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

const ClassDetail = () => {
  // const location = useLocation(); // 추가된 부분
  // const classId = location.state?.classId; // 추가된 부분
  const params = useParams();
  const classId = params.classId;

  const [cDetail, setCDetail] = useState([]);

  useEffect(() => {
    classDetail(classId).then((res) => {
      setCDetail(res);
      console.log(res);
    });
  }, []);
  // const dispatch = useDispatch();
  // dispatch(classDetail(1));
  return (
    <Box sx={{ mt: 8, pb: 6 }}>
      <Grid container sx={{ width: '100%' }}>
        <Grid item xs={12} md sx={{ mr: { xs: 0, md: 4 }, mb: 4 }}>
          <Stack spacing={4}>
            <ClassDetailItem value={cDetail} />
            <Box>
              {/* Q&A 뺄거면 ... */}
              <Typography fontWeight={800} fontSize={'1.4rem'}>
                Q&A
              </Typography>
              <br />
              <QnaItem />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={4}>
            <ClassDetailInfo value={cDetail} setCDetail={setCDetail} />
            <Typography fontWeight={700} fontSize={'0.9rem'} textAlign="center">
              {'<클래스 일정>'}
            </Typography>
            <MyCalendar type="detail" dateArr={cDetail.classDatetime} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClassDetail;
