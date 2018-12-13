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
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { createAppAction } from "../../actions";
import { selectors } from "../../reducers";
import { SystemActions } from "../../actions/SystemActions";
var RoomSelection = /** @class */ (function (_super) {
    __extends(RoomSelection, _super);
    function RoomSelection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    RoomSelection.prototype.render = function () {
        var _this = this;
        return (React.createElement(Dialog, { onClose: this.props.onClose, open: this.props.open, maxWidth: "xs" },
            React.createElement(DialogTitle, { id: "alert-dialog-title" }, "Play a game!"),
            React.createElement(DialogContent, null,
                React.createElement(DialogContentText, null, "Click on a room below to join a game.")),
            React.createElement(DialogActions, null,
                React.createElement(Button, { variant: "contained", onClick: function () { return _this.onRoomSelected("s01"); }, color: "primary" }, "Room 1"),
                React.createElement(Button, { variant: "contained", onClick: function () { return _this.onRoomSelected("s02"); }, color: "primary" }, "Room 2"))));
    };
    RoomSelection.prototype.onRoomSelected = function (roomId) {
        var _a = this.props, currentUser = _a.currentUser, currentAccountId = _a.currentAccountId, clientId = _a.clientId;
        if (!currentUser) {
            return alert("You need to have an user to continue.");
        }
        if (!currentUser.name) {
            return alert("You need to have a name to the user to continue.");
        }
        if (!currentAccountId) {
            return alert("You need to have a selected account to continue.");
        }
        if (!clientId) {
            return alert("You need to have a clientId to continue.");
        }
        var sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            return alert("You need to have a sessionId to continue.");
        }
        this.props.loginRoom(clientId, sessionId, currentAccountId, roomId);
        this.props.onClose();
    };
    return RoomSelection;
}(React.Component));
var mapState = function (state) {
    return {
        currentUser: selectors.ui.global.getCurrentUser(state),
        currentAccountId: selectors.ui.global.getCurrentAccountId(state),
        clientId: selectors.ui.global.getCurrentClientId(state),
    };
};
var mapDispatch = function (dispatch) {
    return {
        loginRoom: function (clientId, sessionId, accountId, roomId) {
            var connectAction = createAppAction(SystemActions.requestConnectToRoom, {
                roomId: roomId,
                clientId: clientId,
                sessionId: sessionId,
                accountId: accountId,
            });
            dispatch(connectAction);
        },
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(RoomSelection);
export default ConnectedComponent;
//# sourceMappingURL=RoomSelection.js.map