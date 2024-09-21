import { fetchAllUnitsThunk } from "@/store/features/unit/thunks";
import { useAppDispath, useAppSelector } from "@/store/hook";
import { useEffect } from "react";
import { FormUnit } from "./FormUnit";
import { DataTable } from "@/components/table/data-table";
import { columnsUnits } from "@/components/table/columnsUnits";

export const UnitTabs = () => {
  const dispatch = useAppDispath();

  const { units, pages } = useAppSelector((state) => state.unit);

  useEffect(() => {
    dispatch(fetchAllUnitsThunk(1, 10));
  }, []);

  return (
    <div className="overflow-x-auto grid grid-cols-12 gap-2">
      <div className="col-span-2">
        <FormUnit />
      </div>
      <div className="border rounded-md px-2 col-span-10">
        <DataTable columns={columnsUnits} data={units} pages={pages} />
      </div>
    </div>
  );
};
