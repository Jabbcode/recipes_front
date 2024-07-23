import axios from "axios";
import { useEffect, useState } from "react";
import { IRecipe, Unit, Ingredient } from "./interfaces/recipes";

import RecipesContainer from "./components/RecipesContainer.tsx";
import AddRecipeForm from "./components/AddRecipeForm.tsx";
import EditRecipeForm from "./components/EditRecipeForm";
import { MODE } from "./constantes.ts";

const App = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [mode, setMode] = useState(MODE.ADD);
  const [recipe, setRecipe] = useState({} as IRecipe);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [changeState, setChangeState] = useState(false);
  
  useEffect(() => {
    getAllRecipes();
    getAllIngredients();
    getAllUnits();

    return () => {setChangeState(false)}
  }, [changeState]);

  const getAllRecipes = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/recipes");
      setRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllIngredients = async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/ingredients"
    );
    setIngredients(data);
  };

  const getAllUnits = async () => {
    const { data } = await axios.get("http://localhost:8080/api/v1/units");
    setUnits(data);
  };

  const getRecipeByid = async (id: string) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/recipes/${id}`
      );
      setRecipe(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10rem" }}>
      
      {mode === MODE.ADD 
        ? <AddRecipeForm ingredients={ingredients} units={units} mode={mode} setChangeState={setChangeState} /> 
        : <EditRecipeForm recipe={recipe} ingredients={ingredients} units={units} mode={mode} setChangeState={setChangeState} />
      }

      <RecipesContainer
        recipes={recipes}
        setMode={setMode}
        getRecipe={getRecipeByid}
        setChangeState={setChangeState}
      />
    </div>
  );
};

export default App;
