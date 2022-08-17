import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ChattingList from '../../components/chatting/ChattingList';
import ChattingRequestList from '../../components/chatting/ChattingRequestList';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { getWebsocket } from '../../components/chatting/websocket';

export default function Chatting(props) {
  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const ws = getWebsocket();
  const userId = useSelector((state) => state.userInfo.user.id);
  const chatRoomId = 1;

  const CHAT_TYPE = {
    ENTER: 'ENTER',
    TALK: 'TALK',
    OUT: 'OUT',
  };

  const [chatRoom, setChatRoom] = useState({});
  const [messages, setMessages] = useState([]);
  // 메세지, 받는사람, 보낸사람, chatroomid
  function sendMessage(type, message = '') {
    const msg = {
      message: message,
      receiver: '2387129405',
      sender: userId,
      chatRoomId: chatRoomId,
    };
    console.log(msg);
    ws.send('/pub/message', {}, JSON.stringify(msg));
  }

  function receiveMessage(response) {
    const recv = JSON.parse(response.body);
    setMessages((messages) => [recv, ...messages]);
  }

  function chatRoomSuccess(response) {
    setChatRoom(response.data);
  }
  function chatRoomFail(response) {}

  function chatLogSuccess(response) {
    setMessages(response.data);
  }
  function chatLogFail(response) {}

  function connectSuccess(frame) {
    ws.subscribe(`/topic/chat/room/${chatRoomId}`, receiveMessage);
    sendMessage(CHAT_TYPE.ENTER, '');
    chatRoom(chatRoomId, chatRoomSuccess, chatRoomFail);
    // chatLog(chatId, chatLogSuccess, chatLogFail);
  }

  function connectFail(error) {}

  function connect() {
    if (!ws.active) {
      ws.connect({}, connectSuccess, connectFail);
    }
  }

  return (
    <>
      <Box
        sx={{
          p: 1,
          display: 'flex',
          borderRadius: '15px',
          //   alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          mt: 3,
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ flex: '70%' }}>
          <ChattingList messages={messages} sendMessage={sendMessage} />
        </Box>
        <Box
          sx={{
            flex: '30%',
            textAlign: 'center',
            marginLeft: 3,
            display: 'grid',
          }}
        >
          <ChattingRequestList />
          <Button
            variant="contained"
            color="secondary"
            sx={{ my: 1, mt: 3, borderRadius: '50px', padding: 1.5 }}
          >
            + 클래스 개설
          </Button>
          <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            color="secondary"
            sx={{ display: 'grid' }}
          >
            <ToggleButton
              value="500"
              variant="outlined"
              color="secondary"
              onChange={handleFormat}
              sx={{ my: 1, mt: 1, borderRadius: '50px' }}
            >
              수강생이 동의하면 클래스를 개설할 수 있습니다.
              {/* 클래스 개설에 동의하면 클릭 해주세요! */}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </>
  );
}
