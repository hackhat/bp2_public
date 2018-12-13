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
import { createAppAction } from "../actions";
import { selectors } from "../reducers";
import Snackbar from "@material-ui/core/Snackbar";
import { ToastActions } from "../actions/ToastActions";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { css } from "emotion";
var variants = {
    info: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background: #404040;\n  "], ["\n    background: #404040;\n  "]))),
    error: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    background: #983535;\n  "], ["\n    background: #983535;\n  "])))
};
var classes = {
    root: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n   padding: 1px 5px;\n   cursor: pointer;\n  "], ["\n   padding: 1px 5px;\n   cursor: pointer;\n  "]))),
    message: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    padding: 0;\n   pointer-events: none;\n  "], ["\n    padding: 0;\n   pointer-events: none;\n  "]))),
};
var messageText = css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-size: 12px;\n"], ["\n  font-size: 12px;\n"])));
var CustomSnackbarContent = function (_a) {
    var toast = _a.toast, handleClose = _a.handleClose;
    return (React.createElement(SnackbarContent, { onClick: handleClose, className: variants[toast.variant], classes: classes, "aria-describedby": "message-id", message: React.createElement("span", { id: "message-id", className: messageText }, toast ? toast.text : '') }));
};
var Toasts = /** @class */ (function (_super) {
    __extends(Toasts, _super);
    function Toasts() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.handleClose = function () {
            _this.props.removeLastToast();
        };
        return _this;
    }
    Toasts.prototype.render = function () {
        var toast = this.props.toast;
        return (React.createElement(Snackbar, { anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            }, open: !!toast, autoHideDuration: this.getAutoHideDuration(), onClose: this.handleClose }, toast && React.createElement(CustomSnackbarContent, { toast: toast, handleClose: this.handleClose })));
    };
    Toasts.prototype.getAutoHideDuration = function () {
        var toast = this.props.toast;
        if (!toast) {
            return undefined;
        }
        if (toast.autoClose) {
            return 3000;
        }
        return undefined;
    };
    return Toasts;
}(React.Component));
var mapState = function (state) {
    return {
        toast: selectors.toasts.getLastToast(state),
    };
};
var mapDispatch = function (dispatch) {
    return {
        removeLastToast: function () {
            dispatch(createAppAction(ToastActions.removeLastToast, null));
        }
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(Toasts);
export default ConnectedComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=Toasts.js.map