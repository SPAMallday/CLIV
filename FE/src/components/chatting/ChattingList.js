import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from '@mui/material';

import React, { useState } from 'react';

import EnterBtnPath from '../../assets/EnterBtn.png';

function ChattingList({ messages, sendMessage }) {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const CHAT_TYPE = {
    ENTER: 'ENTER',
    TALK: 'TALK',
    OUT: 'OUT',
  };

  const ERROR = {
    NO_MESSAGE: '메시지를 입력해주세요.',
  };

  function onInputChange(e) {
    setMessage(e.target.value);
  }

  function onClickSend() {
    if (message.length > 0) {
      sendMessage(CHAT_TYPE.TALK, message);
      setMessage('');
      setErrorMessage('');
    } else {
      setErrorMessage(ERROR.NO_MESSAGE);
    }
  }
  return (
    <>
      <Grid
        container
        component={Paper}
        sx={{ minHeight: '500px', maxHeight: '750px' }}
      >
        <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
          <List>
            <ListItem button key="블루레몬민주" sx={{ my: '2px' }}>
              <ListItemIcon>
                <Avatar
                  alt="블루레몬민주"
                  src="https://item.kakaocdn.net/do/a1bfdf9838f7767f429015f6564cb234f43ad912ad8dd55b04db6a64cddaf76d"
                />
              </ListItemIcon>
              <ListItemText primary="블루레몬민주">블루레몬민주</ListItemText>
            </ListItem>
            <Divider />
            <ListItem button key="레드성은">
              <ListItemIcon>
                <Avatar
                  alt="레드성은"
                  src="https://item.kakaocdn.net/do/a1bfdf9838f7767f429015f6564cb234f43ad912ad8dd55b04db6a64cddaf76d"
                />
              </ListItemIcon>
              <ListItemText primary="레드성은">레드성은</ListItemText>
            </ListItem>
            <Divider />
          </List>
        </Grid>

        <Grid item xs={9}>
          <List sx={{ maxHeight: '525px', overflow: 'auto' }}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="안녕하세요?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="안녕하세요! 저 가죽으로 DB를 만들고 싶은데요!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>

          <Divider />

          <Grid
            container
            style={{
              padding: '10px',
              paddingLeft: '25px',
              paddingRight: '25px',
            }}
          >
            <Grid item xs={11}>
              <TextField
                value={message}
                onChange={onInputChange}
                errorMessage={errorMessage}
                variant="standard"
                fullWidth
              />
            </Grid>

            <Grid xs={1} align="right">
              <Button disableRipple onClick={onClickSend}>
                <img src={EnterBtnPath} style={{ width: '35px' }}></img>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ChattingList;
