import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { KAKAO_AUTH_URL } from '../login/KaKaoLoginInfo';

import LogoPath from '../../assets/Logo2.png';

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

const drawerWidth = 240;

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

  // 알림 개수
  const notiNum = 27;

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

  /* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box> */

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
  };

  // navbar가 줄어들었을 때 표시할 내용
  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box id="mainLogo" onClick={handleDrawerToggle}>
        <Button component={Link} to={'/'} disableRipple>
          <img src={LogoPath} style={{ width: '100px' }}></img>
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
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="채팅" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItem disablePadding onClick={handleDrawerToggle}>
          <ListItemButton component={Link} to={'/classmanage'}>
            <ListItemText primary="클래스 관리" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItemButton onClick={handleDrawMy}>
          <ListItemText primary="나의 정보" />
          {openDrawMy ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openDrawMy} timeout="auto" unmountOnExit>
          <List component="div" disablePadding onClick={handleDrawerToggle}>
            <ListItemButton component={Link} to={'/myprofile'} sx={{ pl: 4 }}>
              <ListItemText primary="마이프로필" />
            </ListItemButton>
            <ListItemButton component={Link} to={'/myhistory'} sx={{ pl: 4 }}>
              <ListItemText primary="나의 수강이력" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="로그아웃" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItem disablePadding onClick={handleClickNoti}>
          <ListItemButton>
            <ListItemText primary="알림센터" />
            <Badge
              badgeContent={notiNum}
              color="error"
              sx={{
                right: '20px',
              }}
            ></Badge>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: 'rgba(223, 120, 97, 0.8)',
    '&:hover': {
      backgroundColor: 'rgba(223, 120, 97, 1.0)',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      maxWidth: '15ch',
      color: 'white',
    },
  }));

  return (
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
                <img src={LogoPath} style={{ width: '100px' }}></img>
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
            <Box sx={{ display: 'flex' }}>
              <Button
                id="matching-button"
                onClick={handleClickMatching}
                disableRipple
                sx={{ color: 'black' }}
              >
                매칭
              </Button>
              <Menu
                id="matching-menu"
                anchorEl={anchorElMatching}
                open={openMatching}
                onClose={handleCloseMatching}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  component={Link}
                  to={'/matching'}
                  onClick={handleCloseMatching}
                >
                  요청 보내기
                </MenuItem>

                <MenuItem
                  component={Link}
                  to={'/matching/receiverequest'}
                  onClick={handleCloseMatching}
                >
                  받은 요청
                </MenuItem>

                <MenuItem onClick={handleCloseMatching}>채팅</MenuItem>
              </Menu>
            </Box>
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
            }}
          >
            <Search id="search">
              <SearchIconWrapper>
                <SearchIcon sx={{ color: 'white' }} />
              </SearchIconWrapper>
              <StyledInputBase inputProps={{ 'aria-label': 'search' }} />
            </Search>

            {isLogin === true ? (
              <>
                <IconButton
                  onClick={handleClickNoti}
                  id="noti"
                  size="large"
                  disableRipple
                  style={{ backgroundColor: 'transparent', color: 'darkgray' }}
                >
                  <Badge badgeContent={notiNum} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Menu
                  anchorEl={anchorElNoti}
                  open={openNoti}
                  onClose={handleCloseNoti}
                  // onClick={handleCloseUser}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <NotiCenter
                    handleChangeNotiTab={handleChangeNotiTab}
                    notiTabValue={notiTabValue}
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
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
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
              <a id="loginButton" href={KAKAO_AUTH_URL}>
                로그인
              </a>
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
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
export default NavBar;
