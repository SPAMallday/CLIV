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

const steps = ['카테고리 선택', '제목', '원하는 시간', '내용'];

function MatchingRequest() {
  const color = '#DF7861';
  const date = new Date();

  const [value, setValue] = React.useState('');

  const [categoryArr, setCategoryArr] = useState([]);
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState(date);
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const handleDateTime = (newValue) => {
    console.log(newValue);
    setDateTime(newValue);
  };

  const handletextRvChange = (event) => {
    // event.preventDefault();
    setValue(event.target.value.tostr);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log('event' + event.target.value);
  };

  useEffect(() => {
    cateList().then((res) => {
      setCategoryArr(res);

      console.log(res);
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
  };

  const userNickName = useSelector((state) => state.userInfo.user.nickname);

  const sendCreate = async () => {
    let myData = {
      userNickName: userNickName,
      categoryId: categoryArr,
      matchingTitle: title,
      content: content,
      classDatetime: dateTime.toLocaleString(),
    };

    console.log(myData);

    try {
      const response = await matchingCreate.post('/api/matching', myData);
      if (response.status === '201') {
        handleOpenSuccess();
      }
    } catch (error) {
      handleOpenFail();
    }
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
            <Typography sx={{ mt: 2, mb: 1 }}>
              매칭 요청이 완료되었습니다.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {activeStep === 0 && (
                <Box className="matchingItem">
                  <Typography lineHeight={2}>
                    어떤 종류의 수업을 듣고 싶으신가요?
                  </Typography>

                  <FormControl className="matchingRadioBox">
                    <FormLabel></FormLabel>
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
                <Box className="matchingItem">
                  <Typography fontWeight={700}>
                    <TextField
                      value={title}
                      margin="dense"
                      size="small"
                      label="매칭 요청 제목"
                      variant="outlined"
                      color="secondary"
                      focused
                      sx={{ width: '100%' }}
                    ></TextField>
                  </Typography>
                </Box>
              )}
              {activeStep === 2 && (
                <Box className="matchingItem">
                  <Typography>
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
                  </Typography>
                </Box>
              )}
              {activeStep === 3 && (
                <Typography>
                  {' '}
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
                </Typography>
              )}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep !== steps.length - 1 && (
                <Button onClick={handleNext}>'Next'</Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button onClick={validData}>'제출'</Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}

export default MatchingRequest;
