var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import * as React from "react";
import { css } from "react-emotion";
var classes = {
    info: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    font-size: 12px;\n    color: rgba(0, 0, 0, 0.54);\n  "], ["\n    font-size: 12px;\n    color: rgba(0, 0, 0, 0.54);\n  "]))),
    error: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-size: 12px;\n    color: #983535;\n    font-weight: bold;\n  "], ["\n    font-size: 12px;\n    color: #983535;\n    font-weight: bold;\n  "]))),
};
export var DialogFooterText = function (_a) {
    var children = _a.children, variant = _a.variant;
    return (React.createElement(DialogContent, null,
        React.createElement(DialogContentText, { className: classes[variant] }, children)));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=DialogFooterText.js.map