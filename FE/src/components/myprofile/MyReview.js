import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import './MyReview.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ecdfc8',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function MyReview() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='myreview'>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Item One' {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className='myreview-container'>
            <div className='leftside'>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                    <Tab label='작성한 리뷰' {...a11yProps(0)} />
                    <Tab label='받은 리뷰' {...a11yProps(1)} />
                    <Tab label='내가 쓴 리뷰' {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}></TabPanel>
                <TabPanel value={value} index={1}></TabPanel>
                <TabPanel value={value} index={2}></TabPanel>
              </Box>
            </div>
            <div className='rightside'>
              <div>정렬 : </div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                <Select labelId='demo-select-small' id='demo-select-small' onChange={handleChange}>
                  <MenuItem>최신순</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className='myreview-box'>
            <div className='leftside'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Item>
                      <Stack spacing={1}>
                        <Rating
                          name='half-rating-read'
                          defaultValue={2.5}
                          precision={0.5}
                          readOnly
                        />
                      </Stack>
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item>강의자 :</Item>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Item>카테고리 : </Item>
                  </Grid>
                  <Grid item xs>
                    <Item>강의명 : </Item>
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs>
                    <Item>수업 설명이 자세해요!</Item>
                  </Grid>
                  <Grid item xs>
                    <Item>강사님이 잘생겼어요!</Item>
                  </Grid>
                  <Grid item xs>
                    <Item>수업이 이해하기 쉬웠어요!</Item>
                  </Grid>
                  <Grid item xs>
                    <Item>강사님이 친절해요!</Item>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Item>후기</Item>
                  </Grid>
                </Grid>
              </Box>
            </div>
            <div className='rightside'>
              <Button>수정</Button>
              <Button>삭제</Button>
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}

export default MyReview;
