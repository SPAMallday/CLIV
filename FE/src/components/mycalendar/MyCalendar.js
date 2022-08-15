import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';
import { Box, Stack, Typography } from '@mui/material';

function MyCalendar(props) {
  const type = props.type;

  const [value, onChange] = useState(new Date());

  // const [mark, setMark] = useState([]);
  // state로 관리하지 않고 단순히 단 1번만 렌더링에 필요하기 때문에 변수로 관리
  // state로 관리하면서 모든 값을 복사해서 집어넣으면 그 때마다
  // re-rendering이 되기 때문에 무한루프 또는 너무 많은 렌더링이라고 react에서 거부함
  // const [reserveMark, setReserveMark] = useState([]);
  // const [closeMark, setCloseMark] = useState([]);
  let reserveMark = [];
  let closeMark = [];

  if (type === 'reserve' || type === 'detail') {
    reserveMark = props.dateArr.map((date, i) => {
      return moment(date).format('YYYY-MM-DD');
    });
  } else if (type === 'close') {
    closeMark = props.dateArr.map((date, i) => {
      return moment(date).format('YYYY-MM-DD');
    });
  } else {
  }

  // const { data } = useQuery(
  //   ['logDate', month],
  //   async () => {
  //     const result = await axios.get(`/api/healthLogs?health_log_type=DIET`);
  //     return result.data;
  //   },
  //   {
  //     onSuccess: (data: any) => {
  //       setMark(data);
  //       // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
  //     },
  //   }
  // );

  return (
    <Box
      className="calendarContainer"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
    >
      {props.type === 'detail' ? null : (
        <Stack sx={{ ml: 1, visibility: 'hidden' }}>
          <Box className="legendIcon" sx={{ display: 'flex' }}>
            <Box className="circle-dot " sx={{ px: 1, py: 1, mr: 1 }} />
            <Typography>신청 클래스</Typography>
          </Box>
          <Box className="legendIcon" sx={{ display: 'flex' }}>
            <Box className="square-dot" sx={{ px: 1, py: 1, mr: 1 }} />
            <Typography>지난 클래스</Typography>
          </Box>
        </Stack>
      )}
      <Calendar
        onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
        value={value}
        formatDay={(locale, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
        minDetail="year" // 상단 네비게이션에서 '년' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        navigationLabel={null}
        tileContent={({ date, view }) => {
          // 날짜 타일에 컨텐츠 추가하기 (html 태그)
          // 추가할 html 태그를 변수 초기화
          let html = [];

          if (type === 'reserve' || type === 'detail') {
            // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
            if (
              reserveMark.find((x) => x === moment(date).format('YYYY-MM-DD'))
            ) {
              html.push(<div className="circle-dot"></div>);
            }
          } else if (type === 'close') {
            // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
            if (
              closeMark.find((x) => x === moment(date).format('YYYY-MM-DD'))
            ) {
              html.push(<div className="square-dot"></div>);
            }
          } else {
            // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
            // if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            // }
            // if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            // }
          }

          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
            <>
              <div className="flex justify-center items-center absoluteDiv">
                {html}
              </div>
            </>
          );
        }}
      />
      {props.type === 'detail' ? null : (
        <Stack sx={{ ml: 1 }}>
          <Box className="legendIcon" sx={{ display: 'flex' }}>
            <Box className="circle-dot " sx={{ px: 1, py: 1, mr: 1 }} />
            <Typography>신청 클래스</Typography>
          </Box>
          <Box className="legendIcon" sx={{ display: 'flex' }}>
            <Box className="square-dot" sx={{ px: 1, py: 1, mr: 1 }} />
            <Typography>지난 클래스</Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
}

export default MyCalendar;
