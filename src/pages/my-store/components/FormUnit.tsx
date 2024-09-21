import { FormEvent, useState } from "react";
import { addUnitThunk } from "@/store/features/unit/thunks";
import { useAppDispath } from "@/store/hook";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const FormUnit = () => {
  const dispatch = useAppDispath();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleOnSubmitUnit = async (event: FormEvent) => {
    event.preventDefault();

    dispatch(addUnitThunk(form));

    setForm({
      name: "",
      description: "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Unidad</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Input
              value={form.name}
              placeholder="Nombre"
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
        </div>
        <div className="grid items-center gap-4 mt-4">
          <div className="flex flex-col space-y-1.5">
            <Input
              value={form.description}
              placeholder="Descripcion"
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleOnSubmitUnit}>Agregar</Button>
      </CardFooter>
    </Card>
  );
};
