import * as React from 'react';
import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function RequestModal(props) {
  // console.log(props);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  // console.log(handleOpen);

  useEffect(handleOpen, [props]);

  console.log(open);

  const handleClose = () => {
    setOpen(false);
    props.setOpenDetail(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Stack spacing={1}>
            ㅎㅇ
            {/* <Typography fontWeight={700}>
              [{item.category}] {item.title}
            </Typography>
            <Typography>요청자 : {item.requestperson} </Typography>
            <Typography>요청일 : {item.requestdate} </Typography>
            <Typography>원하는 시간 : {item.time} </Typography>
            <Typography>예상 금액 : {item.amount} </Typography>
            <Typography fontWeight={700}>요청 내용</Typography>
            <Typography>{item.content}</Typography> */}
          </Stack>
          <Box sx={{ mt: 10, textAlign: 'center' }}>
            <Button variant="contained" color="secondary">
              채팅으로 연결
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default RequestModal;
