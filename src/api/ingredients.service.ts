import instanceAxios from "../helpers/axiosHelper";
import { IngredientResponseI } from "../interfaces/ingredients";

export const getAllIngredientsService = async () => {
  const { data } = await instanceAxios.get<IngredientResponseI>("/ingredients");
  return data;
};
