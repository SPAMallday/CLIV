import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
// import {ThemeProvider as StyledThemeProvider} from "styled-components"

const cards = [1, 2, 3, 4, 5, 6, 7, 8]; // 현재 8개 보여줌
const classImage = ['images/sample.jpg']; // card내용 서버에서 받아오기 / 썸네일, 강의제목
const classTitle = ['title']; // 서버에서 받아올 것들

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          height: '100%',
          width: '100%',
        },
        body: {
          height: '100%',
          width: '100%',
        },
        '#root': {
          height: '100%',
          width: '100%',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#FBF8F1',
    },
  },
});

function Main() {
  return (
    // <StyledThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
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
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      뜨개구리
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </MuiThemeProvider>
    // </StyledThemeProvider>
  );
}
export default Main;
