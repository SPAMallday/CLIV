import { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Stack, Typography, Paper } from '@mui/material';

function RecRequest(props) {
  const [data, setData] = useState([
    {
      category: '가죽 공예',
      desc: '가죽으로 DB를 만들고 싶어요 ㅠㅠㅠ',
      requestperson: '블루레몬민주',
      requestdate: '2022.07.23',
      time: '2022.08.23 오후 1시 ~',
      amount: '50000원',
    },
    {
      category: '가죽 공예',
      desc: '가죽으로 DB를 만들고 싶어요 ㅠㅠㅠ',
      requestperson: '블루레몬민주',
      requestdate: '2022.07.23',
      time: '2022.08.23 오후 1시 ~',
      amount: '50000원',
    },
    {
      category: '가죽 공예',
      desc: '가죽으로 DB를 만들고 싶어요 ㅠㅠㅠ',
      requestperson: '블루레몬민주',
      requestdate: '2022.07.23',
      time: '2022.08.23 오후 1시 ~',
      amount: '50000원',
    },
  ]);

  return (
    <>
      {data.map((item, i) => {
        return (
          <Box sx={{ my: 2, minWidth: '600px' }}>
            <Grid container columnSpacing={3} sx={{ px: 1 }}>
              <Grid item sx={{ flex: '100%' }}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    borderRadius: '15px',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ flex: '75%' }}>
                    <Stack spacing={1}>
                      <Typography fontWeight={700}>
                        [{item.category}] {item.desc}
                      </Typography>
                      <Typography>요청자 : {item.requestperson} </Typography>
                      <Typography>요청일 : {item.requestdate} </Typography>
                      <Typography>원하는 시간 : {item.time} </Typography>
                      <Typography>예상 금액 : {item.amount} </Typography>
                    </Stack>
                  </Box>

                  <Box sx={{ flex: '25%', textAlign: 'center' }}>
                    <Button variant="contained" color="secondary">
                      요청 자세히 보기
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </>
  );
}

export default RecRequest;
