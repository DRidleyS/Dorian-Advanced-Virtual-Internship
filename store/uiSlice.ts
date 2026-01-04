import { createSlice } from "@reduxjs/toolkit";

type UiState = { isAuthOpen: boolean };

const initialState: UiState = { isAuthOpen: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAuth(state) {
      state.isAuthOpen = true;
    },
    closeAuth(state) {
      state.isAuthOpen = false;
    },
    toggleAuth(state) {
      state.isAuthOpen = !state.isAuthOpen;
    },
  },
});

export const { openAuth, closeAuth, toggleAuth } = uiSlice.actions;
export default uiSlice.reducer;
