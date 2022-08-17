import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

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
                }}
                component={Link}
                to={`/class/detail/${cl.classId}`}
              >
                <CardMedia
                  component="img"
                  sx={
                    {
                      // pt: '56.25%', // 16:9
                    }
                  }
                  image={cl.classImg}
                />
                {/* <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      뜨개질입니다.
                    </Typography>
                  </CardContent> */}
                <CardActions>
                  <Typography gutterBottom variant="subtitle2" component="div">
                    {cl.className}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ClassThumbnailList;
