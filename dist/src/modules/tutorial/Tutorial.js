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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import styled from "react-emotion";
import TutorialStepComponent from './TutorialStep';
var Root = styled("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n  z-index: 1200;\n  overflow: hidden;\n"], ["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n  z-index: 1200;\n  overflow: hidden;\n"])));
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            width: 0,
            height: 0,
        };
        _this.tick = function () {
            _this.updateRootElementSize();
        };
        _this.onRoot = function (root) {
            _this.rootElement = root;
        };
        return _this;
    }
    Component.prototype.render = function () {
        var _a = this.props, targetX = _a.targetX, targetY = _a.targetY, text = _a.text;
        var _b = this.state, width = _b.width, height = _b.height;
        var textPos;
        if (targetY > height / 2) {
            textPos = this.getTopLocation();
        }
        else {
            textPos = this.getBottomLocation();
        }
        var props = {
            width: width,
            height: height,
            textX: textPos.x,
            textY: textPos.y,
            targetX: targetX,
            targetY: targetY,
            text: text,
            closeTutorial: this.props.closeTutorial,
        };
        return (React.createElement(Root, { innerRef: this.onRoot },
            React.createElement(TutorialStepComponent, __assign({}, props))));
    };
    Component.prototype.componentDidMount = function () {
        this.interval = setInterval(this.tick, 1000 / 3);
    };
    Component.prototype.componentWillUnmount = function () {
        this.interval !== undefined && clearInterval(this.interval);
    };
    Component.prototype.updateRootElementSize = function () {
        if (this.rootElement) {
            var bbox = this.rootElement.getBoundingClientRect();
            this.setState({ width: bbox.width, height: bbox.height });
        }
    };
    Component.prototype.getTopLocation = function () {
        var _a = this.state, width = _a.width, height = _a.height;
        return {
            x: width / 2,
            y: height / 6,
        };
    };
    Component.prototype.getBottomLocation = function () {
        var _a = this.state, width = _a.width, height = _a.height;
        return {
            x: width / 2,
            y: height / 2 + height / 6,
        };
    };
    return Component;
}(React.PureComponent));
export default Component;
var templateObject_1;
//# sourceMappingURL=Tutorial.js.map