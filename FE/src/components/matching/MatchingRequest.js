import * as React from 'react';
import { useState, useEffect } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Stack, TextField, Typography } from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import { cateList, matchingCreate } from '../../api/matchingAPI';

import './MatchingRequest.css';
import { useSelector } from 'react-redux';

const steps = ['카테고리 선택', '제목', '원하는 시간', '성별', '내용'];

function MatchingRequest() {
  const color = '#DF7861';
  const date = new Date();

  const [value, setValue] = useState(0);

  const [categoryArr, setCategoryArr] = useState([]);
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState(date);
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const handleDateTime = (newValue) => {
    setDateTime(newValue);
  };

  const handletextRvChange = (event) => {
    // event.preventDefault();
    setContent(event.target.value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  useEffect(() => {
    cateList().then((res) => {
      setCategoryArr(res);
    });
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // 등록
  const validData = () => {
    sendCreate();
    window.location.reload();
  };

  const userId = useSelector((state) => state.userInfo.user.id);

  const sendCreate = async () => {
    const myData = {
      authId: userId,
      title: title,
      wantedDay: dateTime.toLocaleString(),
      teacherGender: 'X',
      content: content,
      matStatus: false,
      categoryId: value,
    };
    // console.log(myData);

    matchingCreate(myData).then((res) => {
      handleOpenSuccess();
    });
    // try {
    //   const response = await matchingCreate(myData);
    //   if (response.status === '201') {
    //     handleOpenSuccess();
    //     console.log(response);
    //   }
    // } catch (error) {
    //   handleOpenFail();
    //   console.log('erre');
    // }
  };

  const handleOpenSuccess = () => {
    setSuccess(true);
  };

  const handleOpenFail = () => {
    setFail(true);
  };

  return (
    <>
      <Typography className="miniTitle" sx={{ mt: 3 }}>
        매칭 요청하기
      </Typography>

      <Box sx={{ width: '100%', mt: 3 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ mt: 2, mb: 1 }}>
              {activeStep === 0 && (
                <Box className="matchingContainer">
                  <div sx={{ width: '100%' }}>
                    어떤 종류의 수업을 듣고 싶으신가요?
                  </div>

                  <FormControl className="matchingRadioBox">
                    <RadioGroup
                      className="matchingRadio"
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                      row
                    >
                      {categoryArr.map((category) => (
                        <FormControlLabel
                          className="matchingRadioBtn"
                          value={category.id}
                          control={<Radio color="secondary" />}
                          label={category.content}
                          key={category.id}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}
              {activeStep === 1 && (
                <Box className="matchingContainer">
                  <TextField
                    // value={title}
                    onChange={handleTitle}
                    margin="dense"
                    size="small"
                    label="매칭 요청 제목"
                    variant="outlined"
                    color="secondary"
                    focused
                    sx={{ width: '100%' }}
                  ></TextField>
                </Box>
              )}
              {activeStep === 2 && (
                <Box className="matchingContainer">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDateTimePicker
                      value={dateTime}
                      onChange={handleDateTime}
                      label="원하는 시간 선택"
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
                </Box>
              )}
              {activeStep === 3 && (
                <Box className="matchingContainer">
                  <div sx={{ width: '100%' }}>강사님의 성별을 골라 주세요!</div>

                  <FormControl className="matchingRadioBox">
                    <RadioGroup
                      className="matchingRadio"
                      name="radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel
                        value="F"
                        control={<Radio />}
                        label="여자"
                      />
                      <FormControlLabel
                        value="M"
                        control={<Radio />}
                        label="남자"
                      />
                      <FormControlLabel
                        value="X"
                        control={<Radio />}
                        label="무관"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}
              {activeStep === 4 && (
                <Box>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': {
                        p: 2,
                        width: '100%',
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        multiline
                        rows={10}
                        color="secondary"
                        onChange={handletextRvChange}
                      />
                    </div>
                  </Box>
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {activeStep !== 0 && (
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
              )}
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep !== steps.length - 1 && (
                <Button color="secondary" onClick={handleNext}>
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button color="secondary" onClick={validData}>
                  요청
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}

export default MatchingRequest;
