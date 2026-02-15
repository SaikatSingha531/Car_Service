import { createBrowserRouter } from "react-router-dom";
import Admin from "../Pages/Admin/Admin";
import MainHome from "../Components/MainHome";
import Navbar from "../Components/Navbar";
import LoginPage from "../Components/LoginPage";
import SignupPage from "../Components/SignupPage";

export const Router = createBrowserRouter([
    {
        path:"/",
        element:<MainHome/>
    },
    {
        path:"/admin",
        element:<><Navbar/><Admin/></>
    },
    {
        path:"/login",
        element:<LoginPage/>
    },
    {
        path:"/signup",
        element:<SignupPage/>
    }
])