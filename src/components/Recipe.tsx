import { RecipeI } from "../interfaces/recipes";
import { deleteRecipeService } from "../api/recipes.service";
import { MODE } from "../constantes";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";

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
    <div
      key={recipe._id}
      className="w-64 h-min flex flex-col border rounded-md p-2 mt-2 ml-2"
    >
      <div>
        <div className="mb-2">
          <h3 className="font-medium">{recipe.title}</h3>
        </div>
        <div className="mb-3">
          <p className="font-light text-sm">{recipe.description}</p>
        </div>
        <div className="flex">
          <h5 className="font-light text-sm mb-2">
            <span className="font-bold">{recipe.ingredients.length}</span>{" "}
            {recipe.ingredients.length >= 2 ? "Ingredientes" : "Ingrediente"}
          </h5>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button
            className="border rounded-md py-3 px-4"
            onClick={() => handleRemove(recipe._id!)}
          >
            <MdDelete size={16} />
          </button>
          <button
            className="border rounded-md py-3 px-4"
            onClick={() => {
              setMode(MODE.EDIT);
              getRecipeById(recipe._id!);
            }}
          >
            <MdEdit />
          </button>
        </div>
        <button className="border rounded-md py-3 px-4">
          <FaEye />
        </button>
      </div>
    </div>
  );
};
export default Recipe;
