import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

import NotFound from "../components/NotFound";

import RecipesPage from "../pages/recipes/RecipesPage";
import MyStorePage from "@/pages/my-store/MyStorePage";
import PlanningPage from "../pages/planning/PlanningPage";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
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
          path: "/my-store",
          element: <MyStorePage />,
        },
        {
          path: "/planning",
          element: <PlanningPage />,
        },
      ],
    },
  ]);
