import * as React from "react";
import { Routes, Route } from "react-router-dom";
import VideoClass from "./pages/VideoClass";
import { Main, KaKaoLogin, NotFound, ClassList, ClassDetail } from "./pages";
import NavBar from "./components/navbar/NavBar";
import MyProfile from "./pages/myprofile/MyProfile";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="bodyContainer">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/video/*" element={<VideoClass />}></Route>
          <Route path="/myprofile" element={<MyProfile />}></Route>
          <Route path="/kakao-login" element={<KaKaoLogin />}></Route>
          <Route path="/class/list" element={<ClassList />}></Route>
          <Route path="/class/detail/*" element={<ClassDetail />}></Route>
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="/*" element={<NotFound />}></Route>
          {/* <Route path="*" element={<NotFound />}></Route>  */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
