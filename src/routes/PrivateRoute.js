import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
const PrivateRoute = () => {
    return isAuthenticated() ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/auth", replace: true });
};
export default PrivateRoute;
