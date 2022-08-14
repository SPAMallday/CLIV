import MyCalendar from '../../mycalendar/MyCalendar';
import ClassListItem from '../list/ClassListItem';

import { Typography, Divider, CircularProgress, Backdrop } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { getToken } from '../../../api/classAPI';
import { useNavigate } from 'react-router-dom';

function ReserveClass() {
  let navigate = useNavigate();
  const nowTime = new Date();
  // api 호출 결과값을 reserveData로 사용
  const reserveData = [
    {
      classId: 3,
      teacherNickname: '선생님이야',
      members: [],
      category: '가죽 공예',
      className: '나만을 위한 가죽공예',
      price: 18000,
      headcount: 4,
      classDatetime: '2022-08-12T14:03:36.000+00:00',
      content: '<h1>가죽공예</h1><p>만들어 보세요</p>',
      classImg:
        'https://craftclassbucket.s3.ap-northeast-2.amazonaws.com/efcf678377854851a2b32def2d587e60.jpg',
      classStatus: 'LIVE',
      level: 3,
      regdate: '2022-08-14T06:57:47.000+00:00',
    },
    {
      classId: 5,
      teacherNickname: '선생님이야',
      members: [],
      category: '가죽 공예',
      className: '스릴있는 가죽공예',
      price: 18000,
      headcount: 4,
      classDatetime: '2022-08-18T14:03:36.000+00:00',
      content: '<h1>가죽공예</h1><p>만들어 보세요</p>',
      classImg:
        'https://craftclassbucket.s3.ap-northeast-2.amazonaws.com/efcf678377854851a2b32def2d587e60.jpg',
      classStatus: 'EXPECTED',
      level: 1,
      regdate: '2022-08-14T06:57:47.000+00:00',
    },
  ];
  const dateArr = reserveData.map((reserve, i) => {
    // 달력에 들어갈 날짜만 추려낸 배열을 만들면서 기존 JSON 데이터에 있는
    // 날짜 문자열을 Date형식으로 변환해서 저장해줌
    reserve.classDatetime = new Date(reserve.classDatetime);
    return reserve.classDatetime;
  });

  return (
    <>
      <Box sx={{ mt: 3, pb: 3 }}>
        <MyCalendar dateArr={dateArr} type={'reserve'} />
        <Typography className="miniTitle" sx={{ mt: 5 }}>
          예정 클래스
        </Typography>
        <Divider
          sx={{
            borderWidth: '1px',
            borderColor: 'rgba(0, 0, 0, 0.3)',
            my: 1,
          }}
        />
        {reserveData.map((reserve, i) => {
          const fun = async () => {
            const token = await getToken(reserve.classId);
            if (!!token) {
              navigate(`/video/${reserve.classId}`, {
                state: { token: token },
              });
            } else {
              alert('수업 입장에 실패했습니다.');
            }
          };

          const typeHandler = {
            type: 'reserve',
            work: fun,
            text: '클래스 입장',
          };

          return (
            <ClassListItem
              data={reserve}
              key={i}
              typeHandler={typeHandler}
              nowTime={nowTime}
            />
          );
        })}
      </Box>
      // 수정 필요
      <Backdrop
      // sx={{ color: '#fff', zIndex: 2 }}
      // open={loading}
      // onClick={() => {
      //   handleCloseFail();
      // }}
      >
        <Box sx={{ display: 'flex' }}>
          <CircularProgress
            color="warning"
            sx={{ position: 'absolute', left: '50%', top: '50%' }}
          />
        </Box>
      </Backdrop>
    </>
  );
}

export default ReserveClass;
