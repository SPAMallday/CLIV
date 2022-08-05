import React from "react";
import ClassDetailInfo from "../../components/class/detail/ClassDetailInfo";
import ClassDetailItem from "../../components/class/detail/ClassDetailItem";
import QnaItem from "../../components/qna/QnaItem";
import MyCalendar from "../../components/mycalendar/MyCalendar";
import Box from "@mui/material/Box";
import { Grid, Stack, Typography } from "@mui/material";

const ClassDetail = () => {
  return (
    <Box sx={{ mt: 8, pb: 6 }}>
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12} md sx={{ mr: { xs: 0, md: 4 }, mb: 4 }}>
          <Stack spacing={4}>
            <ClassDetailItem />
            <Box>
              <Typography fontWeight={800} fontSize={"1.4rem"}>
                Q&A
              </Typography>
              <br />
              <QnaItem />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={6}>
            <ClassDetailInfo />
            <MyCalendar />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClassDetail;
