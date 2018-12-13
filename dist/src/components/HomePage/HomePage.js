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
import { connect } from 'react-redux';
import { Header } from "../Header";
import styled from "react-emotion";
import { Hero } from "./Hero/Hero";
import { Body } from "./Body";
import { MoreIoGames } from "./MoreIoGames";
var Root = styled('section')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: #091326;\n"], ["\n  background-color: #091326;\n"])));
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.render = function () {
        return (React.createElement(Root, null,
            React.createElement(Header, { inGame: false }),
            React.createElement(Hero, null),
            React.createElement(Body, null),
            React.createElement(MoreIoGames, null)));
    };
    return Component;
}(React.PureComponent));
var mapDispatch = function (dispatch) {
    return {};
};
var mapState = function (state) {
    return {};
};
var ConnectedComponent = connect(mapState, mapDispatch)(Component);
export default ConnectedComponent;
var templateObject_1;
//# sourceMappingURL=HomePage.js.map