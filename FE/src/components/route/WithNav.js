import React from "react";
import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router";

export default () => {
  return (
    <>
      <NavBar />
      <div id='bodyContainer'>
        <Outlet />
      </div>
    </>
  );
};
