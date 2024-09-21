import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Trash2 } from "lucide-react";

import { UnitI } from "@/interfaces";
import { useAppDispath } from "@/store/hook";
import { deleteUnitThunk } from "@/store/features/unit/thunks";
import { EditUnit } from "@/pages/my-store/components/EditUnit";

export const columnsUnits: ColumnDef<UnitI>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descripcion
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const unit = row.original;

      const dispatch = useAppDispath();

      const handleDeleteUnit = (id: string) => {
        dispatch(deleteUnitThunk(id));
      };

      return (
        <>
          <EditUnit unit={unit} />

          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => handleDeleteUnit(unit.id!)}
          >
            <span>
              <Trash2 size={18} />
            </span>
          </Button>
        </>
      );
    },
  },
];
