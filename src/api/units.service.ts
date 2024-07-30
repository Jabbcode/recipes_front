import instanceAxios from "../helpers/axiosHelper";
import { UnitResponseI } from "../interfaces/unit";

export const getAllUnitsService = async ({
  limit = "10",
  page = "1",
}: {
  limit: string;
  page: string;
}) => {
  const { data } = await instanceAxios.get<UnitResponseI>(
    `/units?limit=${limit}&page=${page}`
  );
  return data;
};
