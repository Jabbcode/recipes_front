import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { IngredientI } from "@/interfaces";
import { editIngredientThunk } from "@/store/features/ingredient/thunks";
import { useAppDispath } from "@/store/hook";
import { Label } from "@radix-ui/react-label";
import { Settings } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface EditIngredientProps {
  ingredient: IngredientI;
}

export const EditIngredient = ({ ingredient }: EditIngredientProps) => {
  const dispatch = useAppDispath();

  const [name, setName] = useState(ingredient.name);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEditIngredient = (id: string) => {
    dispatch(editIngredientThunk(id, name));
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span>
            <Settings size={18} />
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Ingrediente</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              autoFocus
              id="name"
              value={name}
              className="col-span-3"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="button"
              onClick={() => handleEditIngredient(ingredient.id!)}
            >
              Actualizar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
