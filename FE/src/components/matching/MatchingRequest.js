import * as React from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import './MatchingRequest.css';

function MatchingRequest() {
  const [value, setValue] = React.useState('카테고리1');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <div className='matchingTitle'>매칭 요청하기</div>

      <Grid className='matchingContainer'>
        <Grid item xs>
          <Box className='matchingItem'>
            <div>어떤 종류의 수업을 듣고 싶으신가요? 카테고리를 선택하세요!</div>

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
                <FormControlLabel
                  className='matchingRadioBtn'
                  value='카테고리1'
                  control={<Radio />}
                  label='카테고리1'
                />
                <FormControlLabel
                  className='matchingRadioBtn'
                  value='카테고리2'
                  control={<Radio />}
                  label='카테고리2'
                />
                <FormControlLabel
                  className='matchingRadioBtn'
                  value='카테고리3'
                  control={<Radio />}
                  label='카테고리3'
                />
                <FormControlLabel
                  className='matchingRadioBtn'
                  value='카테고리4'
                  control={<Radio />}
                  label='카테고리4'
                />
                <FormControlLabel
                  className='matchingRadioBtn'
                  value='카테고리5'
                  control={<Radio />}
                  label='카테고리5'
                />
              </RadioGroup>
            </FormControl>

            <div className='matchingBtnBox'>
              <Button variant='text'>⇽ 이전</Button>
              <Button variant='contained'>다음 ⇾</Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default MatchingRequest;
