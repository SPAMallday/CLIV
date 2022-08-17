import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { classList } from '../../api/classAPI';
import { Link } from 'react-router-dom';

const cards = [1, 2, 3, 4, 5, 6, 7, 8]; // 현재 8개 보여줌
const classImage = ['images/sample.jpg']; // card내용 서버에서 받아오기 / 썸네일, 강의제목
const classTitle = ['title']; // 서버에서 받아올 것들

function ClassList() {
  const [cList, setCList] = useState([]);

  useEffect(() => {
    classList().then((res) => {
      setCList(res.classList);
      console.log(res);
    });
  }, []);

  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          pt: 8,
          // pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h4"
            variant="h4"
            align="left"
            color="text.primary"
            gutterBottom
          >
            최신 클래스
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cList &&
            cList.map((classTime) => (
              <Grid item key={classTime.classId} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  component={Link}
                  to={`/class/detail/${classTime.classId}`}
                  state={{ classId: classTime.classId }}
                >
                  <CardMedia
                    component="img"
                    sx={
                      {
                        // pt: '56.25%', // 16:9
                      }
                    }
                    image={classTime.classImg}
                  />
                  <CardActions>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      {classTime.className}
                    </Typography>
                  </CardActions>
                </Card>
                {/* </Link> */}
              </Grid>
            ))}
        </Grid>
      </Container>
    </main>
  );
}
export default ClassList;
