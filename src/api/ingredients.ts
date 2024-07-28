import instanceAxios from "../helpers/axiosHelper";

export const getAllIngredientsService = async () => {
  const { data } = await instanceAxios.get("/ingredients");
  return data;
};
