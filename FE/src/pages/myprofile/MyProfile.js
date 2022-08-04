import Profile from '../../components/myprofile/Profile';
import MyReview from '../../components/myprofile/MyReview';
import Badge from '../../components/myprofile/Badge';

import './MyProfile.css';

function MyProfile() {
  return (
    <div className='myprofile'>
      <div className='upside'>
        <div className='leftside'>
          <Profile />
        </div>
        <div className='rightside'>
          <Badge />
        </div>
      </div>
      <MyReview />
    </div>
  );
}
export default MyProfile;
