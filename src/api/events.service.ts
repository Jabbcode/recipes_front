import instanceAxios from "@/helpers/axiosHelper";

export const getEventsByFilters = async (filters: any) => {
  const { data } = await instanceAxios.post("/events/search", filters);
  return data;
};

export const createEventService = async (newEvent: any) => {
  const { data } = await instanceAxios.post("/events", newEvent);
  return data;
};
