import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Paper } from '@mui/material';

import './Badge.css';

function Badge() {
  return (
    <Box>
      <Grid item sx={{ my: 2, width: '80px' }}>
        <Paper sx={{ borderRadius: '15px', height: '80px' }}>뱃지</Paper>
      </Grid>
      <Typography fontWeight={700}>뜨개질 : 28회</Typography>
    </Box>
  );
}

export default Badge;
