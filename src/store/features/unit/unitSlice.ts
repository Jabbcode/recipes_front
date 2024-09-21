import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UnitI } from "@/interfaces";

export interface UnitState {
  units: UnitI[];
  total: number;
  pages: number;
  isLoading: boolean;
}

const initialState: UnitState = {
  units: [],
  total: 0,
  pages: 0,
  isLoading: false,
};

const unitsSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    fetchUnitPending: (state) => {
      state.isLoading = true;
    },
    fetchAllUnit: (state, action: PayloadAction<UnitState>) => {
      state.isLoading = false;
      state.units = action.payload.units;
      state.total = action.payload.total;
      state.pages = action.payload.pages;
    },
    addUnit: (state, action: PayloadAction<UnitI>) => {
      state.isLoading = false;
      state.units = [...state.units, action.payload];
    },
    editUnit: (state, action: PayloadAction<UnitI>) => {
      state.isLoading = false;
      state.units = state.units.map((unit) => {
        if (unit.id === action.payload.id) {
          unit = action.payload;
        }
        return unit;
      });
    },
    deleteUnit: (state, action: PayloadAction<string>) => {
      const targetIndex = state.units.findIndex(
        (unit) => unit.id === action.payload
      );
      state.units.splice(targetIndex, 1);
    },
  },
});

export const { fetchUnitPending, fetchAllUnit, addUnit, editUnit, deleteUnit } =
  unitsSlice.actions;

export default unitsSlice.reducer;
