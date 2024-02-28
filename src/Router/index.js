import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <HomePage />,
    }
]);