import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  createIngredientService,
  createUnitService,
  getAllIngredientsService,
  getAllUnitsService,
} from "@/api";
import Pagination from "@/components/Pagination";
import { IngredientI, UnitI } from "@/interfaces";
import { MdDelete, MdEdit } from "react-icons/md";

const SettingsPage = () => {
  const [ingredients, setIngredients] = useState<IngredientI[]>([]);
  const [units, setUnits] = useState<UnitI[]>([]);

  const [formIngredient, setFormIngredient] = useState({
    name: "",
  });

  const [formUnit, setFormUnit] = useState({
    name: "",
    description: "",
  });

  const [paginaActualIngredient, setPaginaActualIngredient] = useState(1);
  const [paginaActualUnits, setPaginaActualUnit] = useState(1);

  const [elementosPorPagina] = useState(5);

  const [totalPagesIngredients, setTotalPagesIngredients] = useState(0);
  const [totalPagesUnits, setTotalPagesUnits] = useState(0);

  useEffect(() => {
    getAllIngredients();
  }, [paginaActualIngredient]);

  useEffect(() => {
    getAllUnits();
  }, [paginaActualUnits]);

  const getAllIngredients = async () => {
    try {
      const { ingredients, totalPages } = await getAllIngredientsService({
        limit: String(elementosPorPagina),
        page: String(paginaActualIngredient),
      });
      setIngredients(ingredients);
      setTotalPagesIngredients(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUnits = async () => {
    try {
      const { units, totalPages } = await getAllUnitsService({
        limit: String(elementosPorPagina),
        page: String(paginaActualUnits),
      });
      setUnits(units);
      setTotalPagesUnits(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeIngredient = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormIngredient({
      ...formIngredient,
      [name]: value,
    });
  };

  const handleOnSubmitIngredient = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { ingredient, message } = await createIngredientService(
        formIngredient
      );
      console.log({ ingredient, message });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeUnit = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormUnit({
      ...formUnit,
      [name]: value,
    });
  };

  const handleOnSubmitUnit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { unit, message } = await createUnitService(formUnit);
      console.log({ unit, message });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-5">
        <div className="grid grid-rows-12 gap-6">
          <div className="relative overflow-x-auto shadow-md row-span-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Ingredientes
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Accion
                  </th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ingredient) => {
                  return (
                    <tr
                      key={ingredient._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {ingredient.name}
                      </th>
                      <td className="px-6 py-2">
                        <div className="flex gap-3">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <MdEdit />
                          </a>
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <MdDelete size={16} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <Pagination
                  totalPages={totalPagesIngredients}
                  paginaActual={paginaActualIngredient}
                  setPaginaActual={setPaginaActualIngredient}
                />
              </tfoot>
            </table>
          </div>

          <div className="relative overflow-x-auto shadow-md row-span-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Unidades
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Descripcion
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Accion
                  </th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit) => {
                  return (
                    <tr
                      key={unit._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {unit.name}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {unit.description}
                      </th>
                      <td className="px-6 py-2">
                        <div className="flex gap-3">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <MdEdit />
                          </a>
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <MdDelete size={16} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <Pagination
                  totalPages={totalPagesUnits}
                  paginaActual={paginaActualUnits}
                  setPaginaActual={setPaginaActualUnit}
                />
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="col-span-7">
        <div className="border rounded-md p-2 m-2 w-min">
          <h4 className="font-medium text-lg text-center border rounded-md p-2">
            Agregar ingrediente
          </h4>
          <form action="" onSubmit={handleOnSubmitIngredient}>
            <div className="flex flex-col my-3">
              <label htmlFor="name" className="font-medium text-base pb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded-md p-2"
                onChange={handleOnChangeIngredient}
              />
            </div>
            <div className="grid">
              <button
                type="submit"
                className="border rounded-md bg-blue-300 hover:bg-blue-600 transition ease-linear hover:text-white p-2"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>

        <div className="border rounded-md p-2 m-2 w-min">
          <h4 className="font-medium text-lg text-center border rounded-md p-2">
            Agregar Unidad
          </h4>
          <form action="" onSubmit={handleOnSubmitUnit}>
            <div className="flex flex-col my-3">
              <label htmlFor="name" className="font-medium text-base pb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded-md p-2"
                onChange={handleOnChangeUnit}
              />

              <label htmlFor="name" className="font-medium text-base pb-2">
                Descripcion
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="border rounded-md p-2"
                onChange={handleOnChangeUnit}
              />
            </div>
            <div className="grid">
              <button
                type="submit"
                className="border rounded-md bg-blue-300 hover:bg-blue-600 transition ease-linear hover:text-white p-2"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
