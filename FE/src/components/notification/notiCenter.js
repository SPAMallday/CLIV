import { Box, MenuList, Stack, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import NotiItem from './notiItem';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box
          sx={{ p: 1, width: '350px', maxHeight: '300px', overflow: 'scroll' }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function NotiCenter(props) {
  const notiData = props.notiData;
  let classNotiArr = [],
    matchNotiArr = [];

  if (notiData.length > 0) {
    for (const noti of notiData) {
      if (noti.notiType === 'ClassStart') {
        classNotiArr.push({
          id: noti.id,
          msg: noti.message,
        });
      }
      // 수업 관련 메세지가 아니라면
      else {
        matchNotiArr.push({
          id: noti.id,
          msg: noti.message,
        });
      }
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      {console.log(classNotiArr)}
      <Tabs
        value={props.notiTabValue}
        onChange={props.handleChangeNotiTab}
        textColor="secondary"
        indicatorColor="secondary"
        variant="fullWidth"
        sx={{
          borderBottom: '1px solid rgba(0, 0, 0, .2)',
        }}
      >
        <Tab value="normal" label="수업" />
        <Tab value="matching" label="매칭" />
      </Tabs>
      <TabPanel value={props.notiTabValue} index="normal">
        {classNotiArr.length > 0 ? (
          <Stack sx={{ width: '100%' }}>
            <MenuList sx={{ width: '100%' }}>
              {classNotiArr.map((noti, i) => {
                return (
                  <NotiItem
                    type="class"
                    noti={noti}
                    nowTime={props.nowTime}
                    setTargetNotiId={props.setTargetNotiId}
                    key={i}
                  />
                );
              })}
            </MenuList>
          </Stack>
        ) : (
          <Typography
            fontSize={'0.8rem'}
            color="gray"
            textAlign={'center'}
            sx={{ mt: 2 }}
          >
            표시할 알림이 없습니다!
          </Typography>
        )}
      </TabPanel>
      <TabPanel value={props.notiTabValue} index="matching">
        {matchNotiArr.length > 0 ? (
          <Stack sx={{ width: '100%' }}>
            <MenuList sx={{ width: '100%' }}>
              {matchNotiArr.map((noti, i) => {
                return (
                  <NotiItem
                    type="matching"
                    noti={noti}
                    nowTime={props.nowTime}
                    setTargetNotiId={props.setTargetNotiId}
                    key={i}
                  />
                );
              })}
            </MenuList>
          </Stack>
        ) : (
          <Typography
            fontSize={'0.8rem'}
            color="gray"
            textAlign={'center'}
            sx={{ mt: 2 }}
          >
            표시할 알림이 없습니다!
          </Typography>
        )}
      </TabPanel>
    </Box>
  );
}

export default NotiCenter;
