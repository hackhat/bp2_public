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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import { connect } from 'react-redux';
import { selectors } from "../../reducers";
import { createAppAction } from "../../actions";
import styled from "react-emotion";
import withMobileDialog from "@material-ui/core/withMobileDialog/withMobileDialog";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import { GlobalUIActions } from "../../actions/GlobalUIActions";
import Typography from "@material-ui/core/Typography/Typography";
import { globalServerClientInterface } from "../../networking/globalServerClientInterface";
var Root = styled("section")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n"], ["\n"])));
var AddMoreMoneyPanelDialog = /** @class */ (function (_super) {
    __extends(AddMoreMoneyPanelDialog, _super);
    function AddMoreMoneyPanelDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddMoreMoneyPanelDialog.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var close = function () { return _this.props.onClose(); };
        var increaseMoney = function () { return __awaiter(_this, void 0, void 0, function () {
            var sessionId, currentAccountId, increasePlayMoneyRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionId = localStorage.getItem('sessionId');
                        if (sessionId === null) {
                            return [2 /*return*/, alert("No sessionId found, login.")];
                        }
                        currentAccountId = this.props.currentAccountId;
                        if (currentAccountId === undefined) {
                            return [2 /*return*/, alert("No currentAccountId found, login.")];
                        }
                        return [4 /*yield*/, globalServerClientInterface('increasePlayMoney', {
                                sessionId: sessionId,
                                accountId: currentAccountId,
                            })];
                    case 1:
                        increasePlayMoneyRes = _a.sent();
                        if (increasePlayMoneyRes.ok) {
                            alert("Play money increased. Play again.");
                            window.location.reload();
                        }
                        else {
                            console.log(increasePlayMoneyRes.err);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        return (React.createElement(Dialog, { open: props.addMoreMoneyPanelState.isVisible, onClose: close, fullScreen: !!props.fullScreen, maxWidth: "sm", fullWidth: true },
            React.createElement(DialogContent, null,
                React.createElement(Typography, { variant: "headline", color: "inherit", align: "left" }, "You need more money"),
                React.createElement(Typography, { variant: "body1", color: "inherit", align: "left" }, "Click to increase the money on your account. Is free money, you will not need to pay anything."),
                React.createElement("br", null),
                React.createElement(Button, { onClick: increaseMoney, color: "primary", fullWidth: true, variant: "contained" }, "Increase money")),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: close, color: "primary" }, "Done"))));
    };
    return AddMoreMoneyPanelDialog;
}(React.PureComponent));
var mapDispatch = function (dispatch) {
    return {
        onClose: function () {
            var action = createAppAction(GlobalUIActions.setVisibilityForAddMoreMoneyPanel, {
                isVisible: false,
            });
            dispatch(action);
        },
    };
};
var mapState = function (state) {
    return {
        addMoreMoneyPanelState: selectors.ui.global.getAddMoreMoneyPanelState(state),
        currentAccountId: selectors.ui.global.getCurrentAccountId(state),
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(AddMoreMoneyPanelDialog);
export default withMobileDialog({ breakpoint: 'xs' })(ConnectedComponent);
var templateObject_1;
// export default ConnectedComponent;
//# sourceMappingURL=AddMoreMoneyPanelDialog.js.map