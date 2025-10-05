import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import css from "./scss/app.module.scss";
function App(props) {
    return (_jsx(Router, { children: _jsxs("div", { className: css.container, children: [_jsx("div", { children: props.headerComponent }), _jsx("main", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: props.mainComponent }), _jsx(Route, { path: "/auth", element: props.authorisationComponent })] }) }), _jsx("footer", { children: props.footerComponent })] }) }));
}
export default App;
