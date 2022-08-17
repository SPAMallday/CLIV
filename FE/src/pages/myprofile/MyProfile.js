import Profile from '../../components/myprofile/Profile';
import MyReviewTabs from '../../components/myprofile/MyReviewTabs';
import Badge from '../../components/myprofile/Badge';
import { changeAuth } from '../../api/userAPI';

import './MyProfile.css';
import { Button } from '@mui/material';

function MyProfile() {
  const changeAuthHandler = (event) => {
    // event.preventDefault();

    changeAuth().then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="myprofile">
      <div className="upside">
        <div className="leftside">
          <Profile />
        </div>
        {/* <div className="rightside">
          <Badge />
        </div> */}
        <div className="rightside">
          <Button
            variant="contained"
            color="secondary"
            onClick={changeAuthHandler}
          >
            선생님 전환
          </Button>
        </div>
      </div>
      <MyReviewTabs />
    </div>
  );
}
export default MyProfile;
