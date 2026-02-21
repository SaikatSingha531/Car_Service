import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../Hooks/Utils/redux";
// import { useAppSeletor } from "../../Hooks/utils/redux";

const AdminProtected = () => {
    const { role } = useAppSelector((state) => state.auth);


    return (
        role === "admin" ? <Outlet /> : <Navigate to="/login" />
    )
};

export default AdminProtected;