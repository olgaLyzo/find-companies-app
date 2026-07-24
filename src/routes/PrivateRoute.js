import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/auth", replace: true });
};
export default PrivateRoute;
