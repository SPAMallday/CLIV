import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import StarRating from "../../starrating/StarRating";

import "./ClassDetailInfo.css";

const handleSubmitButton = (teacherAuth) => {
  // 선생님인 경우
  if (teacherAuth) {
    // 클래스 정보 수정
  }
  // 학생인 경우
  else {
    // 수강신청
  }
};

function ClassDetailInfo(props) {
  const [rating, setRating] = useState(3);

  const teacherAuth = true;

  return (
    <Box>
      <Card>
        <CardContent>
          <Box>
            <Typography>가죽 공예</Typography>
          </Box>

          <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
            가죽으로 DB만들기
          </Typography>
          <Typography
            sx={{
              fontWeight: "800",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            강의자 : 서윗찬국
          </Typography>
          <Typography
            sx={{
              fontWeight: "800",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            수강료 : 무료
          </Typography>
          <Card sx={{ my: 5 }}>
            <CardContent sx={{ pb: 1 }}>
              <Stack spacing={1}>
                <Box sx={{ display: "flex" }}>
                  난이도 :
                  <StarRating ratingValue={3} />
                </Box>
                <Typography>수강 인원(2 / 4)</Typography>
              </Stack>
            </CardContent>
          </Card>
          <Box sx={{ textAlign: "center" }}>
            <Button
              color='secondary'
              variant='contained'
              component='label'
              size='large'
              onClick={handleSubmitButton(teacherAuth)}
              sx={{ width: "50%", height: "3rem", borderRadius: "1.5rem" }}
            >
              <Typography fontWeight={700}>
                {teacherAuth ? "클래스 정보 수정" : "수강신청"}
              </Typography>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ClassDetailInfo;
