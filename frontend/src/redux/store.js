import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import journalReducer from "./slices/journalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    journal: journalReducer,
  },
});
