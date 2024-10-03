import { FormEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import RecipesContainer from "./components/RecipesContainer";

import { RecipeI } from "@/interfaces";

import { MODE } from "../../constantes";
import { useAppDispath, useAppSelector } from "@/store/hook";
import { fetchAllIngredientsThunk } from "@/store/features/ingredient/thunks";
import { fetchAllUnitsThunk } from "@/store/features/unit/thunks";
import { fetchRecipes } from "@/store/features/recipe/thunks";

const RecipesPage = () => {
  const [mode, setMode] = useState(MODE.ADD);
  const [recipe, setRecipe] = useState({} as RecipeI);

  const dispatch = useAppDispath();
  const { ingredients } = useAppSelector((state) => state.ingredient);
  const { units } = useAppSelector((state) => state.unit);
  const { recipes } = useAppSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(fetchAllIngredientsThunk(1, 10));
    dispatch(fetchAllUnitsThunk(1, 10));
    dispatch(fetchRecipes());
  }, [dispatch]);

  const [form, setForm] = useState<RecipeI>({
    _id: uuid(),
    title: "",
    description: "",
    ingredients: [
      {
        _id: "",
        name: {
          _id: "",
          name: "",
        },
        quantity: 0,
        unit: {
          _id: "",
          name: "",
          description: "",
        },
      },
    ],
  });

  const createInput = () => {
    setForm({
      ...form,
      ingredients: [
        ...form.ingredients,
        {
          _id: uuid(),
          name: {
            _id: "",
            name: "",
          },
          quantity: 0,
          unit: {
            _id: "",
            name: "",
            description: "",
          },
        },
      ],
    });
  };

  const deleteInput = (id: string) => {
    setForm({
      ...form,
      ingredients: form.ingredients.filter(
        (ingredient) => ingredient._id !== id
      ),
    });
  };

  const handleChange = (
    event: FormEvent<HTMLSelectElement> | FormEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.currentTarget;

    setForm({
      ...form,
      [name]: value,
      ingredients: [...form.ingredients],
    });
  };

  const handleEdit = (id: string) => {
    setMode(MODE.EDIT);
    const data = recipes.find((recipe) => recipe._id === id);
    setRecipe(data!);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <RecipesContainer
        recipes={recipes}
        setMode={setMode}
        getRecipeById={handleEdit}
      />
      {mode === MODE.ADD ? (
        <AddForm
          form={form}
          setForm={setForm}
          handleOnChange={handleChange}
          createInput={createInput}
          deleteInput={deleteInput}
          ingredients={ingredients}
          units={units}
        />
      ) : (
        <EditForm
          form={form}
          setForm={setForm}
          recipe={recipe}
          handleOnChange={handleChange}
          createInput={createInput}
          deleteInput={deleteInput}
          ingredients={ingredients}
          units={units}
        />
      )}
    </div>
  );
};

export default RecipesPage;
