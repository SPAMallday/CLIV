import { Box, IconButton, MenuItem, styled, Typography } from '@mui/material';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { Link } from 'react-router-dom';

function formatDate(nowTime, date) {
  const seconds = (nowTime - date) / 1000;
  if (seconds < 60) return `방금`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월`;
  const years = days / 365;
  return `${Math.floor(years)}년`;
}

const EmNotiTypograpy = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  fontWeight: 700,
  color: theme.palette.secondary.main,
  display: 'inline-block',
}));

export default function NotiItem(props) {
  let appText, convTime, toPath;

  if (props.type === 'class') {
    appText = '수업이 시작되었습니다!';
    toPath = '/myhistory';
  } else {
    appText = '요청의 1대1 수업이 개설되었습니다!';
    toPath = '/myhistory';
  }
  // FIXME - regtime 전송좀!!
  if (props.noti.regDate != null) {
    convTime = formatDate(props.nowTime, new Date(props.noti.regDate));
  } else {
    convTime = '오래';
  }

  return (
    <>
      <MenuItem
        divider
        component={Link}
        to={toPath}
        sx={{ display: 'flex', width: '100%', px: 1 }}
        onClick={() => {
          props.setTargetNotiId(props.noti.id);
        }}
      >
        <Box sx={{ width: '90%' }}>
          <Box sx={{ width: '100%', display: 'flex' }}>
            <EmNotiTypograpy noWrap>{props.noti.msg}</EmNotiTypograpy>
            <Typography
              fontSize={'0.8rem'}
              sx={{ ml: '0.3rem', mb: '0.3rem', display: 'inline-block' }}
            >
              {appText}
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'flex-start'}>
            <Typography fontSize={'0.7rem'} color="gray">
              {convTime} 전
            </Typography>
          </Box>
        </Box>
        <IconButton disabled sx={{ width: '10%' }}>
          <KeyboardArrowRightRoundedIcon color="secondary" sx={{}} />
        </IconButton>
      </MenuItem>
    </>
  );
}
