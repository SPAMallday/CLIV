import MyCalendar from "../../components/mycalendar/MyCalendar";
import ClassListItem from "../../components/class/list/ClassListItem";
import { Typography, Divider } from "@mui/material";

import Box from "@mui/material/Box";

import "./MyClassHistory.css";

const reserveType = {
  work: () => {},
  text: "클래스 입장",
};

const closeType = {
  work: () => {},
  text: "리뷰 보기",
};

function MyClassHistory() {
  const reserveData = [{}, {}, {}];
  const closeData = [{}, {}, {}];

  return (
    //1개로 통합
    <Box sx={{ mt: 3, pb: 3 }}>
      <Typography className='miniTitle'>나의 수강 이력</Typography>
      <MyCalendar />
      <Typography className='miniTitle' sx={{ mt: 5 }}>
        예정 클래스
      </Typography>
      <Divider
        sx={{
          borderWidth: "1px",
          borderColor: "rgba(0, 0, 0, 0.3)",
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

      <Typography className='miniTitle' sx={{ mt: 5 }}>
        지난 클래스
      </Typography>
      <Divider
        sx={{
          borderWidth: "1px",
          borderColor: "rgba(0, 0, 0, 0.3)",
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
