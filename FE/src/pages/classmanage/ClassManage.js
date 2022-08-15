import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import './ClassManage.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

function ClassManage() {
  const location = useLocation();

  let nowValue;
  switch (location.pathname) {
    case '/classmanage':
    case '/classmanage/reserve':
      nowValue = 0;
      break;
    case '/classmanage/close':
      nowValue = 1;
      break;
    case '/classmanage/create':
      nowValue = 2;
      break;
    case '/classmanage/qna':
      nowValue = 3;
      break;
    default:
      break;
  }

  let customOutlet;
  switch (nowValue) {
    case 0:
    case 1:
      customOutlet = <Outlet />;
      break;
    case 2:
      customOutlet = (
        <>
          <p className="classManageTitle">클래스 생성</p>
          <Outlet />
        </>
      );
      break;
    case 3:
      customOutlet = (
        <>
          <p className="classManageTitle">Q & A 관리</p>
          <Box sx={{ px: 8, pt: 4 }}>
            <Outlet />
          </Box>
        </>
      );
      break;

    default:
      break;
  }

  const [value, setValue] = React.useState(nowValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    document.getElementById('bodyContainer').style.padding = 0;

    return () => {
      document.getElementById('bodyContainer').style = '';
    };
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        width: '100%',
        minHeight: '100%',
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        textColor="secondary"
        indicatorColor="secondary"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          bgcolor: '#f7ecde',
          minWidth: '6.5rem',
        }}
      >
        <Tab label="예정 클래스" component={Link} to="reserve" />
        <Tab label="지난 클래스" component={Link} to="close" />
        <Tab label="클래스 생성" component={Link} to="create" />
        <Tab label="Q & A 관리" component={Link} to="qna" />
      </Tabs>
      <Box sx={{ p: 3, width: '100%' }}>{customOutlet}</Box>
    </Box>
  );
}

export default ClassManage;
