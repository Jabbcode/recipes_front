import { useEffect, useState } from "react";
import { IngredientI, UnitI } from "../../interfaces";
import { getAllIngredientsService, getAllUnitsService } from "../../api";
import { MdEdit } from "react-icons/md";

const SettingsPage = () => {
  const [ingredients, setIngredients] = useState<IngredientI[]>([]);
  const [units, setUnits] = useState<UnitI[]>([]);
  const [pagination, setPagination] = useState({
    limit: "5",
    page: "1",
  });

  useEffect(() => {
    getAllIngredients();
    getAllUnits();
  }, []);

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

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4">
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
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {ingredient.name}
                      </th>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          <MdEdit />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
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
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {unit.name}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {unit.description}
                      </th>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          <MdEdit />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col-span-8">Configuracion</div>
    </div>
  );
};
export default SettingsPage;
