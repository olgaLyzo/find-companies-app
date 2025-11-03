import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import css from "./scss/app.module.scss";
import { isAuthenticated } from "./utils/auth";
import { AuthProvider } from "./context/AuthContext";
export function PrivateRoute() {
    return isAuthenticated() ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/auth" });
}
function App(props) {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsxs("div", { className: css.container, children: [_jsx("header", { children: props.headerComponent }), _jsx("main", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: props.mainComponent }), _jsxs(Route, { element: _jsx(PrivateRoute, {}), children: [_jsx(Route, { path: "/search", element: props.pageSearchingComponent }), _jsx(Route, { path: "/articles", element: props.articlesPageComponent })] }), _jsx(Route, { path: "/auth", element: props.authorisationComponent }), _jsx(Route, { path: "/login", element: props.authorisationComponent })] }) }), _jsx("footer", { children: props.footerComponent })] }) }) }));
}
export default App;
