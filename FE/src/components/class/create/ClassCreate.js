import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container, Grid, styled, Typography, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

import "./ClassCreate.css";

const labels = {
  1: "기초",
  2: "초급",
  3: "중급",
  4: "고급",
  5: "전문가",
};

const marks = [
  {
    value: 0,
    label: "무료",
  },
  {
    value: 100000,
    label: "100000",
  },
];

const CustomSlider = styled(Slider)({
  color: "#DF7861",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 10,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#DF7861",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function ClassCreate() {
  const color = "#DF7861";
  const date = new Date();
  const timeNow =
    date.toLocaleDateString("en-us") + " " + date.toLocaleTimeString("en-us");

  const [category, setCategory] = useState(10);
  const [title, setTitle] = useState("입력");
  const [rating, setRating] = useState(2);
  const [hover, setHover] = useState(-1);
  const [dateTime, setDateTime] = useState(date);
  const [cost, setCost] = useState(0);
  const [number, setNumber] = useState(2);
  const [content, setContent] = useState("삐용삐용");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleDateTime = (newValue) => {
    console.log(newValue);
    setDateTime(newValue);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const resetState = () => {
    setCategory(10);
    setTitle("초기값");
    setRating(2);
    setHover(-1);
    setDateTime(timeNow);
    setCost(0);
    setNumber(2);
    setContent("삐용삐용");
  };

  const validData = () => {
    if (title !== "" && dateTime !== timeNow && content !== "") {
      alert("클래스 등록!");
    } else {
      alert("모든 내용을 작성해주세요!");
    }
  };

  return (
    <Box id='createBlock' sx={{ flexGrow: 1 }}>
      <br></br>
      <Grid container>
        <Grid item sx={{ mr: 6 }}>
          <Typography>카테고리 선택</Typography>
        </Grid>
        <Grid item sx={{}}>
          <FormControl
            fullWidth
            color='secondary'
            sx={{ display: "inline-block" }}
          >
            <Select
              value={category}
              onChange={handleCategoryChange}
              size='small'
              sx={{ width: "120px" }}
            >
              <MenuItem value={1}>가죽 공예</MenuItem>
              <MenuItem value={2}>비즈 공예</MenuItem>
              <MenuItem value={3}>뜨개질</MenuItem>
              <MenuItem value={4}>펠트</MenuItem>
              <MenuItem value={5}>라탄 공예</MenuItem>
              <MenuItem value={6}>인형 공예</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br></br>
      <Grid container columnSpacing={6}>
        <Grid item xs={12} md={8}>
          <TextField
            value={title}
            margin='dense'
            size='small'
            label='제목'
            variant='outlined'
            color='secondary'
            focused
            sx={{ width: "90%" }}
            onChange={handleTitleChange}
          ></TextField>
        </Grid>
        <Grid item sx={{ width: "250px" }}>
          <Stack spacing={1}>
            난이도
            <Box sx={{ display: "flex" }}>
              <Rating
                name='hover-feedback'
                value={rating}
                precision={1}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {rating !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover !== -1 ? hover : rating]}
                </Box>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <br></br>
      <Grid container columnSpacing={6}>
        <Grid item xs={6} md>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              value={dateTime}
              onChange={handleDateTime}
              label='클래스 일정 선택'
              minDate={date}
              inputFormat='yyyy/MM/dd hh:mm aa'
              mask='____/__/__ __:__ __'
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin='dense'
                  // type='datetime-local'
                  sx={{
                    svg: { color },
                    input: { color },
                    label: { color },
                  }}
                />
              )}
              sx={{
                "& input": { color: "red" },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} md>
          <Typography>클래스 대표 사진</Typography>
          <Button color='secondary' variant='contained' component='label'>
            사진 업로드
            <IconButton
              color='primary'
              component='label'
              sx={{ ml: 1, py: 0.5, px: 0.5 }}
            >
              <input hidden accept='image/*' multiple type='file' />
              <PhotoCamera />
            </IconButton>
            <input hidden accept='image/*' multiple type='file' />
          </Button>
        </Grid>
        <Grid item xs={6} md>
          <Typography>수강료 : {cost} 원</Typography>
          <CustomSlider
            value={cost}
            valueLabelDisplay='auto'
            color='secondary'
            step={1000}
            min={0}
            max={100000}
            marks={marks}
            onChange={handleCostChange}
          />
        </Grid>
        <Grid item xs={6} md>
          <Typography>인원 : {number} 명</Typography>
          <CustomSlider
            value={number}
            valueLabelDisplay='auto'
            color='secondary'
            step={1}
            min={2}
            max={8}
            onChange={handleNumberChange}
          />
        </Grid>
      </Grid>
      <br></br>
      <TextField
        label='내용'
        color='grey'
        multiline
        focused
        minRows={6}
        value={content}
        onChange={handleContentChange}
        sx={{ width: "100%" }}
      />
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          color='secondary'
          variant='contained'
          component='label'
          sx={{ mr: 3 }}
          onClick={validData}
        >
          등록
        </Button>
        <Button
          color='grey'
          variant='contained'
          component='label'
          onClick={resetState}
        >
          취소
        </Button>
      </Box>
    </Box>
  );
}

export default ClassCreate;
