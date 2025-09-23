import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./scss/app.module.scss";
function App(props) {
    return (_jsxs("div", { className: css.container, children: [_jsx("div", { children: props.headerComponent }), _jsx("main", { children: props.mainComponent }), _jsx("footer", { children: props.footerComponent })] }));
}
export default App;
