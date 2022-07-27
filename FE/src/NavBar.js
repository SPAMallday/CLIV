import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import "./NavBar.css";

function NavBar() {
  const [anchorElMatching, setAnchorElMatching] = React.useState(null);
  const openMatching = Boolean(anchorElMatching);
  const handleClickMatching = (event) => {
    setAnchorElMatching(event.currentTarget);
  };
  const handleCloseMatching = () => {
    setAnchorElMatching(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const openUser = Boolean(anchorElUser);
  const handleClickUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(223, 120, 97, 1.0)",
    "&:hover": {
      backgroundColor: "rgba(223, 120, 97, 1.0)",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <div className="navbar">
      <div className="leftside">
        <a href="/home">만들공예</a>
        <Button
          variant="text"
          disableRipple
          style={{ backgroundColor: "transparent" }}
        >
          클래스
        </Button>
        <div>
          <Button
            id="matching-button"
            aria-controls={openMatching ? "matching-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMatching ? "true" : undefined}
            onClick={handleClickMatching}
            disableRipple
            style={{ backgroundColor: "transparent" }}
          >
            매칭
          </Button>
          <Menu
            id="matching-menu"
            anchorEl={anchorElMatching}
            open={openMatching}
            onClose={handleCloseMatching}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleCloseMatching}>요청 보내기</MenuItem>
            <MenuItem onClick={handleCloseMatching}>받은 요청</MenuItem>
            <MenuItem onClick={handleCloseMatching}>채팅</MenuItem>
          </Menu>
        </div>
        <Button
          variant="text"
          disableRipple
          style={{ backgroundColor: "transparent" }}
        >
          클래스 관리
        </Button>
      </div>

      <div className="rightside">
        <Box>
          <Search>
            <SearchIconWrapper>{/* <SearchIcon/> */}</SearchIconWrapper>
            <StyledInputBase inputProps={{ "aria-label": "search" }} />
          </Search>
        </Box>
        <div>
          <NotificationsNoneRoundedIcon />
        </div>
        <div>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <IconButton
              onClick={handleClickUser}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={openUser ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openUser ? "true" : undefined}
              disableRipple
            >
              <Avatar></Avatar>
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorElUser}
            id="account-menu"
            open={openUser}
            onClose={handleCloseUser}
            onClick={handleCloseUser}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>회원가입</MenuItem>
            <MenuItem>로그인</MenuItem>
            <Divider />
            <MenuItem>마이프로필</MenuItem>
            <MenuItem>나의수강내역</MenuItem>
            <MenuItem>회원정보수정</MenuItem>
            <MenuItem>로그아웃</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
