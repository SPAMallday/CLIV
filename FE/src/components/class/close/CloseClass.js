import MyCalendar from '../../mycalendar/MyCalendar';
import ClassListItem from '../list/ClassListItem';
import { Typography, Divider } from '@mui/material';

import Box from '@mui/material/Box';
import { getClosedClass } from '../../../api/classAPI';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CloseClass() {
  const navigate = useNavigate();
  const nowTime = new Date();

  const [closeData, setCloseData] = useState([]);
  const [dateArr, setDateArr] = useState([]);

  useLayoutEffect(() => {
    async function getData() {
      // api 호출 결과값을 closeData로 사용
      const res = await getClosedClass();

      let temp = res.classList.slice();
      setDateArr(
        temp.map((close, i) => {
          // 달력에 들어갈 날짜만 추려낸 배열을 만들면서 기존 JSON 데이터에 있는
          // 날짜 문자열을 Date형식으로 변환해서 저장해줌
          close.classDatetime = new Date(close.classDatetime);
          return close.classDatetime;
        }),
      );
      // Date형식으로 변환된 데이터를 state에 저장
      setCloseData(temp.slice());
    }
    getData();
  }, []);

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
          // TODO 클래스 정보 복사 함수 만들기
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
