import { useEffect } from "react";
import { IngredientI, RecipeI, UnitI } from "@/interfaces";
import { updateRecipeService } from "@/api";

import { HiPlus } from "react-icons/hi";
import { GrFormSubtract } from "react-icons/gr";

type EditFormProps = {
  form: RecipeI;
  setForm: React.Dispatch<React.SetStateAction<RecipeI>>;
  recipe: RecipeI;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  createInput: () => void;
  deleteInput: (id: string) => void;
  ingredients: IngredientI[];
  units: UnitI[];
};

const EditForm = ({
  form,
  setForm,
  recipe,
  handleOnChange,
  createInput,
  deleteInput,
  ingredients,
  units,
}: EditFormProps) => {
  useEffect(() => {
    setForm({
      ...recipe,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  const handleOnChangeArray = (
    event:
      | React.FormEvent<HTMLSelectElement>
      | React.FormEvent<HTMLInputElement>,
    id: string
  ) => {
    const { name, value } = event.currentTarget;

    setForm({
      ...form,
      ingredients: form.ingredients.map((ingredient) => {
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

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      title: form.title,
      description: form.description,
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
    await updateRecipeService(data, recipe._id!);
  };

  return (
    <div className="border rounded-md p-2 col-span-3 h-min m-2">
      <div className="mb-3">
        <h1 className="font-semibold text-xl">Editar receta</h1>
      </div>
      <form action="" onSubmit={handleOnSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title" className="font-medium text-sm">
            Titulo:
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleOnChange}
            className="border rounded-sm mb-2 text-sm py-2 px-3"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="font-medium text-sm">
            Descripcion:
          </label>
          <textarea
            onChange={handleOnChange}
            value={form.description}
            name="description"
            id="description"
            className="border rounded-sm mb-2 py-2 px-3"
            rows={4}
          ></textarea>
        </div>

        <div className="flex gap-1 justify-between mb-3 items-center">
          <h6 className="font-medium text-sm">Ingredientes</h6>
          <button type="button" onClick={createInput}>
            <HiPlus size={20} />
          </button>
        </div>

        {form.ingredients?.map((ingredient) => {
          return (
            <div key={ingredient._id} className="mb-1">
              <div className="flex gap-1 content-center items-center">
                <select
                  name="name"
                  className="border rounded-md text-sm py-3 pl-3 pr-2"
                  value={ingredient.name._id}
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
                  className="border rounded-md text-sm py-3 pl-2"
                  value={ingredient.quantity}
                  onChange={(event) =>
                    handleOnChangeArray(event, ingredient._id)
                  }
                />

                <select
                  name="unit"
                  className="border rounded-md text-sm py-3 px-3"
                  value={ingredient.unit._id}
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
                  className="border rounded-md p-3 bg-red-400 hover:bg-red-500"
                  onClick={() => deleteInput(ingredient._id)}
                >
                  <GrFormSubtract />
                </button>
              </div>
            </div>
          );
        })}

        <div className="grid">
          <button
            type="submit"
            className="mt-1 border rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-400 transition ease-linear delay-75 hover:text-white"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditForm;
