import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Trash2 } from "lucide-react";

import { IngredientI } from "@/interfaces";
import { useAppDispath } from "@/store/hook";
import { deleteIngredientThunk } from "@/store/features/ingredient/thunks";
import { EditIngredient } from "@/pages/my-store/components/EditIngredient";

export const columnsIngredients: ColumnDef<IngredientI>[] = [
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
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const ingredient = row.original;

      const dispatch = useAppDispath();

      const handleDeleteIngredient = (id: string) => {
        dispatch(deleteIngredientThunk(id));
      };

      return (
        <>
          <EditIngredient ingredient={ingredient} />

          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => handleDeleteIngredient(ingredient.id!)}
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
