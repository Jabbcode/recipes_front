import { AppDispatch } from "@/store";
import { fetchRecipeFulFilled, fetchRecipePending } from "./recipeSlice";
import { getAllRecipesService } from "@/api";
import { AxiosError } from "axios";

export const fetchRecipes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchRecipePending());

    const { recipes } = await getAllRecipesService({
      limit: "20",
      page: "1",
    });

    dispatch(
      fetchRecipeFulFilled({
        recipes,
        isLoading: false,
      })
    );
  } catch (error) {
    if (error instanceof AxiosError) console.error(error.message);
    else console.error(error);
  }
};
