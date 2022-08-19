import Profile from '../../components/myprofile/Profile';
import MyReviewTabs from '../../components/myprofile/MyReviewTabs';

import './MyProfile.css';

function MyProfile() {
  // event.preventDefault();

  return (
    <div className="myprofile">
      <div className="upside">
        <div className="leftside">
          <Profile />
        </div>
      </div>
      <MyReviewTabs />
    </div>
  );
}
export default MyProfile;
