import Navbar from "../../Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Footer";

const UserWrapper = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserWrapper;
