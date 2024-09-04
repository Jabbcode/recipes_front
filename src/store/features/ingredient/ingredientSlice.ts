import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IngredientI } from "@/interfaces";

export interface IngredientState {
  ingredients: IngredientI[];
  isLoading: boolean;
}

const initialState: IngredientState = {
  ingredients: [],
  isLoading: false,
};

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    fetchIngredientPending: (state) => {
      state.isLoading = true;
    },
    fetchAllIngredients: (state, action: PayloadAction<IngredientState>) => {
      state.isLoading = false;
      state.ingredients = action.payload.ingredients;
    },
    addIngredient: (state, action: PayloadAction<IngredientState>) => {
      state.isLoading = false;
      state.ingredients = action.payload.ingredients;
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      const targetIndex = state.ingredients.findIndex(
        (ingredient) => ingredient._id === action.payload
      );

      state.ingredients.splice(targetIndex, 1);
    },
  },
});

export const {
  fetchIngredientPending,
  fetchAllIngredients,
  addIngredient,
  deleteIngredient,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
