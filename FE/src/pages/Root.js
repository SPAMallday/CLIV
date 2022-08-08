import React from "react";
import App from "../App";
// import { Provider } from "react-redux";
// import store from "store/configure";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from '@mui/styled-engine';      // styled-components 를 이용하기 위함.

const Root = () => {
  return (
    // <Provider store={store}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </BrowserRouter>
    // </Provider>
  );
};

export default Root;