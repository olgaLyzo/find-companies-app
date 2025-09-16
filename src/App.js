import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./scss/app.module.scss";
import style from "./scss/main.module.scss";
function App(props) {
    return (_jsxs("div", { className: css.container, children: [_jsx("div", { className: css.header, children: props.headerComponent }), _jsx("main", { className: style.main, children: props.mainComponent })] }));
}
export default App;
