var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import styled from "react-emotion";
var Root = styled("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  @media (max-width: 720px) {\n    display: none;\n  }\n"], ["\n  @media (max-width: 720px) {\n    display: none;\n  }\n"])));
var Link = styled("a")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: white;\n  padding: 5px;\n  position: fixed;\n  right: 0;\n  bottom: 119px;\n  background: black;\n  border-radius: 5px 0 0 0;\n  font-size: 16px;\n  z-index: 999;\n"], ["\n  color: white;\n  padding: 5px;\n  position: fixed;\n  right: 0;\n  bottom: 119px;\n  background: black;\n  border-radius: 5px 0 0 0;\n  font-size: 16px;\n  z-index: 999;\n"])));
var IoGamesWidget = styled("iframe")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: fixed;\n  right: -5px;\n  bottom: -2px;\n  transform: scale(0.95);\n"], ["\n  position: fixed;\n  right: -5px;\n  bottom: -2px;\n  transform: scale(0.95);\n"])));
var MoreIoGames = /** @class */ (function (_super) {
    __extends(MoreIoGames, _super);
    function MoreIoGames() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoreIoGames.prototype.render = function () {
        return (React.createElement(Root, null,
            React.createElement(Link, { href: "https://iogames.space", target: "_blank" }, "More .io Games"),
            React.createElement(IoGamesWidget, { id: "IOG_CP", scrolling: "no", frameBorder: "0", width: "220", height: "125", src: "http://viral.iogames.space" })));
    };
    return MoreIoGames;
}(React.PureComponent));
export { MoreIoGames };
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=MoreIoGames.js.map