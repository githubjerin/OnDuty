import { Navigate, Outlet } from "react-router-dom";

const auth = () => {
    if (sessionStorage.getItem('user') !== 'none')
        return (sessionStorage.getItem('isLoggedIn') === 'false') ? false : true;
    else return false;
};

const ProtectedRoutes = () => {
    const isAuth = auth();
    return isAuth ? <Outlet/> : <Navigate replace={true} to='/'/>
};

export default ProtectedRoutes;