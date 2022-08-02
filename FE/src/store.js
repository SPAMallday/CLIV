import { configureStore } from "@reduxjs/toolkit";
import videoClassReducer from "./modules/VideoClassModule";

export default configureStore({
  reducer: {
    videoClassReducer,
  },
});
