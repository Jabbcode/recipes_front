import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IngredientI } from "@/interfaces";

export interface IngredientState {
  ingredients: IngredientI[];
  total: number;
  pages: number;
  isLoading: boolean;
}

const initialState: IngredientState = {
  ingredients: [],
  total: 0,
  pages: 0,
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
      state.pages = action.payload.pages;
      state.total = action.payload.total;
    },
    addIngredient: (state, action: PayloadAction<IngredientI>) => {
      state.isLoading = false;
      state.ingredients = [...state.ingredients, action.payload];
    },
    editIngredient: (state, action: PayloadAction<IngredientI>) => {
      state.isLoading = false;
      state.ingredients = state.ingredients.map((ingredient) => {
        if (ingredient.id === action.payload.id) {
          ingredient.name = action.payload.name;
        }
        return ingredient;
      });
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      const targetIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload
      );

      state.ingredients.splice(targetIndex, 1);
    },
  },
});

export const {
  fetchIngredientPending,
  fetchAllIngredients,
  addIngredient,
  editIngredient,
  deleteIngredient,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
