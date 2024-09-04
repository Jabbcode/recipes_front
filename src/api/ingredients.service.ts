import instanceAxios from "../helpers/axiosHelper";
import {
  IngredientI,
  IngredientResponseI,
  IngredientsResponseI,
} from "../interfaces/ingredients";

export const getAllIngredientsService = async ({
  limit = "10",
  page = "1",
}: {
  limit: string;
  page: string;
}) => {
  const { data } = await instanceAxios.get<IngredientsResponseI>(
    `/ingredients?limit=${limit}&page=${page}`
  );
  return data;
};

export const createIngredientService = async (form: IngredientI) => {
  const { data } = await instanceAxios.post<IngredientResponseI>(
    "/ingredients",
    form
  );
  return data;
};

export const deleteIngredientService = async (id: string) => {
  const { data } = await instanceAxios.delete<IngredientResponseI>(
    `/ingredients/${id}`
  );
  return data;
};
