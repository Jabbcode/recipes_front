import { AppDispatch } from "@/store";
import { fetchUnitFulFilled, fetchUnitPending } from "./unitSlice";
import { getAllUnitsService } from "@/api";
import { AxiosError } from "axios";

export const fetchUnits = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchUnitPending());

    const { units } = await getAllUnitsService({
      limit: "20",
      page: "1",
    });

    dispatch(
      fetchUnitFulFilled({
        units,
        isLoading: false,
      })
    );
  } catch (error) {
    if (error instanceof AxiosError) console.error(error.message);
    else console.error(error);
  }
};
