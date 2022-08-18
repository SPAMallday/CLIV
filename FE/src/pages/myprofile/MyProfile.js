import Profile from '../../components/myprofile/Profile';
import MyReviewTabs from '../../components/myprofile/MyReviewTabs';
import Badge from '../../components/myprofile/Badge';
import { changeAuth } from '../../api/userAPI';

import './MyProfile.css';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { cateList } from '../../api/matchingAPI';

function MyProfile() {
  const role = useSelector((state) => state.userInfo.user.role);

  let inputOptions = {};

  useEffect(() => {
    cateList().then((res) => {
      res.map((item, i) => {
        inputOptions[item.id] = item.content;
      });
    });
  }, []);

  const changeAuthHandler = (event) => {
    // event.preventDefault();

    const { id: category } = Swal.fire({
      width: 'fit-content',
      text: '선생님이 되고 싶은 분야를 선택해주세요', // Alert 제목
      icon: 'question', // Alert 타입
      input: 'radio',
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '신청',
      confirmButtonColor: '#FF7E67',
      showLoaderOnConfirm: true,
      inputOptions: inputOptions,
      inputValidator: (id) => {
        if (!id) {
          return '하나의 분야를 선택해주세요!';
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(() => {
      changeAuth().then((res) => {
        console.log(res);
      });
    });
  };
  return (
    <div className="myprofile">
      <div className="upside">
        <div className="leftside">
          <Profile />
        </div>
        <div className="rightside">
          {/* // TODO 선생님이면 안보이게 */}
          {/* {role === 'TEACHER' ? null : ()} */}
          <Button
            variant="contained"
            color="secondary"
            onClick={changeAuthHandler}
            sx={{ borderRadius: '20px' }}
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
