import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import './Profile.css';

function Profile() {
  return (
    <div className='profile'>
      <Box
        className='profile-picture'
        sx={{
          width: 160,
          height: 160,
          backgroundColor: '#ecdfc8',
        }}
      >
        프로필 사진
      </Box>
      <div className='rightside'>
        <h3>선생님 닉네임</h3>
        <div>평균 평점</div>
        <div>총 개설한 강의 수 </div>
        <Button>선생님이 개최한 강의 보러가기!</Button>
      </div>
    </div>
  );
}

export default Profile;
