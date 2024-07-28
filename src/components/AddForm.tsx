import { FormEvent } from "react";
import { BasicIngredientI, RecipeI, UnitI } from "../interfaces/recipes";
import { createRecipeService } from "../api/recipes";

type AddFormProps = {
  form: RecipeI;
  setForm: React.Dispatch<React.SetStateAction<RecipeI>>;
  handleOnChange: (
    event: FormEvent<HTMLSelectElement> | FormEvent<HTMLInputElement>
  ) => void;
  createInput: () => void;
  deleteInput: (id: string) => void;
  ingredients: BasicIngredientI[];
  units: UnitI[];
  setChangeState: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddForm = ({
  form,
  setForm,
  handleOnChange,
  createInput,
  deleteInput,
  ingredients,
  units,
  setChangeState,
}: AddFormProps) => {
  const handleOnChangeArray = (
    event: FormEvent<HTMLSelectElement> | FormEvent<HTMLInputElement>,
    id: string
  ) => {
    const { name, value } = event.currentTarget;

    setForm({
      ...form,
      ingredients: form.ingredients.map((ingredient) => {
        console.log(ingredient);
        if (ingredient._id === id) {
          if (name === "quantity") {
            return { ...ingredient, quantity: Number(value) };
          } else {
            return { ...ingredient, [name]: { _id: value } };
          }
        }
        return ingredient;
      }),
    });
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      ...form,
      ingredients: [
        ...form.ingredients.map((ingredient) => {
          return {
            name: ingredient.name._id,
            quantity: ingredient.quantity,
            unit: ingredient.unit._id,
          };
        }),
      ],
    };
    await createRecipeService(data);
    setChangeState(true)
  };

  return (
    <div>
      <h4>Formulario de Agregar</h4>
      <form action="" onSubmit={handleOnSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label htmlFor="title">Titulo:</label>
          <input type="text" name="title" onChange={handleOnChange} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <label htmlFor="description">Descripcion:</label>
          <input type="text" name="description" onChange={handleOnChange} />
        </div>

        <h4>Ingredientes:</h4>

        <button type="button" onClick={createInput}>
          +
        </button>

        {form.ingredients?.map((ingredient) => {
          return (
            <div key={ingredient._id}>
              <div>
                <select
                  name="name"
                  onChange={(event) =>
                    handleOnChangeArray(event, ingredient._id)
                  }
                >
                  <option value="" selected>
                    ----
                  </option>
                  {ingredients.map((ingredientData) => {
                    return (
                      <option
                        key={ingredientData._id}
                        value={ingredientData._id}
                      >
                        {ingredientData.name}
                      </option>
                    );
                  })}
                </select>

                <input
                  type="number"
                  name="quantity"
                  onChange={(event) =>
                    handleOnChangeArray(event, ingredient._id)
                  }
                />
                <select
                  name="unit"
                  onChange={(event) =>
                    handleOnChangeArray(event, ingredient._id)
                  }
                >
                  <option value="" selected>
                    ----
                  </option>

                  {units.map((unitData) => {
                    return (
                      <option key={unitData._id} value={unitData._id}>
                        {unitData.name}
                      </option>
                    );
                  })}
                </select>
                <button
                  type="button"
                  onClick={() => deleteInput(ingredient._id)}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};
export default AddForm;
