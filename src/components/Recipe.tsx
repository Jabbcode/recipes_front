import axios from "axios";
import { IRecipe } from "../interfaces/recipes";

type RecipeProps = {
  recipe: IRecipe;
  setMode: any;
  getRecipe: any;
  setChangeState: any;
};

const Recipe = ({ recipe, setMode, getRecipe, setChangeState }: RecipeProps) => {
  const handleRemove = async (id: string) => {
    setChangeState(true);
    await axios.delete(`http://localhost:8080/api/v1/recipes/${id}`);
  };

  return (
    <div key={recipe._id} style={{ border: "1px solid #000", borderRadius: "3rem", padding: "1rem", width: "150px"}}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>{recipe.title}</h3>
        <button onClick={() => handleRemove(recipe._id!)}>x</button>
        <button
          onClick={() => {
            setMode("EDTIAR");
            getRecipe(recipe._id);
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
