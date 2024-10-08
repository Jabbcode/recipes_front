import { useEffect, useState } from "react";
import DatePiker from "@/components/DatePiker";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getAllRecipesForSelectService } from "@/api";
import { createEventService } from "@/api/events.service";

const FormEvent = () => {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    date: new Date(),
    type: "",
    recipe: "",
  });

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await getAllRecipesForSelectService();
    setRecipes(response);
  };

  const createEvent = async () => {
    const response = await createEventService(form);
    console.log(response);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Crear Evento</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Nuevo Evento</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <DatePiker
                  date={form.date}
                  setDate={(value) =>
                    setForm({ ...form, date: value ? value : new Date() })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Select
                  onValueChange={(value) => setForm({ ...form, type: value })}
                >
                  <SelectTrigger className="w-[380px]">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Desayuno">Desayuno</SelectItem>
                      <SelectItem value="Almuerzo">Almuerzo</SelectItem>
                      <SelectItem value="Cena">Cena</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Select
                  onValueChange={(value) => setForm({ ...form, recipe: value })}
                >
                  <SelectTrigger className="w-[380px]">
                    <SelectValue placeholder="Selecciona una Receta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {recipes?.map((recipe) => {
                        return (
                          <SelectItem key={recipe.id} value={recipe.id}>
                            {recipe.title}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
          <AlertDialogAction onClick={createEvent}>Agregar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default FormEvent;
