import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import './CloseClass.css';

function CloseClass() {
  return (
    <div>
      <div className='closeClassTitle'>지난 클래스</div>
      <Divider />

      <div className='closeClassContainer'>
        <div className='classpicture'>클래스 대표 사진</div>
        <div className='classtext'>
          <div className='leftside'>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs>
                  가죽으로 DB 만들기 - 가죽으로 못 만드는게 없어요
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  일정
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  강의자
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  난이도
                </Grid>
              </Grid>
            </Box>
          </div>
          <div className='rightside'>
            <Button variant='contained'>리뷰 쓰기</Button>
          </div>
        </div>
      </div>

      <div className='closeClassContainer'>
        <div className='classpicture'>클래스 대표 사진</div>
        <div className='classtext'>
          <div className='leftside'>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item xs>
                  가죽으로 DB 만들기 - 가죽으로 못 만드는게 없어요
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  일정
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  강의자
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  난이도
                </Grid>
              </Grid>
            </Box>
          </div>
          <div className='rightside'>
            <Button variant='contained'>리뷰 쓰기</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CloseClass;
