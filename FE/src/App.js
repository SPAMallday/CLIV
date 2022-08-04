import * as React from "react";
import { Routes, Route } from "react-router-dom";
import VideoClass from "./pages/VideoClass";
import {
  Main,
  KaKaoLogin,
  NotFound,
  ClassList,
  ClassDetail,
  ClassManage,
} from "./pages";
import MyProfile from "./pages/myprofile/MyProfile";
import WithNav from "./components/route/WithNav";
import WithoutNav from "./components/route/WithoutNav";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path='/video/*' element={<VideoClass />} />
          <Route path='/kakao-login' element={<KaKaoLogin />} />
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path='/*' element={<NotFound />} />
        </Route>

        <Route element={<WithNav />}>
          <Route path='/' element={<Main />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/class/list' element={<ClassList />} />
          <Route path='/class/detail/*' element={<ClassDetail />} />
          <Route path='/classmanage' element={<ClassManage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
