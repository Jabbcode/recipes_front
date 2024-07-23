import { IRecipe } from "../interfaces/recipes";
import Recipe from "./Recipe";

type RecipesContainerProps = {
  recipes: IRecipe[];
  setMode: any;
  getRecipe: any;
  setChangeState: any;
};

const RecipesContainer = ({
  recipes,
  setMode,
  getRecipe,
  setChangeState,
}: RecipesContainerProps) => {
  return (
    <div style={{display: "flex", flexWrap: "wrap", gap: "1rem"}}>
      {
        recipes.length > 0 ? (
          recipes.map((recipe) => {
            return (
              <Recipe key={recipe._id} recipe={recipe} setMode={setMode} getRecipe={getRecipe} setChangeState={setChangeState} />
            );
          })
        )  : "No hay recetas"
      }
    </div>
  );
};
export default RecipesContainer;
