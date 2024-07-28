import { RecipeI } from "../interfaces/recipes";
import { deleteRecipeService } from "../api/recipes";
import { MODE } from "../constantes";

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
      style={{
        border: "1px solid #000",
        borderRadius: "3rem",
        padding: "1rem",
        width: "150px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>{recipe.title}</h3>
        <button onClick={() => handleRemove(recipe._id!)}>x</button>
        <button
          onClick={() => {
            setMode(MODE.EDIT);
            getRecipeById(recipe._id!);
          }}
        >
          Editar
        </button>
      </div>
      <p>{recipe.description}</p>
      <div>
        <h4>Ingredientes</h4>
        <ul>
          {recipe.ingredients.map((ingredient) => {
            return (
              <li key={ingredient._id}>
                {ingredient.name.name} - {ingredient.quantity} -{" "}
                {ingredient.unit.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Recipe;
