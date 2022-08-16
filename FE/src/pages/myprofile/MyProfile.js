import Profile from '../../components/myprofile/Profile';
import MyReviewTabs from '../../components/myprofile/MyReviewTabs';
import Badge from '../../components/myprofile/Badge';

import './MyProfile.css';

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
      </div>
      <MyReviewTabs />
    </div>
  );
}
export default MyProfile;
