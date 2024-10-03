import { useState } from "react";
import { Settings } from "lucide-react";
import { Label } from "@radix-ui/react-label";
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
import { useAppDispath } from "@/store/hook";
import { UnitI } from "@/interfaces";
import { editUnitThunk } from "@/store/features/unit/thunks";

interface EditUnitProps {
  unit: UnitI;
}

export const EditUnit = ({ unit }: EditUnitProps) => {
  const dispatch = useAppDispath();

  const [form, setForm] = useState(unit);

  const handleEditUnit = (id: string) => {
    const data = {
      name: form.name,
      description: form.description,
    };
    dispatch(editUnitThunk(id, data));
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
          <SheetTitle>Editar Unidad</SheetTitle>
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
              value={form.name}
              className="col-span-3"
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripcion
            </Label>
            <Input
              autoFocus
              id="description"
              value={form.description}
              className="col-span-3"
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" onClick={() => handleEditUnit(unit._id!)}>
              Actualizar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
