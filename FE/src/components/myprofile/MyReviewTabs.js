import * as React from 'react';
import PropTypes from 'prop-types';

import StarRating from '../starrating/StarRating';
import MyReview from './MyReview';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { FormControl, Select, MenuItem } from '@mui/material';

import './MyReview.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MyReviewTabs(props) {
  const [valueTitle, setValueTitle] = React.useState(0);
  const handleChangeTitle = (event, newValue) => {
    setValueTitle(newValue);
  };

  const [valueMiniTitle, setValueMiniTitle] = React.useState(0);
  const handleChangeMiniTitle = (event, newValue) => {
    setValueMiniTitle(newValue);
  };

  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box className="myreviewbox">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={valueTitle}
            onChange={handleChangeTitle}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
          >
            <Tab label="리뷰" {...a11yProps(0)} />
            {/* <Tab label="Item Two" {...a11yProps(1)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={valueTitle} index={0}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  flex: '25%',
                  marginRight: '25%',
                }}
              >
                <Tabs
                  value={valueMiniTitle}
                  onChange={handleChangeMiniTitle}
                  aria-label="basic tabs example"
                  textColor="secondary"
                  indicatorColor="secondary"
                >
                  <Tab label="작성한 리뷰" {...a11yProps(0)} />
                  <Tab label="받은 리뷰" {...a11yProps(1)} />
                  <Tab label="내가 쓴 리뷰" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <FormControl sx={{ flex: '25%', marginLeft: '25%' }}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TabPanel value={valueMiniTitle} index={0}>
              <MyReview />
            </TabPanel>
            <TabPanel value={valueMiniTitle} index={1}>
              <MyReview />
            </TabPanel>
            <TabPanel value={valueMiniTitle} index={2}>
              <MyReview />
            </TabPanel>
          </Box>
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
        Item Two
      </TabPanel> */}
      </Box>
    </Box>

    // <div className='myreview'>
    //   <Box sx={{ width: '100%' }}>
    //     <TabPanel value={value} index={0}>
    // <div className='myreview-container'>
    //   <div className='leftside'>

    //   </div>
    //   <div className='rightside'>
    //     <div>정렬 : </div>
    //     <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
    //       <Select labelId='demo-select-small' id='demo-select-small' onChange={handleChange}>
    //         <MenuItem>최신순</MenuItem>
    //       </Select>
    //     </FormControl>
    //   </div>
    //  </div>
    //     </TabPanel>
    //   </Box>
    // </div>
  );
}

export default MyReviewTabs;
