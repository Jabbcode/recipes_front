import { RecipeI } from "@/interfaces/recipes";
import { deleteRecipeService } from "@/api";

import { MODE } from "../../../constantes";

import { Eye, Pencil, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RecipeProps = {
  recipe: RecipeI;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  getRecipeById: (id: string) => void;
  setChangeState: React.Dispatch<React.SetStateAction<boolean>>;
};

const Recipe = ({
  recipe,
  setMode,
  getRecipeById,
  setChangeState,
}: RecipeProps) => {
  const handleRemove = async (id: string) => {
    await deleteRecipeService(id);
    setChangeState(true);
  };

  return (
    <Card key={recipe._id} className="w-[350px] bg-teal-200 opacity-90">
      <CardHeader className="bg-teal-800 rounded-t-md p-1">
        <CardTitle className="font-light text-sm text-white py-1 px-2">{recipe.title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-2">
        <CardContent className="font-light text-sm">{recipe.description}</CardContent>
        <div className="flex mt-3">
          <h5 className="font-light text-sm px-2">
            <span className="font-bold">{recipe.ingredients.length}</span>{" "}
            {recipe.ingredients.length >= 2 ? "Ingredientes" : "Ingrediente"}
          </h5>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-3 p-3">
        <div className="flex gap-2">
          <Trash2
            onClick={() => handleRemove(recipe._id!)}
            size={18}
            color="#1a252f"
            cursor="pointer"
          />
          <Pencil
            onClick={() => {
              setMode(MODE.EDIT);
              getRecipeById(recipe._id!);
            }}
            size={18}
            color="#1a252f"
            cursor="pointer"
          />
        </div>
        <Eye color="#1a252f" size={18} cursor="pointer" />
      </CardFooter>
    </Card>
  );
};
export default Recipe;
