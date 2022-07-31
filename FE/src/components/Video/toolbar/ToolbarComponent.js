import React, { Component } from "react";
import "./ToolbarComponent.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import Videocam from "@mui/icons-material/Videocam";
import VideocamOff from "@mui/icons-material/VideocamOff";
import Fullscreen from "@mui/icons-material/Fullscreen";
import FullscreenExit from "@mui/icons-material/FullscreenExit";
// import SwitchVideoIcon from "@mui/icons-material/SwitchVideo";
// import PictureInPicture from "@mui/icons-material/PictureInPicture";
import ScreenShare from "@mui/icons-material/ScreenShare";
import StopScreenShare from "@mui/icons-material/StopScreenShare";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";

import IconButton from "@mui/material/IconButton";

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
      barValue: 0,
    };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    // this.switchCamera = this.switchCamera.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  // switchCamera() {
  //   this.props.switchCamera();
  // }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  // 나중에 사람 선택하면 카메라 바뀌게 할 때
  // 몇 번째 탭 선택했는지 값 불러와서 카메라 스위치
  handleChange = (event, newValue) => {
    this.setState({
      barValue: newValue,
    });
    this.props.targetVideoStreamId(event.target.attributes.streamid.value);
  };

  a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    // const temp = this.props.subscribers[1].getStreamManager();

    return (
      <Box
        className='toolbar'
        id='header'
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "auto",
        }}
      >
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={this.state.barValue}
          onChange={this.handleChange}
          textColor='secondary'
          indicatorColor='secondary'
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {this.props.subscribers.map((sub, i) => (
            <Tab
              key={i}
              label={sub.nickname.slice(0, 4)}
              streamId={sub.streamManager.stream.streamId}
            />
          ))}
        </Tabs>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            color='inherit'
            onClick={this.toggleChat}
            id='navChatButton'
          >
            {this.props.showNotification && <div id='point' className='' />}
            <Tooltip title='Chat'>
              <QuestionAnswer />
            </Tooltip>
          </IconButton>
          <IconButton
            color='inherit'
            className='navButton'
            id='navMicButton'
            onClick={this.micStatusChanged}
          >
            {localUser !== undefined && localUser.isAudioActive() ? (
              <Mic />
            ) : (
              <MicOff color='secondary' />
            )}
          </IconButton>

          <IconButton
            color='inherit'
            className='navButton'
            id='navCamButton'
            onClick={this.camStatusChanged}
          >
            {localUser !== undefined && localUser.isVideoActive() ? (
              <Videocam />
            ) : (
              <VideocamOff color='secondary' />
            )}
          </IconButton>

          {localUser !== undefined && localUser.isScreenShareActive() ? (
            <IconButton
              color='inherit'
              onClick={this.stopScreenShare}
              id='navScreenButton'
            >
              <StopScreenShare color='secondary' />
            </IconButton>
          ) : (
            <IconButton
              color='inherit'
              onClick={this.screenShare}
              id='navScreenButton'
            >
              <ScreenShare />
            </IconButton>
          )}

          {/* <IconButton
            color='inherit'
            className='navButton'
            onClick={this.switchCamera}
          >
            <SwitchVideoIcon />
          </IconButton> */}
          <IconButton
            color='inherit'
            className='navButton'
            onClick={this.toggleFullscreen}
          >
            {localUser !== undefined && this.state.fullscreen ? (
              <FullscreenExit />
            ) : (
              <Fullscreen />
            )}
          </IconButton>
          <IconButton
            color='secondary'
            className='navButton'
            onClick={this.leaveSession}
            id='navLeaveButton'
          >
            <PowerSettingsNew />
          </IconButton>
        </Box>
        {/* <div id='navSessionInfo'>
          {this.props.sessionId && (
            <div id='titleContent'>
              <span id='session-title'>{mySessionId}</span>
            </div>
          )}
        </div> */}
        {/* <div className='buttonsContent'></div> */}
      </Box>
    );
  }
}
