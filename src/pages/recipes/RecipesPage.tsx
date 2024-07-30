import { FormEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import AddForm from "../../components/AddForm";
import EditForm from "../../components/EditForm";
import RecipesContainer from "../../components/RecipesContainer";

import {
  getAllRecipesService,
  getAllIngredientsService,
  getAllUnitsService,
} from "../../api";

import { IngredientI, RecipeI, UnitI } from "../../interfaces";

import { MODE } from "../../constantes";

const RecipesPage = () => {
  const [mode, setMode] = useState(MODE.ADD);
  const [recipe, setRecipe] = useState({} as RecipeI);
  const [recipes, setRecipes] = useState<RecipeI[]>([]);
  const [ingredients, setIngredients] = useState<IngredientI[]>([]);
  const [units, setUnits] = useState<UnitI[]>([]);
  const [changeState, setChangeState] = useState(false);
  const [pagination, setPagination] = useState({
    limit: "20",
    page: "1",
  });

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

  useEffect(() => {
    getAllRecipes();
    getAllIngredients();
    getAllUnits();
    return () => setChangeState(false);
  }, [changeState]);

  const getAllRecipes = async () => {
    try {
      const { recipes } = await getAllRecipesService(pagination);
      setRecipes(recipes);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllIngredients = async () => {
    try {
      const { ingredients } = await getAllIngredientsService(pagination);
      setIngredients(ingredients);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUnits = async () => {
    try {
      const { units } = await getAllUnitsService(pagination);
      setUnits(units);
    } catch (error) {
      console.log(error);
    }
  };

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
        setChangeState={setChangeState}
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
          setChangeState={setChangeState}
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
          setChangeState={setChangeState}
        />
      )}
    </div>
  );
};

export default RecipesPage;
