import { AppDispatch } from "@/store";
import {
  fetchAllIngredients,
  fetchIngredientPending,
  addIngredient,
  deleteIngredient,
  editIngredient,
} from "./ingredientSlice";
import {
  createIngredientService,
  deleteIngredientService,
  getAllIngredientsService,
  updateIngredientService,
} from "@/api";
import { AxiosError } from "axios";
import { IngredientI } from "@/interfaces";
import { toast } from "sonner";

export const fetchAllIngredientsThunk =
  (pageActual: number, limit: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchIngredientPending());

      const { ingredients, total, pages } = await getAllIngredientsService({
        page: String(pageActual),
        limit: String(limit),
      });

      dispatch(
        fetchAllIngredients({
          ingredients,
          total,
          pages,
          isLoading: false,
        })
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        console.error(error.message);
        toast(error.message);
      } else {
        console.error(error);
        toast(error as any);
      }
    }
  };

export const addIngredientThunk =
  (data: IngredientI) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchIngredientPending());

      toast.promise(createIngredientService(data), {
        loading: "Loading...",
        success: ({ ingredient, message }) => {
          dispatch(addIngredient(ingredient || ({} as IngredientI)));
          return message;
        },
        error: "No se pudo agregar el ingrediente",
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

export const editIngredientThunk =
  (id: string, name: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchIngredientPending());

      toast.promise(updateIngredientService(id, name), {
        loading: "Loading...",
        success: ({ ingredient, message }) => {
          dispatch(editIngredient(ingredient || ({} as IngredientI)));
          return message;
        },
        error: "No se pudo actualizar el ingrediente",
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

export const deleteIngredientThunk =
  (id: string, isGroup: boolean = false, ids: string[] = []) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchIngredientPending());

      if (isGroup) {
        toast("¿Esta seguro de borrar los ingredientes seleccionados?", {
          cancel: {
            label: "Cancelar",
            onClick: () => {},
          },
          action: {
            label: "Borrar",
            onClick: async () => {
              await ids.map((id) => {
                deleteIngredientService(id);
              });
              ids.map((id) => {
                dispatch(deleteIngredient(id));
              });
              toast.info("Ingredientes eliminados correctamente");
            },
          },
          actionButtonStyle: {
            backgroundColor: "red",
          },
          position: "top-center",
        });
      } else {
        toast("¿Esta seguro de borrar el ingrediente?", {
          cancel: {
            label: "Cancelar",
            onClick: () => {},
          },
          action: {
            label: "Borrar",
            onClick: async () => {
              const { message } = await deleteIngredientService(id);
              dispatch(deleteIngredient(id));
              toast.info(message);
            },
          },
          actionButtonStyle: {
            backgroundColor: "red",
          },
          position: "top-center",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error(error.response?.data.message);
      } else {
        console.error(error);
        toast(error as any);
      }
    }
  };
