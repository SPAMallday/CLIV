import * as React from "react";
import Button from "@mui/material/Button";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Video from "./Components/Video/Video";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Link to='/'>
          <Button>Main</Button>
        </Link>
        <Routes>
          <Route
            path='/'
            element={
              <Link to='/video'>
                <Button variant='contained'>Show Video</Button>
              </Link>
            }
          ></Route>
          <Route path='/video/*' element={<Video />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
