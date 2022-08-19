import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

// const cards = [1, 2, 3, 4, 5, 6, 7, 8]; // 현재 8개 보여줌

const ClassThumbnailList = ({ value }) => {
  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {value &&
          value.map((cl) => (
            <Grid item key={cl.classId} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                }}
                component={Link}
                to={`/class/detail/${cl.classId}`}
              >
                <CardMedia
                  alt="classThumbnail"
                  component="img"
                  sx={{
                    height: '100%',
                    // pt: '56.25%', // 16:9
                  }}
                  image={cl.classImg}
                />
                <CardActions>
                  <Stack sx={{ width: '100%' }}>
                    <Typography
                      fontSize={'0.7rem'}
                      fontWeight={700}
                      color="gray"
                      noWrap
                    >
                      [{cl.category}] {cl.teacherNickname}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      noWrap
                    >
                      {cl.className}
                    </Typography>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ClassThumbnailList;
