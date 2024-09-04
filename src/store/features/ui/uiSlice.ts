import { createSlice } from "@reduxjs/toolkit";

interface UiState {}

const initialState: UiState = {};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
});

export const {} = uiSlice.actions;

export default uiSlice.reducer;
