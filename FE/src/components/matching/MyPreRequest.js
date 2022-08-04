import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import './MyPreRequest.css';

function MyPreRequest() {
  return (
    <div>
      <div className='myPreMatchingTitle'>나의 이전 요청</div>
      <Grid container className='gohome'>
        <Grid item xs md={6} lg={4}>
          <Box className='myPreMatchingBox' style={{ whiteSpace: 'nowrap' }}>
            <Box className='myPreMatching' component='div' sx={{ textOverflow: 'ellipsis' }}>
              가죽공예
            </Box>
            <Box className='myPreMatching' component='div' sx={{ textOverflow: 'ellipsis' }}>
              가죽으로 DB를 만들고 싶어요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
            </Box>
            <Box className='myPreMatching' component='div' sx={{ textOverflow: 'ellipsis' }}>
              요청일 : 2022.07.23
            </Box>
            <Button variant='contained'>요청 자세히 보기</Button>
          </Box>
        </Grid>
        <Grid item xs md={6} lg={4}>
          <Box className='myPreMatchingBox' style={{ whiteSpace: 'nowrap' }}>
            <Box className='myPreMatching' component='div' sx={{ textOverflow: 'ellipsis' }}>
              가죽공예
            </Box>
            <Box className='myPreMatching' component='div' sx={{ textOverflow: 'ellipsis' }}>
              가죽으로 DB를 만들고 싶어요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
            </Box>
            <Box className='myPreMatching' component='div' sx={{ textOverflow: 'ellipsis' }}>
              요청일 : 2022.07.23
            </Box>
            <Button variant='contained'>요청 자세히 보기</Button>
          </Box>
        </Grid>
        <Grid item xs md={6} lg={4}>
          <Box className='myPreMatchingBox' style={{ whiteSpace: 'nowrap' }}>
            <Box className='myPreMatching' component='div' sx={{ textOverflow: 'ellipsis' }}>
              가죽공예
            </Box>
            <Box className='myPreMatching' component='div' sx={{ textOverflow: 'ellipsis' }}>
              가죽으로 DB를 만들고 싶어요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
            </Box>
            <Box className='myPreMatching' component='div' sx={{ textOverflow: 'ellipsis' }}>
              요청일 : 2022.07.23
            </Box>
            <Button variant='contained'>요청 자세히 보기</Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyPreRequest;
