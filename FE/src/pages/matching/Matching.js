import MatchingRequest from '../../components/matching/MatchingRequest';
import MyPreRequest from '../../components/matching/MyPreRequest';

import Grid from '@mui/material/Grid';

import './Matching.css';

function Matching() {
  return (
    <div>
      <div className='matchingRequest'>
        <MatchingRequest />
      </div>
      <Grid>
        <MyPreRequest />
      </Grid>
    </div>
  );
}

export default Matching;
