import * as React from 'react';
import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const style = {
  bgcolor: 'background.paper',
  borderRadius: '25px',
  p: 5,
};

function ChattingRequestList(props) {
  const [item, setItem] = React.useState(null);

  useEffect(() => {
    setItem(props.transItem);
  });

  return (
    <>
      {item === null ? null : (
        <Box sx={style}>
          <Stack spacing={1} sx={{ textAlign: 'start' }}>
            <Typography fontWeight={700}>
              [가죽 공예] 가죽으로 DB를 만들고 싶어요 ㅠㅠㅠ
            </Typography>
            <Typography>요청자 : 블루레몬민주 </Typography>
            <Typography>요청일 : 2022.07.23 </Typography>
            <Typography>원하는 시간 : 2022.08.23 오후 1시 ~</Typography>
            <Typography>예상 금액 : 50000원 </Typography>
            <Typography fontWeight={700}>요청 내용</Typography>
            <Typography>
              아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ
            </Typography>
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
        </Box>
      )}
    </>
  );
}

export default ChattingRequestList;
