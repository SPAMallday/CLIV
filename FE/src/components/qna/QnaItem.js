import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Button, Paper, Stack, Grid } from "@mui/material";

import "./QnaItem.css";
import MarkPath from "../../assets/Teacher_mark.png";

function QnaContentItem(props) {
  const reply = props.reply;

  return (
    <React.Fragment>
      <Paper
        sx={{
          display: "flex",
          px: 2,
          py: 1,
          borderRadius: "25px",
          backgroundColor: reply ? "#EEEEEE" : "white",
          ml: reply ? 10 : 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <img
            style={{ width: "50px", borderRadius: "50%" }}
            src='https://item.kakaocdn.net/do/a1bfdf9838f7767f429015f6564cb234f43ad912ad8dd55b04db6a64cddaf76d'
          ></img>
        </Box>
        <Stack spacing={1}>
          <Grid container>
            <Grid item sx={{ mr: 3 }}>
              <Typography fontWeight={700}>
                새드지원
                {reply ? (
                  <img
                    src={MarkPath}
                    style={{ width: "0.9rem", marginLeft: "0.5rem" }}
                  />
                ) : null}
              </Typography>
            </Grid>
            <Grid item sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              {reply ? null : (
                <Typography color='gray' fontWeight={700} fontSize={"0.8rem"}>
                  강의명 : 가죽으로 DB 만들기 - 가죽으로 못 만드는게 없어요 [1달
                  완성 💥]
                </Typography>
              )}
            </Grid>
          </Grid>
          <Typography> Q&A 내용 </Typography>
          {props.teacherAuth ? (
            <Button color='secondary' sx={{ width: "fit-content" }}>
              답변 작성
            </Button>
          ) : null}
        </Stack>
      </Paper>
    </React.Fragment>
  );
}

function QnaItem(props) {
  // 답변이 있는 qna
  const hasReply = true;
  // 선생님으로 로그인한 상태
  const teacherAuth = true;

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <QnaContentItem teacherAuth={teacherAuth} />
      </Grid>
      <Grid item xs={12}>
        {
          hasReply ? (
            <Box sx={{ overflow: "visible", position: "relative" }}>
              <Box className='qnaReplyPiece'></Box>
              <QnaContentItem reply={hasReply} />
            </Box>
          ) : null // 답변이 없는 QNA라면 아무것도 렌더링하지 않음
        }
      </Grid>
    </Grid>
  );
}

export default QnaItem;
