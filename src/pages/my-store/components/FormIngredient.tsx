import { ChangeEvent, useState } from "react";
import { addIngredientThunk } from "@/store/features/ingredient/thunks";
import { useAppDispath } from "@/store/hook";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FormIngredientProps {
  setChangeState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormIngredient = ({ setChangeState }: FormIngredientProps) => {
  const dispatch = useAppDispath();

  const [form, setForm] = useState({
    name: "",
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setForm({
      ...form,
      name: value,
    });
  };

  const handleOnSubmitIngredient = () => {
    dispatch(addIngredientThunk(form));
    setChangeState(true);
    setForm({ name: "" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Ingrediente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Input
              value={form.name}
              placeholder="Nombre"
              onChange={handleOnChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleOnSubmitIngredient}>Agregar</Button>
      </CardFooter>
    </Card>
  );
};
