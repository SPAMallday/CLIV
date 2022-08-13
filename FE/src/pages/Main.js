import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { mainList } from '../api/classAPI';
const cards = [1, 2, 3, 4, 5, 6, 7, 8]; // 현재 8개 보여줌
const classImage = ['images/sample.jpg']; // card내용 서버에서 받아오기 / 썸네일, 강의제목
const classTitle = ['title']; // 서버에서 받아올 것들

function Main() {
  // const [class, setClass] = useState(null);
  // const { count } = useSelector((state) => state.counter);
  console.log('hi1');
  useEffect(() => {
    console.log('hi');
    const data = mainList();
    console.log(data);
  });

  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h3"
            align="left"
            color="text.primary"
            gutterBottom
          >
            추천 클래스
          </Typography>
          <Box sx={{ flex: '25%', textAlign: 'center' }}>
            <Button variant="contained" color="secondary">
              "A"
            </Button>
          </Box>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  sx={
                    {
                      // pt: '56.25%', // 16:9
                    }
                  }
                  // image="https://source.unsplash.com/random"
                  image="images/sample.jpg"
                  alt="random"
                />
                {/* <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      뜨개질입니다.
                    </Typography>
                  </CardContent> */}
                <CardActions>
                  <Typography gutterBottom variant="subtitle2" component="div">
                    뜨개구리11
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
export default Main;
