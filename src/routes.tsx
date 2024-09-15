import { redirect, RouteObject } from "react-router-dom";
import App from "./App";
import LoginPage from "@/pages/login";
import { account } from "./lib/appwrite";

async function protectRoute() {
  try {
    const user = await account.get();
    return user; // Proceed with the route if the user is authenticated
  } catch {
    // If user is not authenticated, redirect to the login page
    return redirect("/login");
  }
}

async function authRoute() {
  try {
    const user = await account.get();
    console.log(user);
    // If user is authenticated, redirect to the home page
    if (user) return redirect("/");
  } catch {
    // If user is not authenticated, continue to the login page
    return null;
  }
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    loader: protectRoute
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: authRoute
  }
];
