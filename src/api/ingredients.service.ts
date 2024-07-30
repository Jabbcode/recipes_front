import instanceAxios from "../helpers/axiosHelper";
import { IngredientResponseI } from "../interfaces/ingredients";

export const getAllIngredientsService = async ({
  limit = "10",
  page = "1",
}: {
  limit: string;
  page: string;
}) => {
  const { data } = await instanceAxios.get<IngredientResponseI>(
    `/ingredients?limit=${limit}&page=${page}`
  );
  return data;
};
