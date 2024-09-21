import { useEffect } from "react";
import { useAppDispath, useAppSelector } from "@/store/hook";
import { fetchAllIngredientsThunk } from "@/store/features/ingredient/thunks";
import { DataTable } from "@/components/table/data-table";
import { columnsIngredients } from "@/components/table/columnsIngredients";
import { FormIngredient } from "./FormIngredient";

export const IngredientTabs = () => {
  const dispatch = useAppDispath();

  const { ingredients, pages } = useAppSelector((state) => state.ingredient);

  useEffect(() => {
    dispatch(fetchAllIngredientsThunk(1, 10));
  }, []);

  return (
    <div className="overflow-x-auto grid grid-cols-12 gap-2">
      <div className="col-span-2">
        <FormIngredient />
      </div>
      <div className="border rounded-md px-2 col-span-10">
        <DataTable
          columns={columnsIngredients}
          data={ingredients}
          pages={pages}
        />
      </div>
    </div>
  );
};
