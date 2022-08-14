import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import VideoClass from './pages/VideoClass';
import {
  Main,
  KaKaoLogin,
  NotFound,
  ClassList,
  ClassDetail,
  ClassManage,
  Matching,
  MyClassHistory,
  ReceiveRequest,
  ClassReview,
} from './pages';
import MyProfile from './pages/myprofile/MyProfile';
import WithNav from './components/route/WithNav';
import WithoutNav from './components/route/WithoutNav';
import { Interceptor } from './api';
import ReserveClass from './components/class/reserve/ReserveClass';
import CloseClass from './components/class/close/CloseClass';
import ClassCreate from './components/class/create/ClassCreate';
import QnaItem from './components/qna/QnaItem';

function App() {
  return (
    <div className="App">
      <Interceptor>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/video/*" element={<VideoClass />} />
            <Route path="/kakao-login" element={<KaKaoLogin />} />
            {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
            <Route path="/*" element={<NotFound />} />
          </Route>

          <Route element={<WithNav />}>
            <Route path="/" element={<Main />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/class/list" element={<ClassList />} />
            <Route path="/class/detail/:classId" element={<ClassDetail />} />
            <Route path="/classmanage" element={<ClassManage />}>
              <Route index element={<ReserveClass />} />
              <Route path="reserve" element={<ReserveClass />} />
              <Route path="close" element={<CloseClass />} />
              <Route path="create" element={<ClassCreate />} />
              <Route path="qna" element={<QnaItem />} />
            </Route>
            <Route path="/matching" element={<Matching />}></Route>
            <Route path="/myhistory" element={<MyClassHistory />}></Route>
            <Route path="/classreview" element={<ClassReview />}></Route>
            <Route
              path="/matching/receiverequest"
              element={<ReceiveRequest />}
            ></Route>
          </Route>

          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Interceptor>
    </div>
  );
}

export default App;
