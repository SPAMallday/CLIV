import Profile from '../../components/myprofile/Profile';
import MyReviewTabs from '../../components/myprofile/MyReviewTabs';
import Badge from '../../components/myprofile/Badge';

import './MyProfile.css';
import { Button } from '@mui/material';

function MyProfile() {
  return (
    <div className="myprofile">
      <div className="upside">
        <div className="leftside">
          <Profile />
        </div>
        {/* <div className="rightside">
          <Badge />
        </div> */}
        <Button variant="contained" color="secondary">
          선생님 전환
        </Button>
      </div>
      <MyReviewTabs />
    </div>
  );
}
export default MyProfile;
