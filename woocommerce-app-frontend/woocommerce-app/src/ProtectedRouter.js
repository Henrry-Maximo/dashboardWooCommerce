import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouter() {
    const isAuth = userAuth();
    return (
        isAuth ? <Outlet to="/dashboard" /> : <Navigate to="/login" />
    );
};

function userAuth() {
    const user = sessionStorage.getItem("login");
    return user && user;
};

export default ProtectedRouter;
