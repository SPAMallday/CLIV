import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Grid,
  styled,
  Typography,
  IconButton,
  Alert,
  Backdrop,
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Swal from 'sweetalert2';

import { apiClient } from '../../../api';

import './ClassCreate.css';
import { useNavigate } from 'react-router-dom';

const editorConfiguration = {
  simpleUpload: {
    // 로컬기준 통신 경로
    uploadUrl: process.env.REACT_APP_BASE_URL + '/api/image/upload',
    // 쿠키를 헤더에 포함시켜서 보내고 싶다면 사용
    // withCredentials: true,
    // Headers sent along with the XMLHttpRequest to the upload server.
    // headers: {
    //   'X-CSRF-TOKEN': 'CSRF-Token',
    //   Authorization: 'Bearer <JSON Web Token>',
    // },
  },
};

const labels = {
  1: '기초',
  2: '초급',
  3: '중급',
  4: '고급',
  5: '전문가',
};

const marks = [
  {
    value: 0,
    label: '무료',
  },
  {
    value: 100000,
    label: '100000',
  },
];

const CustomSlider = styled(Slider)({
  color: '#DF7861',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 10,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#DF7861',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
  '& .MuiSlider-markLabel': {
    fontSize: '0.8rem',
  },
});

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function ClassCreate() {
  const navigate = useNavigate();

  const color = '#DF7861';
  const date = new Date();
  const timeNow =
    date.toLocaleDateString('en-us') + ' ' + date.toLocaleTimeString('en-us');

  const [category, setCategory] = useState(1);
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(2);
  const [hover, setHover] = useState(-1);
  const [dateTime, setDateTime] = useState(date);
  const [uploadImage, setUploadImage] = useState(null);
  const [cost, setCost] = useState(0);
  const [number, setNumber] = useState(2);
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

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

  const handleOpenSuccess = () => {
    setSuccess(true);
    Swal.fire({
      title: '클래스 생성 완료!', // Alert 제목
      text: '예정된 클래스로 이동합니다',
      icon: 'success', // Alert 타입
    }).then(() => {
      navigate('/classmanage/reserve');
    });
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  const handleOpenFail = () => {
    setFail(true);
  };

  const handleCloseFail = () => {
    setFail(false);
  };

  const resetState = () => {
    setCategory(1);
    setTitle('');
    setRating(2);
    setHover(-1);
    setDateTime(timeNow);
    setUploadImage(null);
    setCost(0);
    setNumber(2);
    setContent('');
  };

  // 등록 버튼 눌렀을 때 검사
  const validData = () => {
    if (
      title !== '' &&
      dateTime !== timeNow &&
      content !== '' &&
      !uploadImage
    ) {
      sendCreate();
    } else {
      Swal.fire({
        title: '잠깐!', // Alert 제목
        text: '대표 사진을 선택하고,\n 모든 내용을 작성해주세요', // Alert 내용
        icon: 'info', // Alert 타입
      });
    }
  };

  // 이미지 용량 검사
  const imageCheck = (event) => {
    console.log(event.target.files[0]);
    const imgSize = event.target.files[0].size;

    const maxSize = 5 * 1024 * 1024; //5MB

    if (imgSize > maxSize) {
      Swal.fire({
        title: '클래스 대표 사진은 5MB 이하로 사용해주세요!', // Alert 제목
        text: '모든 내용을 작성해주세요', // Alert 내용
        icon: 'info', // Alert 타입
      });
      return;
    } else {
      setUploadImage(event.target.files[0]);
      Swal.fire({
        title: '사진 업로드 완료!', // Alert 제목
        icon: 'success', // Alert 타입
      });
    }
  };

  // 검사를 통과하면 데이터 통신을 수행
  //
  // 대표사진은 multipartfile로 따로?

  const sendCreate = async () => {
    let myData = {
      categoryId: category,
      className: title,
      headcount: number,
      price: cost,
      content: content,
      level: rating,
      classDatetime: dateTime.toLocaleString(),
    };
    // 전체 데이터 합쳐서 form으로
    const formData = new FormData();
    // 대표 이미지
    formData.append('thumbnail', uploadImage);
    // 나머지 데이터
    formData.append(
      'classInfoRequest',
      new Blob([JSON.stringify(myData)], { type: 'application/json' }),
    );

    try {
      const response = await apiClient.post('/api/class/create', formData);
      if (response.status === 201) {
        handleOpenSuccess();
      }
    } catch (error) {
      handleOpenFail();
    }
  };

  return (
    <Box id="createBlock" sx={{ flexGrow: 1 }}>
      <br></br>
      <Grid container>
        <Grid item sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
          <Typography>카테고리 선택</Typography>
        </Grid>
        <Grid item sx={{}}>
          <FormControl
            fullWidth
            color="secondary"
            sx={{ display: 'inline-block' }}
          >
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{ width: '120px' }}
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
            margin="dense"
            size="small"
            label="제목"
            variant="outlined"
            color="secondary"
            focused
            sx={{ width: '90%' }}
            onChange={handleTitleChange}
          ></TextField>
        </Grid>
        <Grid item sx={{ width: '250px' }}>
          <Stack spacing={1}>
            난이도
            <Box sx={{ display: 'flex' }}>
              <Rating
                name="hover-feedback"
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
        <Grid
          item
          xs={6}
          md
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              value={dateTime}
              onChange={handleDateTime}
              label="클래스 일정 선택"
              minDate={date}
              inputFormat="yyyy/MM/dd hh:mm aa"
              mask="____/__/__ __:__ __"
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  // type='datetime-local'
                  sx={{
                    svg: { color },
                    input: { color },
                    label: { color },
                  }}
                />
              )}
              sx={{
                '& input': { color: 'red' },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} md>
          <Typography fontSize={'0.8rem'}>클래스 대표 사진</Typography>
          <Button color="secondary" variant="contained" component="label">
            사진 업로드
            <IconButton
              color="primary"
              component="label"
              sx={{ ml: 1, py: 0.5, px: 0.5 }}
            >
              <input
                hidden
                accept="image/*"
                onChange={imageCheck}
                multiple
                type="file"
              />
              <PhotoCamera />
            </IconButton>
            <input
              hidden
              accept="image/*"
              onChange={imageCheck}
              multiple
              type="file"
            />
          </Button>
        </Grid>
        <Grid item xs={6} md>
          <Typography fontSize={'0.8rem'}>수강료 : {cost} 원</Typography>
          <CustomSlider
            value={cost}
            valueLabelDisplay="auto"
            color="secondary"
            step={1000}
            min={0}
            max={100000}
            marks={marks}
            onChange={handleCostChange}
          />
        </Grid>
        <Grid item xs={6} md>
          <Typography fontSize={'0.8rem'}>인원 : {number} 명</Typography>
          <CustomSlider
            value={number}
            valueLabelDisplay="auto"
            color="secondary"
            step={1}
            min={2}
            max={8}
            onChange={handleNumberChange}
          />
        </Grid>
      </Grid>
      <br></br>
      {/* <TextField
        label="내용"
        color="grey"
        multiline
        focused
        minRows={6}
        value={content}
        onChange={handleContentChange}
        sx={{ width: '100%' }}
      /> */}
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        data={content}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        onBlur={(event, editor) => {
          // 에디터 내부를 선택했다가 다른 곳을 클릭해서 나갈 때
          // 포커스가 풀리는 상황
          // console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          // 에디터 내부를 선택해서 포커스가 될 때 상황
          // console.log('Focus.', editor);
        }}
      />
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          color="secondary"
          variant="contained"
          component="label"
          sx={{ mr: 3 }}
          onClick={validData}
        >
          등록
        </Button>
        <Button
          color="grey"
          variant="contained"
          component="label"
          onClick={resetState}
        >
          취소
        </Button>
      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: 2 }}
        open={success || fail}
        onClick={() => {
          handleCloseFail();
          handleCloseSuccess();
        }}
      >
        {success === true ? (
          <Alert
            sx={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
            onClose={() => {
              handleCloseSuccess();
            }}
            severity="success"
          >
            클래스 생성이 완료되었습니다!
          </Alert>
        ) : null}
        {fail === true ? (
          <Alert
            sx={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
            onClose={() => {
              handleCloseFail();
            }}
            severity="error"
          >
            클래스 생성에 실패했습니다..
          </Alert>
        ) : null}
      </Backdrop>
    </Box>
  );
}

export default ClassCreate;
