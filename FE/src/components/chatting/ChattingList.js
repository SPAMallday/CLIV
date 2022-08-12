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

import EnterBtnPath from '../../assets/EnterBtn.png';

const ChattingList = () => {
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

            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="아 그건 좀 어려울 꺼 같아요 ㅠㅠㅠ"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="4">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="아 그래요?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="10:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="5">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="원래 가죽으로 DB 못 만들어요!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="11:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="4">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="아 그래요?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="10:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="5">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="원래 가죽으로 DB 못 만들어요!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="11:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="4">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="아 그래요?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="10:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="5">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="원래 가죽으로 DB 못 만들어요!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="11:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="4">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="아 그래요?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="10:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="5">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="원래 가죽으로 DB 못 만들어요!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="11:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="4">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="아 그래요?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="10:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>

            <ListItem key="5">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="원래 가죽으로 DB 못 만들어요!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="11:30"></ListItemText>
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
              <TextField id="standard-basic" variant="standard" fullWidth />
            </Grid>

            <Grid xs={1} align="right">
              <Button disableRipple>
                <img src={EnterBtnPath} style={{ width: '35px' }}></img>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ChattingList;
