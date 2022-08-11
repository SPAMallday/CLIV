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
  style: { display: 'inline' },
}));

function NotiCenter(props) {
  return (
    <>
      <Tabs
        value={props.notiTabValue}
        onChange={props.handleChangeNotiTab}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="normal" label="일반" />
        <Tab value="chat" label="채팅" />
      </Tabs>
      <TabPanel value={props.notiTabValue} index="normal">
        <MenuItem component={Link} to={'/matching/receiverequest'}>
          <Stack sx={{ width: '100%' }}>
            <Box>
              <Typography fontSize={'0.8rem'}>
                <EmNotiTypograpy>
                  {'카테고리'} - {'클래스 제목(요청 제목)'}
                </EmNotiTypograpy>
                에 대한 제안을 받았습니다!
              </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                sx={{ fontSize: '0.7rem', px: '3px', py: '1px', mt: '2px' }}
              >
                여기를 눌러 자세한 내용을 확인하세요!
              </Button>
            </Box>
          </Stack>
        </MenuItem>
        <Divider sx={{ my: '1px !important' }} />
      </TabPanel>
      <TabPanel value={props.notiTabValue} index="chat">
        <MenuItem component={Link} to={'/myhistory'}>
          <Stack>
            <Box>
              <Typography>
                {'카테고리'} - {'클래스 제목(요청 제목)'}
              </Typography>
              <Typography>수업 시작 10분 전입니다!</Typography>
            </Box>
            <Box>
              <Button variant="outlined" color="secondary">
                여기를 눌러 수업을 시작하세요!
              </Button>
            </Box>
          </Stack>
        </MenuItem>
        <Divider />
      </TabPanel>
    </>
  );
}

export default NotiCenter;
