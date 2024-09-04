import { UnitI } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UnitState {
  units: UnitI[];
  isLoading: boolean;
}

const initialState: UnitState = {
  units: [],
  isLoading: false,
};

const unitsSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    fetchUnitPending: (state) => {
      state.isLoading = true;
    },
    fetchUnitFulFilled: (state, action: PayloadAction<UnitState>) => {
      state.isLoading = false;
      state.units = action.payload.units;
    },
  },
});

export const { fetchUnitPending, fetchUnitFulFilled } = unitsSlice.actions;

export default unitsSlice.reducer;
