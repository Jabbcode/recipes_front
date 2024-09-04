import { AppDispatch } from "@/store";
import {
  fetchAllIngredients,
  fetchIngredientPending,
  addIngredient,
  deleteIngredient,
} from "./ingredientSlice";
import {
  createIngredientService,
  deleteIngredientService,
  getAllIngredientsService,
} from "@/api";
import { AxiosError } from "axios";
import { IngredientI } from "@/interfaces";
import { toast } from "sonner";

export const fetchAllIngredientsThunk = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchIngredientPending());

    const { ingredients } = await getAllIngredientsService({
      limit: "20",
      page: "1",
    });

    dispatch(
      fetchAllIngredients({
        ingredients,
        isLoading: false,
      })
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      toast(error.message);
    } else {
      console.error(error);
      toast(error as any);
    }
  }
};

export const addIngredientThunk =
  (data: IngredientI) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchIngredientPending());

      const { ingredient, message } = await createIngredientService(data);

      toast(message);

      dispatch(addIngredient(ingredient));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        toast(error.message);
      } else {
        console.error(error);
        toast(error as any);
      }
    }
  };

export const deleteIngredientThunk =
  (id: string) => async (dispath: AppDispatch) => {
    try {
      dispath(fetchIngredientPending());

      const { message } = await deleteIngredientService(id);
      toast(message);

      dispath(deleteIngredient(id));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        toast(error.message);
      } else {
        console.error(error);
        toast(error as any);
      }
    }
  };
