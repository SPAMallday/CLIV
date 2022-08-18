import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { KAKAO_AUTH_URL } from '../login/KaKaoLoginInfo';

import LogoPath from '../../assets/Logo.png';

import './NavBar.css';
import NotiCenter from '../notification/notiCenter';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/modules/loginUser';
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { getAllNoti, setNotiRead } from '../../api/notiAPI';
import Spinner from '../spinner/Spinner';

// 스타일 적용
const paperpropsset = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 18,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};
// const dispatch = useDispatch();
// const logoutBtn = () => {
//   console.log('out');
//   useEffect(() => {
//     dispatch(logout());
//   }, dispatch);
// };
function NavBar() {
  // 로그인 상태 확인
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const role = useSelector((state) => state.userInfo.user.role);
  const authId = useSelector((state) => state.userInfo.user.id);

  const navigate = useNavigate();

  // TODO 로딩 스피너 먹이는 법..?
  const loading = useSelector((state) => state.loading);

  // navbar 열고 닫는 스테이트
  const container = document.getElementById('bodyContainer');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setOpenDrawMatching(false);
    setOpenDrawMy(false);
  };

  // 매칭 메뉴를 열고 닫는 스테이트 관리
  const [anchorElMatching, setAnchorElMatching] = React.useState(null);
  const openMatching = Boolean(anchorElMatching);
  const handleClickMatching = (event) => {
    setAnchorElMatching(event.currentTarget);
  };
  const handleCloseMatching = () => {
    setAnchorElMatching(null);
  };

  // 유저 메뉴를 열고 닫는 스테이트 관리
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const openUser = Boolean(anchorElUser);
  const handleClickUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  // 알림창 메뉴를 열고 닫는 스테이트 관리
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const openNoti = Boolean(anchorElNoti);
  const handleClickNoti = (event) => {
    setAnchorElNoti(event.currentTarget);
  };
  const handleCloseNoti = () => {
    setAnchorElNoti(null);
  };

  //알림창 탭의 종류를 결정하는 변수
  const [notiTabValue, setNotiTabValue] = React.useState('normal');
  const handleChangeNotiTab = (event, newValue) => {
    setNotiTabValue(newValue);
  };

  //navbar가 줄어들었을 때 Drawer에 들어갈 메뉴 리스트들 관리
  const [openDrawMatching, setOpenDrawMatching] = React.useState(false);
  const [openDrawMy, setOpenDrawMy] = React.useState(false);

  const handleDrawMatching = () => {
    setOpenDrawMatching(!openDrawMatching);
  };
  const handleDrawMy = () => {
    setOpenDrawMy(!openDrawMy);
  };

  const logoutBtn = () => {
    console.log('out');
    dispatch(logout());
    navigate('/');
  };

  // SSE 적용
  const [listening, setListening] = useState(false);
  const [notiData, setNotiData] = useState([]);
  const [targetNotiId, setTargetNotiId] = useState(0);

  let eventSource = undefined;

  // 로그인이 됐을 때 1번만 실행 or 로그인인 상태로 새로고침 시 실행
  useEffect(() => {
    console.log('매번 실행되는지');
    console.log('listening', listening);

    if (!listening && isLogin) {
      // EventSource 로 Server Sent Event 를 호출하는 부분
      // query Parameter로 authId 전송
      eventSource = new EventSource(
        process.env.REACT_APP_BASE_URL + '/api/sub' + `/${authId}`,
      );

      console.log('eventSource', eventSource);

      eventSource.onopen = (event) => {
        // 첫 메세지가 오기 전까지 open인지 모름
        console.log('connection opened');
      };

      // lastEventId 사용하려면 event.lastEventId를 저장
      eventSource.onmessage = (event) => {
        console.log(event.data);
        if (event.data[0] === 'E') {
          console.log('알림 연결 성공');
        } else {
          const trans = JSON.parse(event.data);
          setNotiData((old) => [...old, trans]);
        }
      };

      eventSource.onerror = (event) => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log('eventsource closed (' + event.target.readyState + ')');
        }
        eventSource.close();
      };

      setListening(true);

      // 밑에거 인터셉터 사용해서 수정함!
      //  eventsource를 보낼때는 authId가 있는데 api를 요청할 때 header에는
      // 토큰이 null로 들어감
      // 완전 JWT를 다 지우고 로그아웃 상태에서 시작하면 작동이 안됨
      // 아마 API index.js에서 헤더에 토큰을 지정할 때 아직 token이 저장이 안된 시기에
      // 헤더설정이 먼저되는 것 같다는 의심
      getAllNoti().then((res) => {
        if (res.data) {
          setNotiData(res.data);
        }
      });
    }

    // Unmount될 때
    return () => {
      eventSource?.close();
      console.log('eventsource closed');
    };
  }, [isLogin]);

  // FIXME
  useEffect(() => {
    if (targetNotiId !== 0) {
      // 읽음으로 전환 요청
      setNotiRead(targetNotiId).then((code) => {
        if (code === 200) {
          // 읽은 알림 제거
          // setNotiData((prev) => prev.filter((noti) => noti.id !== targetNotiId));
          setNotiData(notiData.filter((noti, i) => noti.id !== targetNotiId));
        }
      });
    }
  }, [targetNotiId]);

  // navbar가 줄어들었을 때 표시할 내용
  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box id="mainLogo" onClick={handleDrawerToggle}>
        <Button component={Link} to={'/'} disableRipple>
          <img src={LogoPath} alt="CLIV logo" style={{ width: '100px' }}></img>
        </Button>
      </Box>
      <Divider />
      <List sx={{ textAlign: 'left' }}>
        <ListItem disablePadding onClick={handleDrawerToggle}>
          <ListItemButton component={Link} to={'/class/list'}>
            <ListItemText primary="클래스" />
          </ListItemButton>
        </ListItem>
        <ListItemButton onClick={handleDrawMatching}>
          <ListItemText primary="매칭" />
          {openDrawMatching ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openDrawMatching} timeout="auto" unmountOnExit>
          <List component="div" disablePadding onClick={handleDrawerToggle}>
            <ListItemButton component={Link} to={'/matching'} sx={{ pl: 4 }}>
              <ListItemText primary="요청 보내기" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to={'/matching/receiverequest'}
              sx={{ pl: 4 }}
            >
              <ListItemText primary="받은 요청" />
            </ListItemButton>
            {/* <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="채팅" />
            </ListItemButton> */}
          </List>
        </Collapse>
        <ListItem disablePadding onClick={handleDrawerToggle}>
          <ListItemButton component={Link} to={'/classmanage'}>
            <ListItemText primary="클래스 관리" />
          </ListItemButton>
        </ListItem>
        <Divider />
        {isLogin ? (
          <>
            <ListItem disablePadding onClick={handleClickNoti}>
              <ListItemButton>
                <ListItemText primary="알림센터" />
                <Badge
                  badgeContent={notiData?.length}
                  color="error"
                  sx={{
                    right: '20px',
                  }}
                ></Badge>
              </ListItemButton>
            </ListItem>
            <ListItemButton onClick={handleDrawMy}>
              <ListItemText primary="나의 정보" />
              {openDrawMy ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openDrawMy} timeout="auto" unmountOnExit>
              <List component="div" disablePadding onClick={handleDrawerToggle}>
                <ListItemButton
                  component={Link}
                  to={'/myprofile'}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="마이프로필" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to={'/myhistory'}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="나의 수강이력" />
                </ListItemButton>
                <ListItemButton onClick={logoutBtn} sx={{ pl: 4 }}>
                  <ListItemText primary="로그아웃" />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        ) : (
          <ListItemButton>
            <a className="loginButton" href={KAKAO_AUTH_URL}>
              <ListItemText primary="로그인" />
            </a>
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <>
      {loading && <Spinner />}
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav" position="relative">
          <Toolbar
            variant="dense"
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-end', nav: 'space-between' },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', nav: 'flex' },
                justifyContent: 'flex-start',
              }}
            >
              <Box id="mainLogo">
                <Button component={Link} to={'/'} disableRipple>
                  <img
                    src={LogoPath}
                    alt="CLIV logo"
                    style={{ width: '100px' }}
                  ></img>
                </Button>
              </Box>
              <Button
                component={Link}
                to={'/class/list'}
                variant="text"
                disableRipple
                sx={{ color: 'black' }}
              >
                클래스
              </Button>
              {isLogin && (
                <Box sx={{ display: 'flex' }}>
                  <Button
                    onClick={handleClickMatching}
                    disableRipple
                    sx={{ color: 'black' }}
                  >
                    매칭
                  </Button>
                  <Menu
                    anchorEl={anchorElMatching}
                    open={openMatching}
                    onClose={handleCloseMatching}
                  >
                    <MenuItem
                      component={Link}
                      to={'/matching'}
                      onClick={handleCloseMatching}
                    >
                      요청 보내기
                    </MenuItem>

                    {role === 'TEACHER' && (
                      <MenuItem
                        component={Link}
                        to={'/matching/receiverequest'}
                        onClick={handleCloseMatching}
                      >
                        받은 요청
                      </MenuItem>
                    )}

                    {/* <MenuItem onClick={handleCloseMatching}>채팅</MenuItem> */}
                  </Menu>
                </Box>
              )}
              {isLogin && role === 'TEACHER' && (
                <Button
                  component={Link}
                  to={'/classmanage'}
                  variant="text"
                  disableRipple
                  sx={{ color: 'black', width: '6rem' }}
                >
                  클래스 관리
                </Button>
              )}
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', nav: 'flex' },
                justifyContent: 'flex-end',
                alignItems: 'center',
                pr: 6,
              }}
            >
              {/* 
            // 검색바..
            <Search id="search">
              <SearchIconWrapper>
                <SearchIcon sx={{ color: 'white' }} />
              </SearchIconWrapper>
              <StyledInputBase inputProps={{ 'aria-label': 'search' }} />
            </Search> */}

              {isLogin === true ? (
                <>
                  <IconButton
                    onClick={handleClickNoti}
                    id="noti"
                    size="large"
                    disableRipple
                    style={{
                      backgroundColor: 'transparent',
                      color: 'darkgray',
                    }}
                  >
                    <Badge
                      badgeContent={notiData ? notiData.length : null}
                      color="error"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Menu
                    anchorEl={anchorElNoti}
                    open={openNoti}
                    onClose={handleCloseNoti}
                    // onClick={handleCloseUser}
                    PaperProps={{
                      ...paperpropsset,
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <NotiCenter
                      handleChangeNotiTab={handleChangeNotiTab}
                      notiTabValue={notiTabValue}
                      notiData={notiData}
                      setTargetNotiId={setTargetNotiId}
                      nowTime={new Date()}
                    ></NotiCenter>
                  </Menu>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <IconButton
                      onClick={handleClickUser}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={openUser ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openUser ? 'true' : undefined}
                      disableRipple
                    >
                      <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                  </Box>
                  <Menu
                    anchorEl={anchorElUser}
                    id="account-menu"
                    open={openUser}
                    onClose={handleCloseUser}
                    // onClick={handleCloseUser}
                    PaperProps={{
                      ...paperpropsset,
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem component={Link} to={'/myprofile'}>
                      마이프로필
                    </MenuItem>
                    <MenuItem component={Link} to={'/myhistory'}>
                      나의수강내역
                    </MenuItem>
                    <MenuItem onClick={logoutBtn}>로그아웃</MenuItem>{' '}
                    {/* 수정필요 */}
                  </Menu>
                </>
              ) : (
                <Button
                  variant="text"
                  disableRipple
                  sx={{ color: 'black', width: '6rem' }}
                >
                  <a className="loginButton" href={KAKAO_AUTH_URL}>
                    로그인
                  </a>
                </Button>
              )}
            </Box>
            <IconButton
              color="secondary"
              aria-label="open drawer"
              edge="start"
              size="large"
              onClick={handleDrawerToggle}
              sx={{ display: { nav: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            anchor={'right'}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', nav: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 240,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}
export default NavBar;
