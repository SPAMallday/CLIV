import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function ClassManageTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 650 }}>
      <Tabs
        orientation='vertical'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label='예정 클래스' {...a11yProps(0)} />
        <Tab label='지난 클래스' {...a11yProps(1)} />
        <Tab label='클래스 생성' {...a11yProps(2)} />
        <Tab label='Q & A 관리' {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        예정 클래스
      </TabPanel>
      <TabPanel value={value} index={1}>
        지난 클래스
      </TabPanel>
      <TabPanel value={value} index={2}>
        클래스 생성
      </TabPanel>
      <TabPanel value={value} index={3}>
        Q & A 관리
      </TabPanel>
    </Box>
  );
}

export default ClassManageTabs;
