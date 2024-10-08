import { useEffect, useState } from "react";
import { useAppDispath, useAppSelector } from "@/store/hook";
import { fetchAllIngredientsThunk } from "@/store/features/ingredient/thunks";
import { DataTable } from "@/components/table/data-table";
import { columnsIngredients } from "@/components/table/columnsIngredients";
import { FormIngredient } from "./FormIngredient";

export const IngredientTabs = () => {
  const dispatch = useAppDispath();

  const { ingredients, pages } = useAppSelector((state) => state.ingredient);

  const [changeState, setChangeState] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(
      fetchAllIngredientsThunk(pagination.pageIndex + 1, pagination.pageSize)
    );
    return () => setChangeState(false);
  }, [pagination.pageIndex, pagination.pageSize, changeState]);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-2">
        <FormIngredient setChangeState={setChangeState} />
      </div>
      <div className="border rounded-md px-2 col-span-10">
        <DataTable
          columns={columnsIngredients}
          data={ingredients}
          pages={pages}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
};
