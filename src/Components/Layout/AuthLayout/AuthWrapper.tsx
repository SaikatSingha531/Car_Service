import { Outlet } from "react-router-dom"
// import SignupPage from "../../SignupPage"

const AuthWrapper = () => {
  return (
    <>
        {/* <SignupPage/> */}
        <Outlet/>
    </>
  )
}

export default AuthWrapper