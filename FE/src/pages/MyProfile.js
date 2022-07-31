import Profile from '../components/MyProfile/Profile';
import MyReview from '../components/MyProfile/MyReview';
import Badge from '../components/MyProfile/Badge';

import '../App.css';
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
