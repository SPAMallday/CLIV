import React, { Component } from 'react';
import './VideoRoomComponent.css';
import { OpenVidu } from 'openvidu-browser';
import StreamComponent from './stream/StreamComponent';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import ChatComponent from './chat/ChatComponent';

import OpenViduLayout from '../../layout/openvidu-layout';
import UserModel from '../../models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';
import { connect } from 'react-redux';
import withRouter from '../route/WithRouter';
import { Box, Button, Dialog, Typography } from '@mui/material';

import Swal from 'sweetalert2';

import PencilPath from '../../assets/pencil.png';
import { exitClass } from '../../api/classAPI';
import axios from 'axios';

var localUser = new UserModel();

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);

    // FIXME 백엔드 배포 연결 테스트용
    this.OPENVIDU_SERVER_URL =
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BASE_URL +
          ':' +
          process.env.REACT_APP_OPENVIDU_PORT
        : 'https://' + window.location.hostname + ':4443';

    // FIXME 백엔드 배포 연결 테스트용
    this.OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_SECRET
      ? process.env.REACT_APP_OPENVIDU_SECRET
      : 'MY_SECRET';
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    // TODO 테스트 끝나면 주석처리 sessionName
    let sessionName = this.props.sessionName
      ? this.props.sessionName
      : 'SessionA';
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      // TODO 테스트 끝나면 주석처리 mySId
      mySessionId: sessionName,
      myUserName: this.props.userInfo.user.nickname,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: 'none',
      currentVideoDevice: undefined,
      mainVideo: undefined,
      token: undefined,
      classId: undefined,
      classEnd: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    // this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.closeDialogExtension = this.closeDialogExtension.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.handleTargetVideo = this.handleTargetVideo.bind(this);
    this.changeTargetVideo = this.changeTargetVideo.bind(this);
    this.validateAccess = this.validateAccess.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    // TODO 테스트 끝나면 주석처리
    this.getToken = this.getToken.bind(this);
  }

  componentDidMount() {
    // router로 전달받은 classId를 세팅하기 위한 useParams
    const classId = this.props.params.classId;
    // router로 전달받은 openvidu token을 세팅하기 위한 location
    const location = this.props.location;
    // react redux에서 정의한 userInfo state를 사용하기 위함
    const { userInfo } = this.props;

    // 이렇게 하면 처음에 렌더링을 하고, 문제가 있음을 확인했기 때문에
    // state에 변경이 생기고 다시 렌더링을 한 번 더하는 문제가 있음
    // if (!this.props.location.state) {
    //   alert('잘못된 접근입니다.');
    //   this.setState({ accessError: true });
    // }

    // if (location.state) {
    // this.setState({
    //   token: location.state.token,
    //   myUserName: userInfo.user.nickname,
    //   classId: classId,
    // });

    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: 'OV_big', // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    this.layout.initLayoutContainer(
      document.getElementById('layout'),
      openViduLayoutOptions,
    );
    window.addEventListener('beforeunload', this.onbeforeunload);
    // window.addEventListener("resize", this.updateLayout);
    window.addEventListener('resize', this.checkSize);
    this.joinSession();
    // }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    // window.removeEventListener("resize", this.updateLayout);
    window.removeEventListener('resize', this.checkSize);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated();
        this.connectToSession();
      },
    );
  }

  connectToSession() {
    // TODO 테스트 끝나면 돌리기
    this.getToken().then((token) => {
      this.connect(token);
    });
    // if (this.state.token !== undefined) {
    //   this.connect(this.state.token);
    // } else {
    //   // 토큰이 없는 경우 메인페이지로 이동
    //   Swal.fire({
    //     title: '클래스에 참여할 권한이 없습니다',
    //     text: '메인페이지로 이동합니다',
    //     icon: 'error',
    //   }).then(() => {
    //     this.props.navigate('/', { replace: true });
    //   });
    // }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert('There was an error connecting to the session:', error.message);
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message,
        );
      });
  }

  async connectWebCam() {
    this.OV.getUserMedia({
      audioSource: undefined,
      videoSource: undefined,
      resolution: '640x480',
      frameRate: 30,
    }).then((mediaStream) => {
      var videoTrack = mediaStream.getVideoTracks()[0];

      var publisher = this.OV.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: videoTrack,
        insertMode: 'APPEND',
        mirror: true,
      });

      if (this.state.session.capabilities.publish) {
        publisher.on('accessAllowed', () => {
          this.state.session.publish(publisher).then(() => {
            this.updateSubscribers();
            this.localUserAccessAllowed = true;
            if (this.props.joinSession) {
              this.props.joinSession();
            }
          });
        });
      }

      localUser.setNickname(this.state.myUserName);
      localUser.setConnectionId(this.state.session.connection.connectionId);
      localUser.setScreenShareActive(false);
      localUser.setStreamManager(publisher);
      this.subscribeToUserChanged();
      this.subscribeToStreamDestroyed();
      this.sendSignalUserChanged({
        isScreenShareActive: localUser.isScreenShareActive(),
      });

      this.setState(
        { currentVideoDevice: videoTrack, localUser: localUser },
        () => {
          this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
            //   this.updateLayout();
            publisher.videos[0].video.parentElement.classList.remove(
              'custom-class',
            );
          });
        },
      );
    });

    // getDevices를 사용하는 경우  connectWebCam 바로 다음 라인 부터
    // 다음처럼 사용 콜백함수 내부에 있는 부분은 모두 밖으로 꺼내서 동기적으로 처리

    // var devices = await this.OV.getDevices();
    // var videoDevices = devices.filter((device) => device.kind === "videoinput");

    // let publisher = this.OV.initPublisher(undefined, {
    //   audioSource: undefined,
    //   videoSource: videoDevices[0].deviceId,
    //   publishAudio: localUser.isAudioActive(),
    //   publishVideo: localUser.isVideoActive(),
    //   resolution: "640x480",
    //   frameRate: 30,
    //   insertMode: "APPEND",
    // });

    // if (this.state.session.capabilities.publish) {
    //   publisher.on("accessAllowed", () => {
    //     this.state.session.publish(publisher).then(() => {
    //       this.updateSubscribers();
    //       this.localUserAccessAllowed = true;
    //       if (this.props.joinSession) {
    //         this.props.joinSession();
    //       }
    //     });
    //   });
    // }
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          });
        }
        // this.updateLayout();
      },
    );
  }

  leaveSession() {
    // TODO 테스트할 때 마다 전환
    // 기존 openvidu 로컬에서 세션 나가기
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }

    // Openvidu 세션에서 나가도록 서버에 요청
    // exitClass(this.state.classId);

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      // mySessionId: 'SessionA',
      myUserName: '',
      localUser: undefined,
      mainVideo: undefined,
      token: undefined,
      classId: undefined,
      // state가 true로 바뀌면서 자동으로 Dialog 표시
      classEnd: true,
    });
  }

  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream,
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on('streamCreated', (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on('streamPlaying', (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          'custom-class',
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType('remote');
      const nickname = event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
        this.changeTargetVideo();
      }, 20);
      event.preventDefault();
      //   this.updateLayout();
    });
  }

  subscribeToUserChanged() {
    this.state.session.on('signal:userChanged', (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log('EVENTO REMOTE: ', event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen(),
      );
    });
  }

  //   updateLayout() {
  //     setTimeout(() => {
  //       this.layout.updateLayout();
  //     }, 20);
  //   }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    this.state.session.signal(signalOptions);
  }

  toggleFullscreen() {
    const document = window.document;
    const fs = document.getElementById('container');
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) =>
            device.deviceId !== this.state.currentVideoDevice.deviceId,
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(
            this.state.localUser.getStreamManager(),
          );
          await this.state.session.publish(newPublisher);
          this.state.localUser.setStreamManager(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  screenShare() {
    const videoSource =
      navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
          Swal.fire({
            title: 'Your browser does not support screen sharing',
            icon: 'info',
          });
        } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
          Swal.fire({
            title: 'You need to enable screen sharing extension',
            icon: 'info',
          });
        } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
          Swal.fire({
            title: 'You need to choose a window or application to share',
            icon: 'question',
          });
        }
      },
    );

    publisher.once('accessAllowed', () => {
      this.state.session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
        });
      });
    });
    publisher.on('streamPlaying', () => {
      //   this.updateLayout();
      publisher.videos[0].video.parentElement.classList.remove('custom-class');
    });
  }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }

  stopScreenShare() {
    this.state.session.unpublish(localUser.getStreamManager());
    this.connectWebCam();
  }

  checkSomeoneShareScreen() {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: 'OV_big',
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    this.layout.setLayoutOptions(openviduLayoutOptions);
    // this.updateLayout();
  }

  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === 'none' ? 'block' : 'none';
    }
    if (display === 'block') {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log('chat', display);
      this.setState({ chatDisplay: display });
    }
    // this.updateLayout();
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === 'none',
    });
  }

  checkSize() {
    if (
      document.getElementById('layout').offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat('none');
      this.hasBeenUpdated = true;
    }
    if (
      document.getElementById('layout').offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }

  changeTargetVideo() {
    const button = document.getElementsByClassName('Mui-selected');
    const tempButtons = document.getElementsByClassName('MuiTab-root');
    let targetId = undefined;

    if (button.length !== 0) {
      targetId = button.item(0).getAttribute('streamid');
    } else if (tempButtons.length !== 0) {
      let target = tempButtons.item(tempButtons.length - 1);
      target.className += ' Mui-selected';
      targetId = target.getAttribute('streamid');
    }

    this.setState({
      mainVideo: targetId,
    });
  }

  handleTargetVideo(targetVideoStreamId) {
    this.setState({
      mainVideo: targetVideoStreamId,
    });
  }

  // Dialog를 닫으면 리뷰창으로 이동
  handleDialogClose() {
    this.setState({
      classEnd: false,
    });
    // 해당 수업의 classId를 가지고 이동
    this.props.navigate('/class/review', {
      state: { classId: this.state.classId },
    });
  }

  // 주소를 직접 입력해서 접근하면 이전 페이지에서 수행하는
  // token을 가져오는 동작을 하지 않아서 location에 state가 없음
  validateAccess() {
    if (!this.props.location.state) {
      alert('잘못된 접근입니다.');
      return false;
    }
    return true;
  }

  render() {
    const open = this.state.classEnd;
    const localUser = this.state.localUser;
    var subscribers = this.state.subscribers;
    var chatDisplay = { display: this.state.chatDisplay };

    return (
      <>
        {/* // TODO 테스트 끝나면 해제 */}
        {/* 접근 에러가 있다면 바로 메인페이지로 이동 */}
        {/* {!this.validateAccess() && <Navigate to="/" replace="true" />} */}

        <div className="container" id="container">
          <ToolbarComponent
            user={localUser}
            subscribers={subscribers}
            showNotification={this.state.messageReceived}
            camStatusChanged={this.camStatusChanged}
            micStatusChanged={this.micStatusChanged}
            screenShare={this.screenShare}
            stopScreenShare={this.stopScreenShare}
            toggleFullscreen={this.toggleFullscreen}
            switchCamera={this.switchCamera}
            leaveSession={this.leaveSession}
            toggleChat={this.toggleChat}
            targetVideoStreamId={this.handleTargetVideo}
          />

          <DialogExtensionComponent
            showDialog={this.state.showExtensionDialog}
            cancelClicked={this.closeDialogExtension}
          />

          <div id="videoBoundary">
            <div id="bigVideoContainer">
              <div className="videoWrapper">
                {this.state.subscribers
                  .filter((sub, i) => {
                    if (this.state.mainVideo === undefined && i === 0)
                      return true;
                    else if (
                      sub.streamManager.stream.streamId === this.state.mainVideo
                    )
                      return true;
                    else return false;
                  })
                  .map((sub, i) => {
                    return (
                      <div
                        key={i}
                        className="OT_root OT_publisher custom-class"
                        id="remoteUsers"
                      >
                        <StreamComponent
                          user={sub}
                          streamId={sub.streamManager.stream.streamId}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div id="myVideoContainer">
              <div className="videoWrapper">
                {localUser !== undefined &&
                  localUser.getStreamManager() !== undefined && (
                    <div
                      className="OT_root OT_publisher custom-class"
                      id="localUser"
                    >
                      <StreamComponent user={localUser} />
                    </div>
                  )}
              </div>
            </div>
            <div id="myChatContainer">
              {localUser !== undefined &&
                localUser.getStreamManager() !== undefined && (
                  <div
                    className="OT_root OT_publisher custom-class"
                    style={chatDisplay}
                  >
                    <ChatComponent
                      user={localUser}
                      chatDisplay={this.state.chatDisplay}
                      close={this.toggleChat}
                      messageReceived={this.checkNotification}
                    />
                  </div>
                )}
            </div>
          </div>

          <Dialog
            open={open}
            onClose={this.handleDialogClose}
            PaperProps={{
              style: { borderRadius: '70px', textAlign: 'center' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                height: '300px',
                width: '600px',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: '100px',
              }}
            >
              <Typography fontWeight={700} fontSize={'1.6rem'}>
                수업이 종료되었습니다!
              </Typography>
              <Typography sx={{ mt: 1 }}>
                다음 수강생과 선생님을 위해 리뷰를 남겨주세요!
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  component="label"
                  size="large"
                  onClick={this.handleDialogClose}
                  sx={{ width: '50%', height: '3rem', borderRadius: '1.5rem' }}
                >
                  <img
                    src={PencilPath}
                    style={{
                      position: 'absolute',
                      width: '20px',
                      left: '18%',
                    }}
                  />
                  <Typography fontWeight={700} fontSize={'1.05rem'}>
                    리뷰 남기기
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Dialog>

          {/* <div id='layout' className='bounds'>
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div
                className='OT_root OT_publisher custom-class'
                style={chatDisplay}
              >
                
              </div>
            )}
        </div> */}
        </div>
      </>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  // 별도의 서버없이 로컬에서 Openvidu 서버만으로 테스트하는 경우 사용하는 코드
  // 세션 관리 불가
  // TODO 테스트 끝나면 아래 전부 주석처리 하기
  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId),
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                this.OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(
                this.OPENVIDU_SERVER_URL + '/accept-certificate',
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          this.OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(withRouter(VideoRoomComponent));
