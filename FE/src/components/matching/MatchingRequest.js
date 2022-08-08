import * as React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import "./MatchingRequest.css";

function MatchingRequest() {
  const [value, setValue] = React.useState("카테고리1");
  const [categoryArr, setCategoryArr] = React.useState([
    "카테고리1",
    "카테고리2",
    "카테고리3",
    "카테고리4",
    "카테고리5",
  ]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Typography className='miniTitle' sx={{ mt: 3 }}>
        매칭 요청하기
      </Typography>

      <Grid className='matchingContainer' sx={{ mt: 3 }}>
        <Grid item xs>
          <Box className='matchingItem'>
            <Typography lineHeight={2}>
              어떤 종류의 수업을 듣고 싶으신가요? 카테고리를 선택하세요!
            </Typography>

            <FormControl className='matchingRadioBox'>
              <FormLabel></FormLabel>
              <RadioGroup
                className='matchingRadio'
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={value}
                onChange={handleChange}
                row
              >
                {categoryArr.map((category, i) => {
                  return (
                    <FormControlLabel
                      className='matchingRadioBtn'
                      value={category}
                      control={<Radio color='secondary' />}
                      label={category}
                      key={i}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>

            <div className='matchingBtnBox'>
              <Button variant='text' sx={{ color: "black" }}>
                ⇽ 이전
              </Button>
              <Button variant='contained' color='secondary'>
                다음 ⇾
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default MatchingRequest;
