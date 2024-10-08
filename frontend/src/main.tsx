import { StrictMode } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "@/routes";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'sonner';


import "./index.css";
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
    <Toaster richColors />
      <RouterProvider router={router} />
    </NextUIProvider>
  </StrictMode>
);
