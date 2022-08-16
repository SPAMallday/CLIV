import ChattingList from '../../components/chatting/ChattingList';
import ChattingRequestList from '../../components/chatting/ChattingRequestList';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function Chatting(props) {
  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <>
      <Box
        sx={{
          p: 1,
          display: 'flex',
          borderRadius: '15px',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          mt: 3,
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ flex: '70%' }}>
          <ChattingList />
        </Box>
        <Box
          sx={{
            flex: '30%',
            textAlign: 'center',
            marginLeft: 3,
            display: 'grid',
          }}
        >
          <ChattingRequestList />
          <Button
            variant="contained"
            color="secondary"
            sx={{ my: 1, mt: 3, borderRadius: '50px', padding: 1.5 }}
          >
            + 클래스 개설
          </Button>
          <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            color="secondary"
            sx={{ display: 'grid' }}
          >
            <ToggleButton
              value="500"
              variant="outlined"
              color="secondary"
              onChange={handleFormat}
              sx={{ my: 1, mt: 1, borderRadius: '50px' }}
            >
              수강생이 동의하면 클래스를 개설할 수 있습니다.
              {/* 클래스 개설에 동의하면 클릭 해주세요! */}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </>
  );
}

