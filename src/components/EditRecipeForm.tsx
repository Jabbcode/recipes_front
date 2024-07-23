import { IRecipe, Ingredient, Unit } from "../interfaces/recipes";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import MultiInputIngredient from "./MultiInputIngredient";

type EditRecipeFormProps = {
  recipe: IRecipe;
  ingredients: Ingredient[],
  units: Unit[];
  mode: string
  setChangeState: any
}

const INITIAL_FORM = {
  title: "",
  description: "",
  ingredients: [
    {
      index: "",
      name: "",
      quantity: 0,
      unit: "",
    },
  ],
}

const EditRecipeForm = ({recipe, ingredients, units, mode, setChangeState}: EditRecipeFormProps) => { 

  const INITIAL_ARRAY_INGREDIENTS = [
    {
      index: "0",
      name: ingredients?.length > 0 ? ingredients[0]._id! : "",
      quantity: 0,
      unit: units?.length > 0 ? units[0]._id! : "",
    },
  ]
  
  const [form, setForm] = useState(INITIAL_FORM);
  const [arrayIngredients, setArrayIngredients] = useState(INITIAL_ARRAY_INGREDIENTS);

  useEffect(() => {
    setForm({
      ...form,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients   
    })

    setArrayIngredients(recipe.ingredients)
  }, [recipe]);

  const AddNewIngredientToArray = () => {
    setArrayIngredients((prevIngredients) => [
      ...prevIngredients,
      {
        index: prevIngredients.length.toString(),
        name: "",
        quantity: 0,
        unit: "",
      },
    ]);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      ...form,
      ingredients: arrayIngredients,
    };

    await axios.patch(`http://localhost:8080/api/v1/recipes/${recipe._id}`, data);

    setChangeState(true)
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h4>Información:</h4>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label htmlFor="title">Titulo:</label>
        <input
          name="title"
          type="text"
          placeholder="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <label htmlFor="description">Descripcion:</label>
        <input
          name="description"
          type="text"
          placeholder="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>Ingredientes:</h4>
        <button type="button" onClick={AddNewIngredientToArray}>
          +
        </button>
      </div>

      {arrayIngredients?.map((ingredient) => {
        return (
          <MultiInputIngredient
            ingredients={ingredients}
            units={units}
            key={ingredient.index}
            inputIngredient={ingredient}
            mode={mode}
            setArrayIngredients={setArrayIngredients}
          />
        );
      })}
      <button type="submit">Editar</button>
    </form>
  )
};
export default EditRecipeForm;
