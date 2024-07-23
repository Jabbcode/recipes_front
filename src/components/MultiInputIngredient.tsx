import { FormEvent, useEffect, useState } from "react";
import { Ingredient, Unit } from "../interfaces/recipes";
import { MODE } from "../constantes";

type TypeForm = {
  index: string;
  name: string;
  quantity: number;
  unit: string;
};

type MultiInputIngredientProps = {
  ingredients: Ingredient[];
  units: Unit[];
  inputIngredient: TypeForm;
  mode: string;
  setArrayIngredients: React.Dispatch<React.SetStateAction<TypeForm[]>>;
};

const MultiInputIngredient = ({
  ingredients,
  units,
  inputIngredient,
  mode,
  setArrayIngredients,
}: MultiInputIngredientProps) => {
  
  const [inputState, setInputState] = useState({
    name: "", 
    quantity: 0, 
    unit: ""
  });

  useEffect(() => {
    setInputState({
      name: inputIngredient.name, 
      quantity: inputIngredient.quantity, 
      unit: inputIngredient.unit
    })
  }, []);
  
  const handleOnChange = (e: FormEvent<HTMLSelectElement> | FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputState((prevInputState) => ({ ...prevInputState, [name]: value }));
    mode === MODE.ADD ?
    setArrayIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, index) => {
        if (index.toString() === inputIngredient.index) {
          return { ...ingredient, [name]: value };
        }
        return ingredient;
      })
    ) : setArrayIngredients((prevIngredients) => 
      prevIngredients.map((ingredient) => {
        if (ingredient?._id === inputIngredient?._id) {
          return { ...ingredient, [name]: value };
        }
        return ingredient;
      })
     )
  };

  const deleteInputIngredient = (index: string) => {
    setArrayIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i.toString() !== index)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "10px",
      }}
    >
      <select name="name" value={inputState.name?._id} onChange={handleOnChange}>
        <option value="" selected>
          -- Nombre --
        </option>
        {ingredients.map((ingredient) => {
          return (
            <option key={ingredient._id} value={ingredient._id}>
              {ingredient.name}
            </option>
          );
        })}
      </select>

      <input name="quantity" type="number" placeholder="Cantidad" min={1} value={inputState.quantity} onChange={handleOnChange} />

      <select name="unit" value={inputState.unit?._id} onChange={handleOnChange}>
        <option value="" selected>
          -- Unidad --
        </option>
        {units?.map((unit) => {
          return (
            <option key={unit._id} value={unit._id}>
              {unit.description} ({unit.name})
            </option>
          );
        })}
      </select>

      {inputIngredient.index !== "0" && (
        <button onClick={() => deleteInputIngredient(inputIngredient.index)}>
          -
        </button>
      )}
    </div>
  );
};
export default MultiInputIngredient;
