import MyCalendar from "../../mycalendar/MyCalendar";
import ClassListItem from "../list/ClassListItem";
import { Typography, Divider } from "@mui/material";

import Box from "@mui/material/Box";

const closeType = {
  work: () => {},
  text: "클래스 정보 복사",
};

function CloseClass() {
  const closeData = [{}, {}, {}];

  return (
    //1개로 통합
    <Box sx={{ mt: 3, pb: 3 }}>
      <MyCalendar />
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

export default CloseClass;
