import MyCalendar from '../../components/mycalendar/MyCalendar';
import ClassListItem from '../../components/class/list/ClassListItem';
import { Typography, Divider } from '@mui/material';

import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import {
  getClosedClassHistory,
  getExClassHistory,
  getToken,
} from '../../api/classAPI';

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
      console.log(resEx);
      console.log(resCl);

      if (resEx.classList.length > 0) {
        let tempEx = resEx.classList.slice();
        setReDateArr(
          tempEx.map((reserve, i) => {
            // 달력에 들어갈 날짜만 추려낸 배열을 만들면서 기존 JSON 데이터에 있는
            // 날짜 문자열을 Date형식으로 변환해서 저장해줌
            reserve.classDatetime = new Date(reserve.classDatetime);
            return reserve.classDatetime;
          }),
        );

        // Date형식으로 변환된 데이터를 state에 저장
        setReserveData(tempEx.slice());
      }

      if (resCl.classList.length > 0) {
        let tempCl = resCl.classList.slice();
        setClDateArr(
          tempCl.map((close, i) => {
            close.classDatetime = new Date(close.classDatetime);
            return close.classDatetime;
          }),
        );

        // Date형식으로 변환된 데이터를 state에 저장
        setCloseData(tempCl.slice());
      }
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
          // TODO 학생이니까 버튼 안 뜨게? 리뷰 보기?
          work: () => {},
          text: '',
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

export default MyClassHistory;
