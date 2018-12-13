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
import { keyframes } from "emotion";
var rainbowAnimation = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0% { background-position: 0% 100%; }\n  50% { background-position: 100% 200%; }\n  100% {background-position: 0% 100%; }\n"], ["\n  0% { background-position: 0% 100%; }\n  50% { background-position: 100% 200%; }\n  100% {background-position: 0% 100%; }\n"])));
var pulseAnimation = keyframes(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  0% {\n    box-shadow: 0 0 0 0 rgba(255,255,255, 0.4);\n  }\n  70% {\n    box-shadow: 0 0 0 30px rgba(255,255,255, 0);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(255,255,255, 0);\n  }\n"], ["\n  0% {\n    box-shadow: 0 0 0 0 rgba(255,255,255, 0.4);\n  }\n  70% {\n    box-shadow: 0 0 0 30px rgba(255,255,255, 0);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(255,255,255, 0);\n  }\n"])));
var Text = styled("div")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: white;\n  text-align: center;\n  padding: 5px;\n  background: #000000c2;\n  box-shadow: 0 0 0 rgba(255,255,255, 0.4);\n  animation: ", " 2s infinite;\n  line-height: 1.5;\n  font-size: 12px;\n"], ["\n  color: white;\n  text-align: center;\n  padding: 5px;\n  background: #000000c2;\n  box-shadow: 0 0 0 rgba(255,255,255, 0.4);\n  animation: ", " 2s infinite;\n  line-height: 1.5;\n  font-size: 12px;\n"])), pulseAnimation);
var TextWrapper = styled("div")(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  max-width: 240px;\n  position: absolute;\n  top: ", "px;\n  left: ", "px;\n  background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);\n  background-size: 900% 900%;\n  animation: ", " 9s ease infinite;\n  padding: 3px;\n"], ["\n  max-width: 240px;\n  position: absolute;\n  top: ", "px;\n  left: ", "px;\n  background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);\n  background-size: 900% 900%;\n  animation: ", " 9s ease infinite;\n  padding: 3px;\n"])), function (props) { return props.y; }, function (props) { return props.x; }, rainbowAnimation);
var ClickableContainer = styled("div")(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  pointer-events: all;\n  cursor: pointer;\n"], ["\n  pointer-events: all;\n  cursor: pointer;\n"])));
var LineBackground = styled("line")(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  stroke-width: 5px;\n  stroke: black;\n"], ["\n  stroke-width: 5px;\n  stroke: black;\n"])));
var LineForeground = styled("line")(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  stroke-width: 3px;\n  stroke: white;\n"], ["\n  stroke-width: 3px;\n  stroke: white;\n"])));
var Circle = styled("circle")(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  box-shadow: 0 0 0 rgba(255,255,255, 0.4);\n  fill: white;\n  stroke: black;\n  stroke-width: 1px;\n  r: 10;\n"], ["\n  box-shadow: 0 0 0 rgba(255,255,255, 0.4);\n  fill: white;\n  stroke: black;\n  stroke-width: 1px;\n  r: 10;\n"])));
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            textWidth: 0,
            textHeight: 0,
        };
        _this.onText = function (textElement) {
            _this.textElement = textElement;
        };
        return _this;
    }
    Component.prototype.render = function () {
        var _a = this.props, text = _a.text, textX = _a.textX, textY = _a.textY, targetX = _a.targetX, targetY = _a.targetY, width = _a.width, height = _a.height;
        var _b = this.state, textWidth = _b.textWidth, textHeight = _b.textHeight;
        return (React.createElement(React.Fragment, null,
            React.createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", width: width, height: height },
                React.createElement(LineBackground, { x1: textX, y1: textY, x2: targetX, y2: targetY }),
                React.createElement(LineForeground, { x1: textX, y1: textY, x2: targetX, y2: targetY }),
                React.createElement(Circle, { cx: targetX, cy: targetY })),
            React.createElement(ClickableContainer, { onClick: this.props.closeTutorial },
                React.createElement(TextWrapper, { innerRef: this.onText, x: textX - textWidth / 2, y: textY - textHeight / 2 },
                    React.createElement(Text, null, text),
                    React.createElement(Text, null, "Click to close tutorial.")))));
    };
    Component.prototype.componentDidMount = function () {
        var _this = this;
        this.interval = setInterval(function () { return _this.updateTextSize(); }, 1000 / 60);
    };
    Component.prototype.componentWillUnmount = function () {
        this.interval !== undefined && clearInterval(this.interval);
    };
    Component.prototype.updateTextSize = function () {
        if (this.textElement) {
            var bbox = this.textElement.getBoundingClientRect();
            this.setState({ textWidth: bbox.width, textHeight: bbox.height });
        }
    };
    return Component;
}(React.PureComponent));
export default Component;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=TutorialStep.js.map