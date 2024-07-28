import instanceAxios from "../helpers/axiosHelper";

export const getAllUnitsService = async () => {
  const { data } = await instanceAxios.get("/units");
  return data;
};
