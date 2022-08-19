import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { privateCreate } from '../../api/privateclassAPI';

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
  const type = props.type;

  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setItem(props.transItem);
    setOpen(props.openDetail);
  }, [props.openDetail]);

  const handleClose = () => {
    setOpen(false);
    props.handleState(false);
  };

  // 등록
  const createData = () => {
    sendData();
    // window.location.reload();
  };

  const userId = useSelector((state) => state.userInfo.user.id);

  const sendData = async () => {
    const matchingId = item.mt_id;
    const className = item.title;
    const classDatetime = item.wantedDay;
    const tuitionFee = item.price;

    const myData = {
      teacherId: userId,
      mtId: matchingId,
      className: className,
      classDatetime: classDatetime,
      tuitionFee: tuitionFee,
    };
    console.log(myData);

    privateCreate(myData).then((res) => {
      handleOpenSuccess();
    });
  };

  const handleOpenSuccess = () => {
    setSuccess(true);
  };

  return (
    <>
      {item === null ? null : (
        <Modal open={open} onClose={handleClose}>
          {type === 'receive' ? (
            <Box sx={style}>
              <Stack spacing={1}>
                <Typography fontWeight={700}>
                  [{item.category}] {item.title}
                </Typography>
                <Typography>요청자 : {item.nickname} </Typography>
                <Typography>요청일 : {item.regdate.slice(0, 10)} </Typography>
                <Typography>원하는 시간 : {item.wantedDay} </Typography>
                <Typography>원하는 가격 : {item.price} 원</Typography>
                <br />
                <Typography fontWeight={700}>요청 내용</Typography>
                <Typography>{item.content}</Typography>
              </Stack>
              <Box sx={{ mt: 10, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={createData}
                >
                  수락 (클래스 개설)
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={style}>
              <Stack spacing={1}>
                <Typography fontWeight={700}>
                  [{item.categoryContent}] {item.title}
                </Typography>
                <Typography>요청자 : {item.requestperson} </Typography>
                <Typography>요청일 : {item.regDate.slice(0, 10)} </Typography>
                <Typography>원하는 시간 : {item.wantedDay} </Typography>
                <Typography>원하는 가격 : {item.price} 원</Typography>
                <br />
                <Typography fontWeight={700}>요청 내용</Typography>
                <Typography>{item.content}</Typography>
              </Stack>
            </Box>
          )}
        </Modal>
      )}
    </>
  );
}

export default RequestModal;
