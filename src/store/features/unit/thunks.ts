import { AppDispatch } from "@/store";
import {
  addUnit,
  deleteUnit,
  editUnit,
  fetchAllUnit,
  fetchUnitPending,
} from "./unitSlice";
import {
  createUnitService,
  deleteUnitService,
  getAllUnitsService,
  updateUnitService,
} from "@/api";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { UnitI } from "@/interfaces";

export const fetchAllUnitsThunk =
  (pageActual: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchUnitPending());

      const { units, pages, total } = await getAllUnitsService({
        page: String(pageActual),
        limit: String(limit),
      });

      dispatch(
        fetchAllUnit({
          units,
          pages,
          total,
          isLoading: false,
        })
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        toast(error.message);
      } else {
        console.error(error);
        toast(error as any);
      }
    }
  };

export const addUnitThunk = (data: UnitI) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchUnitPending());

    toast.promise(createUnitService(data), {
      loading: "Loading...",
      success: ({ unit, message }) => {
        dispatch(addUnit(unit));
        return message;
      },
      error: "No se pudo agregar la unidad",
      position: "top-center",
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      toast.error(error.response?.data.message);
    } else {
      console.error(error);
      toast(error as any);
    }
  }
};

export const editUnitThunk =
  (id: string, unit: UnitI) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchUnitPending());

      toast.promise(updateUnitService(id, unit), {
        loading: "Loading...",
        success: ({ unit, message }) => {
          dispatch(editUnit(unit));
          return message;
        },
        error: "No se pudo actualizar la unidad",
        position: "top-center",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(error.response?.data.message);
      } else {
        console.error(error);
        toast.error(error as any);
      }
    }
  };

export const deleteUnitThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchUnitPending());

      toast("¿Esta seguro de borrar la unidad?", {
        cancel: {
          label: "Cancelar",
          onClick: () => {},
        },
        action: {
          label: "Borrar",
          onClick: async () => {
            const { message } = await deleteUnitService(id);
            dispatch(deleteUnit(id));
            toast.info(message);
          },
        },
        actionButtonStyle: {
          backgroundColor: "red",
        },
        position: "top-center",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        toast.error(error.response?.data.message);
      } else {
        console.error(error);
        toast(error as any);
      }
    }
  };
