import MyCalendar from '../../mycalendar/MyCalendar';
import ClassListItem from '../list/ClassListItem';
import { Typography, Divider } from '@mui/material';

import Box from '@mui/material/Box';

function ReserveClass() {
  const reserveData = [{}, {}, {}];

  return (
    //1개로 통합
    <Box sx={{ mt: 3, pb: 3 }}>
      <MyCalendar />
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
        return <ClassListItem data={reserve} key={i} rating={3} />;
      })}
    </Box>
  );
}

export default ReserveClass;
