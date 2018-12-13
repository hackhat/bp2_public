var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled from "react-emotion";
import flagImagePath from './flags16.png';
import { flag16pxPositions } from "./flag16pxPositions";
var Image = styled("span")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-block;\n  height: 16px;\n  width: 16px;\n  vertical-align: text-top;\n  line-height: 16px;\n  background: url(\"", "\") no-repeat;\n  background-position-y: ", "px;\n"], ["\n  display: inline-block;\n  height: 16px;\n  width: 16px;\n  vertical-align: text-top;\n  line-height: 16px;\n  background: url(\"", "\") no-repeat;\n  background-position-y: ", "px;\n"])), flagImagePath, function (props) { return props.y; });
export var CountryFlag = function (_a) {
    var countryCode = _a.countryCode;
    var y = flag16pxPositions[countryCode.toLowerCase()] || 0;
    return (React.createElement(Image, { title: countryCode, y: -y }));
};
var templateObject_1;
//# sourceMappingURL=CountryFlag.js.map