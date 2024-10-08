import { getRecipeByIdService } from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RecipeI } from "@/interfaces";
import { useEffect, useState } from "react";

interface ModalEventProps {
  id: string;
  open: boolean;
  setOpen: any;
}

const ModalEvent = ({ id, open, setOpen }: ModalEventProps) => {
  const [recipe, setRecipe] = useState({} as RecipeI);

  useEffect(() => {
    getRecipe(id);
  }, [id]);

  const getRecipe = async (id: string) => {
    const response = await getRecipeByIdService(id);
    setRecipe(response);
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Receta</AlertDialogTitle>
          <AlertDialogDescription>
            <div>
              <h4>{recipe.title}</h4>
              <p>{recipe.description}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ModalEvent;
