import MyCalendar from '../../mycalendar/MyCalendar';
import ClassListItem from '../list/ClassListItem';
import { Typography, Divider } from '@mui/material';

import Box from '@mui/material/Box';

function CloseClass() {
  const nowTime = new Date();
  // api 호출의 결과값을 data로 사용
  const closeData = [
    {
      classId: 1,
      teacherNickname: '선생님이야',
      members: [],
      category: '가죽 공예',
      className: '재밌는 가죽공예',
      price: 18000,
      headcount: 4,
      classDatetime: '2022-08-10T14:03:36.000+00:00',
      content: '<h1>가죽공예</h1><p>만들어 보세요</p>',
      classImg:
        'https://craftclassbucket.s3.ap-northeast-2.amazonaws.com/efcf678377854851a2b32def2d587e60.jpg',
      classStatus: 'ENDED',
      level: 5,
      regdate: '2022-08-14T06:57:47.000+00:00',
    },
  ];

  const dateArr = closeData.map((close, i) => {
    // 달력에 들어갈 날짜만 추려낸 배열을 만들면서 기존 JSON 데이터에 있는
    // 날짜 문자열을 Date형식으로 변환해서 저장해줌
    close.classDatetime = new Date(close.classDatetime);
    return close.classDatetime;
  });

  return (
    //1개로 통합
    <Box sx={{ mt: 3, pb: 3 }}>
      <MyCalendar dateArr={dateArr} type="close" />
      <Typography className="miniTitle" sx={{ mt: 5 }}>
        지난 클래스
      </Typography>
      <Divider
        sx={{
          borderWidth: '1px',
          borderColor: 'rgba(0, 0, 0, 0.3)',
          my: 1,
        }}
      />
      {closeData.map((close, i) => {
        const typeHandler = {
          type: 'close',
          work: () => {},
          text: '클래스 정보 복사',
        };

        return (
          <ClassListItem
            data={close}
            key={i}
            typeHandler={typeHandler}
            nowTime={nowTime}
          />
        );
      })}
    </Box>
  );
}

export default CloseClass;
