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
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import styled from "react-emotion";
import LinearProgress from '@material-ui/core/LinearProgress';
import { DialogFooterText } from "./DialogFooterText";
var StyledLinearProgress = styled(LinearProgress)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: 15px;\n"], ["\n  margin-top: 15px;\n"])));
var RedText = styled("span")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: #983535;\n"], ["\n  color: #983535;\n"])));
var LoadingDialog = /** @class */ (function (_super) {
    __extends(LoadingDialog, _super);
    function LoadingDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tooSlowMessage: false,
        };
        return _this;
    }
    LoadingDialog.prototype.render = function () {
        var modulesLoading = this.props.modulesLoading;
        var tooSlowMessage = this.state.tooSlowMessage;
        var listOfModulesLoading = Object.keys(modulesLoading).filter(function (key) {
            return modulesLoading[key];
        });
        var open = listOfModulesLoading.length > 0;
        return (React.createElement(Dialog, { open: open, maxWidth: "xs" },
            React.createElement(DialogTitle, { id: "alert-dialog-title" }, "Game is loading..."),
            React.createElement(DialogContent, null,
                React.createElement(DialogContentText, null, "Please wait until the game is loaded. If is not loading please contact admin at: admin@bitplanets.com"),
                React.createElement(DialogContentText, null,
                    "Loading: ",
                    listOfModulesLoading.join(', '),
                    "."),
                React.createElement(StyledLinearProgress, { variant: "query" })),
            tooSlowMessage && React.createElement(DialogFooterText, { variant: "error" },
                React.createElement(RedText, null, "Looks like is taking longer because of your location and number of players. Don't worry it will load soon, please be patient (don't change the tab)."))));
    };
    LoadingDialog.prototype.componentWillReceiveProps = function (nextProps) {
        if (!this.props.open && nextProps.open) {
            this.setState({ tooSlowMessage: false });
            this.startTimeout();
        }
    };
    LoadingDialog.prototype.startTimeout = function () {
        var _this = this;
        this.clearTimeout();
        this.timeout = setTimeout(function () {
            _this.setState({ tooSlowMessage: true });
        }, 500 + Math.random() * 500);
    };
    LoadingDialog.prototype.clearTimeout = function () {
        if (this.timeout === undefined) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
    };
    LoadingDialog.prototype.componentDidMount = function () {
        if (this.props.open) {
            this.startTimeout();
        }
    };
    LoadingDialog.prototype.componentWillUnmount = function () {
        this.clearTimeout();
    };
    return LoadingDialog;
}(React.PureComponent));
export { LoadingDialog };
var templateObject_1, templateObject_2;
//# sourceMappingURL=LoadingDialog.js.map