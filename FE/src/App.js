import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import MyProfile from './pages/MyProfile';

import './App.css';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/myprofile' element={<MyProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
