import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import StarRating from '../../starrating/StarRating';
import { registClass } from '../../../api/classAPI';
import Swal from 'sweetalert2';

import './ClassDetailInfo.css';
import { useLocation, useParams } from 'react-router-dom';

function ClassDetailInfo({ value, setCDetail }) {
  // const location = useLocation(); // 추가된 부분
  // const classId = location.state?.classId; // 추가된 부분
  const params = useParams();
  const classId = params.classId;

  const teacherAuth = useSelector((state) => state.userInfo.user.role);
  // useEffect(() => {
  //   setRating(value.level);
  //   console.log('rating  ' + rating);
  // }, []);

  // 이거 이렇게 쓰면 위에 선언한 teacherAuth로 매핑이 안될텐데 아마도??
  const handleSubmitButton = (teacherAuth) => {
    // 선생님인 경우
    // if (teacherAuth === 'TEACHER') {
    // 클래스 정보 수정
    // 이게 본인이 생성한 수업일때만 수정이 떠야될거같은데
    // 작성자 아이디랑 로그인 아이디 비교하는 방식으로? 해야될거같음 (HJ)
    // }
    // 학생인 경우
    // else if (teacherAuth === 'MEMBER') {
    // 수강신청

    // 다 구현함
    // 수강신청이 중복으로 된다? 신청 이후에 반응이 없음
    // 수강인원이 갱신되거나 알림이 뜨거나해야할 듯
    // 일단은 수강신청에 성공하면 상세정보를 다시 불러와서 갱신시킴
    // 제일 베스트는 수강인원만 다시 가져오는게 좋음 (백엔드 API를 수정해서)
    registClass(classId).then((res) => {
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: 'success',
          title: '수강신청 성공!',
          text: '수업 시작 알림이 오면 나의 수강이력에서 입장해주세요',
        });

        setCDetail((prev) => ({ ...prev, memberCnt: res.data.memberCnt }));
      } else {
        Swal.fire({
          icon: 'success',
          title: '수강신청 실패...',
          text: '수강인원이 다 찼거나 서버와 연결이 원활하지 않을 수 있어요',
        });
      }
    });
    // }
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box>
            <Typography>{value.category || ''}</Typography>
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
            강의자 : {value.teacherNickname || ''}
          </Typography>
          <Typography
            sx={{
              fontWeight: '800',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            수강료 : {(value.price || 0).toLocaleString()} 원
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
                  수강 인원({value.memberCnt || 0} / {value.headcount || 0})
                  {/* value.member.length 하면 에러남  */}
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
              onClick={() => handleSubmitButton(teacherAuth)}
              sx={{ width: '50%', height: '3rem', borderRadius: '1.5rem' }}
            >
              <Typography fontWeight={700}>
                {teacherAuth === 'TEACHER' ? '클래스 정보 수정' : '수강신청'}
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
    memberCnt: 0,
    price: 0,
    regdate: '',
    teacherId: '',
  },
};

export default ClassDetailInfo;
