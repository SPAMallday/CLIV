import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';

import RequestModal from '../modal/RequestModal';

import './RecRequest.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '25px',
  p: 5,
};

function RecRequest() {
  const [openDetail, setOpenDetail] = React.useState(false);

  const [data, setData] = useState([
    {
      category: '가죽 공예1',
      title: '가죽으로 DB를 만들고 싶어요 ㅠㅠㅠ',
      requestperson: '블루레몬민주',
      requestdate: '2022.07.23',
      time: '2022.08.23 오후 1시 ~',
      amount: '50000원',
      content:
        '아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ',
    },
    {
      category: '가죽 공예2',
      title: '가죽으로 DB를 만들고 싶어요 ㅠㅠㅠ',
      requestperson: '블루레몬민주',
      requestdate: '2022.07.23',
      time: '2022.08.23 오후 1시 ~',
      amount: '50000원',
      content:
        '아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ',
    },
    {
      category: '가죽 공예3',
      title: '가죽으로 DB를 만들고 싶어요 ㅠㅠㅠ',
      requestperson: '블루레몬민주',
      requestdate: '2022.07.23',
      time: '2022.08.23 오후 1시 ~',
      amount: '50000원',
      content:
        '아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ',
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
                        [{item.category}] {item.title}
                      </Typography>
                      <Typography>요청자 : {item.requestperson} </Typography>
                      <Typography>요청일 : {item.requestdate} </Typography>
                      <Typography>원하는 시간 : {item.time} </Typography>
                      <Typography>예상 금액 : {item.amount} </Typography>
                    </Stack>
                  </Box>

                  <Box sx={{ flex: '25%', textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setOpenDetail(true);
                      }}
                    >
                      요청 자세히 보기
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      })}
      <RequestModal openDetail={openDetail} />

      {/* {data.map((item, i) => {
        return (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={1}>
                <Typography fontWeight={700}>
                  [{item.category}] {item.title}
                </Typography>
                <Typography>요청자 : {item.requestperson} </Typography>
                <Typography>요청일 : {item.requestdate} </Typography>
                <Typography>원하는 시간 : {item.time} </Typography>
                <Typography>예상 금액 : {item.amount} </Typography>
                <Typography fontWeight={700}>요청 내용</Typography>
                <Typography>{item.content}</Typography>
              </Stack>
              <Box sx={{ mt: 10, textAlign: 'center' }}>
                <Button variant="contained" color="secondary">
                  채팅으로 연결
                </Button>
              </Box>
            </Box>
          </Modal>
        );
      })} */}
    </>
  );
}

export default RecRequest;
