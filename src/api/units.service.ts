import instanceAxios from "../helpers/axiosHelper";
import { UnitI, UnitResponseI, UnitsResponseI } from "../interfaces";

export const getAllUnitsService = async ({
  limit = "10",
  page = "1",
}: {
  limit: string;
  page: string;
}) => {
  const { data } = await instanceAxios.get<UnitsResponseI>(
    `/units?limit=${limit}&page=${page}`
  );
  return data;
};

export const createUnitService = async (form: UnitI) => {
  const { data } = await instanceAxios.post<UnitResponseI>("/units", form);
  return data;
};

export const updateUnitService = async (id: string, unit: UnitI) => {
  const { data } = await instanceAxios.patch<UnitResponseI>(
    `/units/${id}`,
    unit
  );
  return data;
};

export const deleteUnitService = async (id: string) => {
  const { data } = await instanceAxios.delete<UnitResponseI>(`/units/${id}`);
  return data;
};
