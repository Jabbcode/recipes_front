import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";

import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster richColors expand={true} />
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
