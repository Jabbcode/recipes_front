import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RecipeI } from "@/interfaces";

export interface RecipeState {
  recipes: RecipeI[];
  isLoading: boolean;
}

const initialState: RecipeState = {
  recipes: [],
  isLoading: false,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    fetchRecipePending: (state) => {
      state.isLoading = true;
    },
    fetchRecipeFulFilled: (state, action: PayloadAction<RecipeState>) => {
      (state.isLoading = false), (state.recipes = action.payload.recipes);
    },
  },
});

export const { fetchRecipePending, fetchRecipeFulFilled } = recipeSlice.actions;

export default recipeSlice.reducer;
