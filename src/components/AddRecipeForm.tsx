import axios from "axios";
import { FormEvent, useState } from "react";
import { Ingredient, Unit } from "../interfaces/recipes";
import MultiInputIngredient from "./MultiInputIngredient";


type AddRecipeFormPros = {
  ingredients: Ingredient[];
  units: Unit[];
  mode: string;
  setChangeState: any
}

const AddRecipeForm = ({ingredients, units, mode, setChangeState}: AddRecipeFormPros) => {
  const [form, setForm] = useState({
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
  });

  const [arrayIngredients, setArrayIngredients] = useState([
    {
      index: "0",
      name: ingredients?.length > 0 ? ingredients[0]._id! : "",
      quantity: 0,
      unit: units?.length > 0 ? units[0]._id! : "",
    },
  ]);

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

    await axios.post("http://localhost:8080/api/v1/recipes", data);

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
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>Ingredientes:</h4>
        <button type="button" onClick={AddNewIngredientToArray}>
          +
        </button>
      </div>

      {arrayIngredients.map((ingredient) => {
        return (
          <MultiInputIngredient
            key={ingredient.index}
            ingredients={ingredients}
            units={units}
            inputIngredient={ingredient}
            mode={mode}
            setArrayIngredients={setArrayIngredients}
          />
        );
      })}
      <button type="submit">Agregar</button>
    </form>
  );
};
export default AddRecipeForm;
