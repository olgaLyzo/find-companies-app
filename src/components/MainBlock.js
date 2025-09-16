import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "../scss/main.module.scss";
import Card from "./Card";
import Image from "./Image";
import { tarifRequest } from "./tarifRequest";
const MainBlock = ({ сardComponent, imageComponent, }) => {
    console.log(tarifRequest[0].title);
    return (_jsxs("div", { className: css.main_block, children: [_jsx("h2", { className: css.title, children: "C\u0435\u0440\u0432\u0438\u0441 \u043F\u043E \u043F\u043E\u0438\u0441\u043A\u0443 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439 \u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u043F\u043E \u0435\u0433\u043E \u0418\u041D\u041D" }), _jsx("p", { children: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u044B\u0439 \u0430\u043D\u0430\u043B\u0438\u0437 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 PDF \u043D\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0443\u044E \u043F\u043E\u0447\u0442\u0443." }), _jsx("button", { className: css.get_info_btn, children: "\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435" }), _jsx(Image, {}), _jsx("h2", { className: css.title, children: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0438\u043C\u0435\u043D\u043D\u043E \u043C\u044B" }), tarifRequest.map((tarif, index) => {
                return (_jsx(Card, { ...tarif }, index));
            })] }));
};
export default MainBlock;
