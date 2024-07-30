import instanceAxios from "../helpers/axiosHelper";
import { UnitResponseI } from "../interfaces/unit";

export const getAllUnitsService = async () => {
  const { data } = await instanceAxios.get<UnitResponseI>("/units");
  return data;
};
