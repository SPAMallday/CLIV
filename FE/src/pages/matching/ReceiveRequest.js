import RecRequest from '../../components/receiverequest/RecRequest';

import { Typography } from '@mui/material';

function ReceiveRequest() {
  return (
    <>
      <Typography className="miniTitle" sx={{ mt: 3 }}>
        받은 요청
      </Typography>
      <RecRequest />
    </>
  );
}

export default ReceiveRequest;
