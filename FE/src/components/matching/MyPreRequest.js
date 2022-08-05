import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "./MyPreRequest.css";
import { Typography } from "@mui/material";
import { useState } from "react";

function MyPreRequest() {
  const [data, setData] = useState([
    {
      category: "가죽공예1",
      desc: "가죽으로 DB를 만들고 싶어요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
      date: "2022.07.23",
    },
    {
      category: "가죽공예2",
      desc: "가죽으로 DB를 만들고 싶어요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
      date: "2022.07.23",
    },
    {
      category: "가죽공예3",
      desc: "가죽으로 DB를 만들고 싶어요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
      date: "2022.07.23",
    },
  ]);

  return (
    <>
      <Typography className='miniTitle' sx={{ mt: 3 }}>
        나의 이전 요청
      </Typography>
      <Grid container>
        {data.map((item, i) => {
          return (
            <Grid item xs sm={6} lg={4}>
              <Box
                className='myPreMatchingBox'
                style={{ whiteSpace: "nowrap" }}
              >
                <Box
                  className='myPreMatching'
                  component='div'
                  sx={{ textOverflow: "ellipsis" }}
                >
                  {item.category}
                </Box>
                <Box
                  className='myPreMatching'
                  component='div'
                  sx={{ textOverflow: "ellipsis" }}
                >
                  {item.desc}
                </Box>
                <Box
                  className='myPreMatching'
                  component='div'
                  sx={{ textOverflow: "ellipsis" }}
                >
                  요청일 : {item.date}
                </Box>
                <Button variant='contained' color='secondary'>
                  <Typography fontWeight={700} fontSize={"0.9rem"}>
                    요청 자세히 보기
                  </Typography>
                </Button>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default MyPreRequest;
