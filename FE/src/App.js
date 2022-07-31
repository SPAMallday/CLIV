import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Main,
  Login,
  KaKaoLogin,
  NotFound,
  ClassList,
  ClassDetail,
} from './pages';
// import Login from './pages/login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/kakao-login" element={<KaKaoLogin />}></Route>
          <Route path="/class/list" element={<ClassList />}></Route>
          <Route path="/class/detail/*" element={<ClassDetail />}></Route>
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="/*" element={<NotFound />}></Route>
          {/* <Route path="*" element={<NotFound />}></Route>  */}
        </Routes>
      </div>
    );
  }
}

export default App;
