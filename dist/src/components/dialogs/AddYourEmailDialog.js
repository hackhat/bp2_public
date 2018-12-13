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
import Dialog from "@material-ui/core/Dialog";
import { connect } from 'react-redux';
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createAppAction } from "../../actions";
import { UserActions } from "../../actions/UserActions";
import { globalServerClientInterface } from "../../networking/globalServerClientInterface";
import { selectors } from "../../reducers";
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "react-emotion";
import { DialogFooterText } from "./DialogFooterText";
var StyledCircularProgress = styled(CircularProgress)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-left: 10px;\n"], ["\n  margin-left: 10px;\n"])));
var AddYourEmailDialogInner = /** @class */ (function (_super) {
    __extends(AddYourEmailDialogInner, _super);
    function AddYourEmailDialogInner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            email: '',
            loading: false,
        };
        _this.onInputChange = function (inputKey) { return function (event) {
            var _a;
            _this.setState(__assign({}, _this.state, (_a = {}, _a[inputKey] = event.target.value, _a)));
        }; };
        _this.onSubmit = function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        return [4 /*yield*/, this.saveEmail()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.saveEmail = function () { return __awaiter(_this, void 0, void 0, function () {
            var currentUser, sessionId, createUserRes, updateUserRes, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.state.email) {
                            return [2 /*return*/, alert("Please add a email")];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        this.setState({ loading: true });
                        currentUser = this.props.currentUser;
                        sessionId = void 0;
                        if (!currentUser) return [3 /*break*/, 2];
                        sessionId = localStorage.getItem('sessionId');
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, globalServerClientInterface('createUser', {
                            userAgent: navigator.userAgent,
                        })];
                    case 3:
                        createUserRes = _a.sent();
                        if (!createUserRes.ok) {
                            this.setState({ loading: false });
                            return [2 /*return*/, alert("Error creating user")];
                        }
                        sessionId = createUserRes.payload.session.id;
                        localStorage.setItem("sessionId", sessionId);
                        _a.label = 4;
                    case 4: return [4 /*yield*/, globalServerClientInterface('updateUser', {
                            sessionId: sessionId,
                            updateUser: { email: this.state.email }
                        })];
                    case 5:
                        updateUserRes = _a.sent();
                        this.setState({ loading: false });
                        if (!updateUserRes.ok) {
                            return [2 /*return*/, alert(updateUserRes.reason)];
                        }
                        this.props.addCurrentUser(updateUserRes.payload.user);
                        this.props.onClose();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        alert("Error creating user");
                        console.error(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    AddYourEmailDialogInner.prototype.render = function () {
        var loading = this.state.loading;
        return (React.createElement(Dialog, { onClose: this.props.onClose, open: this.props.open, maxWidth: "xs" },
            React.createElement("form", { onSubmit: this.onSubmit },
                React.createElement(DialogTitle, null, loading ? 'Adding your email...' : 'Add your full email'),
                React.createElement(DialogContent, null,
                    React.createElement(TextField, { autoFocus: true, margin: "dense", id: "email", label: "Email", type: "text", fullWidth: true, onChange: this.onInputChange('email'), value: this.state.email, tabIndex: 0, disabled: loading })),
                React.createElement(DialogActions, null,
                    React.createElement(Button, { onClick: this.props.onClose, color: "primary", disabled: loading }, "Cancel"),
                    React.createElement(Button, { type: "submit", variant: "contained", onClick: this.saveEmail, color: "primary", disabled: loading },
                        loading ? 'Saving email...' : 'Save my email',
                        loading && React.createElement(StyledCircularProgress, { size: 15 }))),
                loading &&
                    React.createElement(DialogFooterText, { variant: "info" }, "Please wait until we save your email. It might take a few seconds."))));
    };
    return AddYourEmailDialogInner;
}(React.Component));
var mapState = function (state) {
    return {
        currentUser: selectors.ui.global.getCurrentUser(state),
    };
};
var mapDispatch = function (dispatch) {
    return {
        addCurrentUser: function (user) {
            var action = createAppAction(UserActions.addCurrentUser, { user: user });
            dispatch(action);
        },
    };
};
export var AddYourEmailDialog = connect(mapState, mapDispatch)(AddYourEmailDialogInner);
var templateObject_1;
//# sourceMappingURL=AddYourEmailDialog.js.map