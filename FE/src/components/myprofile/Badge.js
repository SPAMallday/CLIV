import Box from '@mui/material/Box';

import './Badge.css';

function Badge() {
  return (
    <div className='badge'>
      <Box
        className='badge-picture'
        sx={{
          width: 100,
          height: 100,
          backgroundColor: '#ecdfc8',
        }}
      >
        뱃지
      </Box>
      <div className='badge-name'>뜨개질 : 27회</div>
    </div>
  );
}

export default Badge;
