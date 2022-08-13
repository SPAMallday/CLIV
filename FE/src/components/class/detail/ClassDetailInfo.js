import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import StarRating from '../../starrating/StarRating';

import './ClassDetailInfo.css';

const handleSubmitButton = (teacherAuth) => {
  // 선생님인 경우
  if (teacherAuth === 'TEACHER') {
    // ('MEMBER') {
    // 클래스 정보 수정
  }
  // 학생인 경우
  else {
    // 수강신청
  }
};

function ClassDetailInfo({ value }) {
  const [rating, setRating] = useState(3);
  const teacherAuth = useSelector((state) => state.userInfo.user.role);
  // useEffect(() => {
  //   setRating(value.level);
  //   console.log('rating  ' + rating);
  // }, []);

  return (
    <Box>
      <Card>
        <CardContent>
          <Box>
            <Typography>{value.categoryId || ''}</Typography>
            {/* 이거 백에 수정요청해야됨 */}
          </Box>

          <Typography sx={{ fontWeight: '800', fontSize: '1.4rem' }}>
            {value.className || ''}
          </Typography>
          <Typography
            sx={{
              fontWeight: '800',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            강의자 : {value.teacherId || ''}
            {/* 이것도.. 백에 수정요청해야됨 */}
          </Typography>
          <Typography
            sx={{
              fontWeight: '800',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            수강료 : {(value.price || 0).toLocaleString()}
            {/* defaultprops 가 왜 안되는걸까.,,.,.ㅇ,.,.,., */}
          </Typography>
          <Card sx={{ my: 5 }}>
            <CardContent sx={{ pb: 1 }}>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex' }}>
                  난이도 :
                  <StarRating ratingValue={value.level || 0} />
                </Box>
                <Typography>
                  수강 인원({(value.member || []).length} /{' '}
                  {value.headcount || 0}){/* member.length 하면 에러남  */}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              color="secondary"
              variant="contained"
              component="label"
              size="large"
              onClick={handleSubmitButton(teacherAuth)}
              sx={{ width: '50%', height: '3rem', borderRadius: '1.5rem' }}
            >
              <Typography fontWeight={700}>
                {teacherAuth ? '클래스 정보 수정' : '수강신청'}
              </Typography>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

ClassDetailInfo.defaultProps = {
  value: {
    categoryId: 0,
    classDatetime: '',
    classId: 0,
    classImg: '',
    className: '',
    classStatus: '',
    content: '',
    headcount: 0,
    level: 0,
    members: [],
    price: 111,
    regdate: '',
    teacherId: '',
  },
};

export default ClassDetailInfo;
