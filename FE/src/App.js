import * as React from "react";
import Button from "@mui/material/Button";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import VideoClass from "./pages/VideoClass";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <div>
                <Link to='/'>
                  <Button>Main</Button>
                </Link>
                <Link to='/video'>
                  <Button variant='contained'>Show Video</Button>
                </Link>
              </div>
            }
          ></Route>
          <Route path='/video/*' element={<VideoClass />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
