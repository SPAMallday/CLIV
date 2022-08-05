import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography } from "@mui/material";

import "./ClassDetailInfo.css";

function ClassDetailInfo() {
  return (
    <Box>
      <Card>
        <CardContent>
          <img></img>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box>
            <Typography>가죽 공예</Typography>
            <Typography>수강 인원(2 / 4)</Typography>
          </Box>

          <Typography>가죽으로 DB만들기</Typography>
          <Typography>강의자 : 서윗찬국</Typography>
          <Typography>수강료 : 무료 </Typography>
          <Card>
            <CardContent>
              <Typography>난이도 : </Typography>
              <Typography>수강 인원(2 / 4)</Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ClassDetailInfo;
