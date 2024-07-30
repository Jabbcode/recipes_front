import instanceAxios from "../helpers/axiosHelper";
import { RecipeI, RecipeResponseI } from "../interfaces/recipes";

export const getAllRecipesService = async ({
  limit = "10",
  page = "1",
}: {
  limit: string;
  page: string;
}) => {
  const { data } = await instanceAxios.get<RecipeResponseI>(
    `/recipes?limit=${limit}&page=${page}`
  );
  return data;
};

export const getRecipeByIdService = async (id: string) => {
  const { data } = await instanceAxios.get<RecipeI>(`/recipes/${id}`);
  return data;
};

export const createRecipeService = async (form: RecipeI) => {
  const { data } = await instanceAxios.post("/recipes", form);
  return data;
};

export const updateRecipeService = async (form: RecipeI, id: string) => {
  const { data } = await instanceAxios.patch(`/recipes/${id}`, form);
  return data;
};

export const deleteRecipeService = async (id: string) => {
  const { data } = await instanceAxios.delete(`/recipes/${id}`);
  return data;
};
