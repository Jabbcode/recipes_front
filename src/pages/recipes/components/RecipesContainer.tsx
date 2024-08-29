import { RecipeI } from "@/interfaces";
import Recipe from "./Recipe";

type RecipesContainerProps = {
  recipes: RecipeI[];
  setMode: React.Dispatch<React.SetStateAction<string>>;
  getRecipeById: (id: string) => void;
  setChangeState: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecipesContainer = ({
  recipes,
  setMode,
  getRecipeById,
  setChangeState,
}: RecipesContainerProps) => {
  return (
    <div className="col-span-9 h-screen">
      <div className="flex flex-wrap">
        {recipes.length > 0
          ? recipes.map((recipe) => {
              return (
                <Recipe
                  key={recipe._id}
                  recipe={recipe}
                  setMode={setMode}
                  getRecipeById={getRecipeById}
                  setChangeState={setChangeState}
                />
              );
            })
          : "No hay recetas"}
      </div>
    </div>
  );
};
export default RecipesContainer;
