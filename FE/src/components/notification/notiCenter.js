import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 1, width: '400px' }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const EmNotiTypograpy = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  fontWeight: 700,
  color: theme.palette.secondary.main,
  display: 'inline',
}));

function NotiCenter(props) {
  // 클래스 이름이 15자를 넘기면 ...으로 표시하게 만들면 좋을 듯

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={props.notiTabValue}
        onChange={props.handleChangeNotiTab}
        textColor="secondary"
        indicatorColor="secondary"
        variant="fullWidth"
      >
        <Tab value="normal" label="수업" />
        <Tab value="chat" label="채팅" />
      </Tabs>
      <TabPanel value={props.notiTabValue} index="normal">
        <MenuItem component={Link} to={'/myhistory'}>
          <Stack sx={{ width: '100%' }}>
            <Box>
              <Typography fontSize={'0.8rem'} noWrap>
                <EmNotiTypograpy>
                  [{'카테고리'}] {'클래스 제목(요청 제목) '}
                </EmNotiTypograpy>
                수업 시작 10분 전입니다!으아
              </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  px: '3px',
                  py: '1px',
                  mt: '2px',
                }}
              >
                여기를 눌러 수업을 시작하세요!
              </Button>
            </Box>
          </Stack>
        </MenuItem>

        <Divider sx={{ my: '1px !important' }} />
      </TabPanel>
      <TabPanel value={props.notiTabValue} index="chat">
        <MenuItem component={Link} to={'/matching/receiverequest'}>
          <Stack sx={{ width: '100%' }}>
            <Box>
              <Typography fontSize={'0.8rem'} noWrap>
                <EmNotiTypograpy>
                  [{'카테고리'}] {'클래스 제목(요청 제목)'}
                </EmNotiTypograpy>
                에 대한 제안을 받았습니다!
              </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                sx={{
                  fontSize: '0.7rem',
                  px: '3px',
                  py: '1px',
                  mt: '2px',
                }}
              >
                여기를 눌러 자세한 내용을 확인하세요!
              </Button>
            </Box>
          </Stack>
        </MenuItem>
        <Divider sx={{ my: '1px !important' }} />
      </TabPanel>
    </Box>
  );
}

export default NotiCenter;
