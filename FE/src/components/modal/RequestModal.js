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
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '25px',
  p: 5,
};

function RequestModal(props) {
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState(null);

  useEffect(() => {
    setItem(props.transItem);
    setOpen(props.openDetail);
  }, [props.openDetail]);

  const handleClose = () => {
    setOpen(false);
    props.handleState(false);
  };

  return (
    <>
      {item === null ? null : (
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Stack spacing={1}>
              <Typography fontWeight={700}>
                [{item.categoryContent}] {item.title}
              </Typography>
              <Typography>요청자 : {item.requestperson} </Typography>
              <Typography>요청일 : {item.regDate.slice(0, 10)} </Typography>
              <Typography>원하는 시간 : {item.wantedDay} </Typography>
              {/* <Typography>예상 금액 : {item.amount} </Typography> */}
              {/* Back단에 해당 내용이 없어서 지웠음 (HJ) */}
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
      )}
    </>
  );
}

export default RequestModal;