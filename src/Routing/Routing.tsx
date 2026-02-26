import { createBrowserRouter } from "react-router-dom";
import AdminWrapper from "../Components/Layout/AdminLayout/AdminWrapper";
import UserWrapper from "../Components/Layout/UserLayout/UserWrapper";
import MainHome from "../Components/MainHome";
import SignupPage from "../Components/SignupPage";
import LoginPage from "../Components/LoginPage";
import AdminProtected from "../Components/AdminProtected";
// import Catagory from "../Pages/Admin/Catagory";
// import AuthWrapper from "../Components/Layout/AuthLayout/AuthWrapper";
// import UserProtected from "../Components/UserProtected";
import CartPage from "../Pages/CartPage";
import AboutUs from "../Pages/AboutUs";
import SparesAdmin from "../Pages/Admin/SparesAdmin";
import ServiceAdmin from "../Pages/Admin/ServiceAdmin";
// import Spares from "../Pages/Spares";
// import CartSpare from "../Pages/CartSpare";
import CartService from "../Pages/Servicepage/CartService";
import Services from "../Pages/Servicepage/Services";
import CartSpare from "../Pages/Spares/CartSpare";
import SparePage from "../Pages/Spares/Spares";

export const Router = createBrowserRouter([
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <UserWrapper />,
    children: [
      {
        index: true,
        element: <MainHome />,
      },
      {
        path:"/home",
        element: <MainHome />,
      },
      {
        path: "/about",
        element: <AboutUs/>
      },
      {
        path: "/spares",
        element: <SparePage/>
      },
      {
        path: "/service",
        element: <Services/>
      },
      {
        path:"/cart",
        element:<CartPage/>,
        children:[
          {
            index:true,
            element:<CartSpare/>
          },
          {
            path:"cartspare",
            element:<CartSpare/>
          },
          {
            path:"cartservice",
            element:<CartService/>
          }
        ]
      }
      
    ],
  },


  {
    path: "/admin",
    element: <AdminProtected />,
    // element: <AdminWrapper />,
    children: [
      {
        path: "",
        element: <AdminWrapper />,
        children: [
          {
            // path:"catagory",
            index: true,
            // path:"/dashboard",
            element: <SparesAdmin />,
          },
          {
            path:"spares",
            element: <SparesAdmin />,
          },
          {
            path:"services",
            element:<ServiceAdmin/>
          }
        ],
      },
    ],
  },
]);
