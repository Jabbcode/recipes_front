import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

import NotFound from "../components/NotFound";

import RecipesPage from "../pages/recipes/RecipesPage";
import SettingsPage from "../pages/settings/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/recipes",
        element: <RecipesPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
