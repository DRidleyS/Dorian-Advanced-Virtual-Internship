import { configureStore } from "@reduxjs/toolkit";
import ui from "./uiSlice";
import auth from "./authSlice";

export const store = configureStore({ reducer: { ui, auth } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
