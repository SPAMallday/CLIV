import React from 'react';
import { ReactDOM } from 'react';

import StarRating from '../../components/starrating/StarRating';
import Profile from '../../components/myprofile/Profile';
import MyReviewTabs from '../../components/myprofile/MyReviewTabs';
import Badge from '../../components/myprofile/Badge';

import Box from '@mui/material/Box';

import './MyProfile.css';

function MyProfile() {
  return (
    <Box>
      <Box sx={{ display: 'flex', my: 5 }}>
        <Box sx={{ flex: '50%' }}>
          <Profile />
        </Box>
        <Box sx={{ flex: '50%' }}>
          <Badge />
        </Box>
      </Box>
      <MyReviewTabs />
    </Box>
  );
}

export default MyProfile;
