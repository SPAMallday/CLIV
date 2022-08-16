import MyCalendar from '../../components/mycalendar/MyCalendar';
import ClassListItem from '../../components/class/list/ClassListItem';
import { Typography, Divider } from '@mui/material';

import Box from '@mui/material/Box';

import './MyClassHistory.css';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { getClosedClassHistory, getExClassHistory } from '../../api/classAPI';

const reserveType = {
  work: () => {},
  text: '클래스 입장',
};

const closeType = {
  work: () => {},
  text: '리뷰 보기',
};

function MyClassHistory() {
  const navigate = useNavigate();
  const nowTime = new Date();

  const [reserveData, setReserveData] = useState([]);
  const [closeData, setCloseData] = useState([]);
  const [reDateArr, setReDateArr] = useState([]);
  const [clDateArr, setClDateArr] = useState([]);

  useLayoutEffect(() => {
    async function getData() {
      // api 호출 결과값을 Data로 사용
      const resEx = await getExClassHistory();
      const resCl = await getClosedClassHistory();

      let tempEx = resEx.classList.slice();
      setReDateArr(
        tempEx.map((reserve, i) => {
          // 달력에 들어갈 날짜만 추려낸 배열을 만들면서 기존 JSON 데이터에 있는
          // 날짜 문자열을 Date형식으로 변환해서 저장해줌
          reserve.classDatetime = new Date(reserve.classDatetime);
          return reserve.classDatetime;
        }),
      );

      let tempCl = resCl.classList.slice();
      setReDateArr(
        tempCl.map((close, i) => {
          close.classDatetime = new Date(close.classDatetime);
          return close.classDatetime;
        }),
      );
      // Date형식으로 변환된 데이터를 state에 저장
      setReDateArr(tempEx.slice());
      setClDateArr(tempCl.slice());
    }
    getData();
  }, []);

  return (
    //1개로 통합
    <Box sx={{ mt: 3, pb: 3 }}>
      <Typography className="miniTitle">나의 수강 이력</Typography>
      <MyCalendar type="history" reDateArr={reDateArr} clDateArr={clDateArr} />
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
        return (
          <ClassListItem
            data={reserve}
            key={i}
            typeHandler={reserveType}
            rating={3}
          />
        );
      })}

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
        return (
          <ClassListItem
            data={close}
            key={i}
            typeHandler={closeType}
            rating={3}
          />
        );
      })}
    </Box>
  );
}

export default MyClassHistory;
