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
import styled from 'react-emotion';
import { css } from 'emotion';
import { ConnectionStatus } from "../interfaces";
import { selectors } from "../reducers";
import { connect } from 'react-redux';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Authentication from "./dialogs/Authentication";
import RoomSelection from "./dialogs/RoomSelection";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { HowToPlayDialog } from "./dialogs/HowToPlayDialog";
import { AddYourNameDialog } from "./dialogs/AddYourNameDialog";
import RoomInfoDialog from "./dialogs/RoomInfoDialog";
import GameEndStateDialog from "./dialogs/GameEndStateDialog";
import logoFullImageUrl from '../icons/Planets_logoFull.png';
import logoSquareWhite64ImageUrl from '../icons/Planets_logoSquareWhite_64.png';
import { Link } from 'react-router-dom';
import componentQueries from 'react-component-queries';
import { formatMoney } from "../utils/formatMoney";
import { formatResources } from "../utils/formatResources";
var nameClassName = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n"], ["\n  flex: 1;\n"])));
var IconButtonWrapper = styled(IconButton)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: white;\n  margin-left: 10px;\n"], ["\n  color: white;\n  margin-left: 10px;\n"])));
var HeaderSpacer = styled('div')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  @media (max-width: 600px){\n    height: 56px;\n  }\n  @media (min-width: 600px){\n    height: 64px;\n  }\n  width: 100%;\n"], ["\n  @media (max-width: 600px){\n    height: 56px;\n  }\n  @media (min-width: 600px){\n    height: 64px;\n  }\n  width: 100%;\n"])));
var LogoImage = styled("img")(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 16px;\n  margin-top: 3px;\n"], ["\n  height: 16px;\n  margin-top: 3px;\n"])));
var LogoWrapper = styled("div")(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  flex: 1;\n"], ["\n  flex: 1;\n"])));
var DepositSpan = styled("span")(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-size: 67%;\n"], ["\n  font-size: 67%;\n"])));
var HeaderInner = /** @class */ (function (_super) {
    __extends(HeaderInner, _super);
    function HeaderInner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isLoginDialogOpen: false,
            roomSelectionDialogOpen: undefined,
            anchorEl: undefined,
            howToPlayDialogOpen: false,
            roomInfoDialogOpen: false,
        };
        _this.onLoginClick = function () {
            _this.setState({ isLoginDialogOpen: true });
        };
        _this.onPlayClick = function () {
            _this.setState({ roomSelectionDialogOpen: true });
        };
        _this.renderToolbar = function () {
            var _a = _this.props, currentPlayer = _a.currentPlayer, currentAccount = _a.currentAccount, currentUser = _a.currentUser, inGame = _a.inGame, size = _a.size;
            var anchorEl = _this.state.anchorEl;
            var menuIsOpen = Boolean(anchorEl);
            var logoImage = size === 'narrow' ? logoSquareWhite64ImageUrl : logoFullImageUrl;
            var moneyElement = (React.createElement("span", null,
                React.createElement("span", { title: "Money in this match" }, currentPlayer ? formatMoney(currentPlayer.availableMoneyAmountInCents + currentPlayer.depositAmountInCents, true) : 0),
                currentPlayer && currentPlayer.depositAmountInCents !== 0 ?
                    React.createElement(DepositSpan, { title: "Deposit in this match" },
                        "-",
                        formatMoney(currentPlayer.depositAmountInCents, false)) : ''));
            return (React.createElement(Toolbar, null,
                React.createElement(LogoWrapper, null,
                    React.createElement(Link, { to: "/" },
                        React.createElement(LogoImage, { src: logoImage }))),
                inGame && !(currentPlayer && currentPlayer.online) &&
                    React.createElement(Button, { variant: "contained", onClick: _this.onPlayClick }, "Play"),
                inGame && currentUser &&
                    React.createElement(Typography, { variant: "subheading", color: "inherit", align: "right", className: nameClassName },
                        React.createElement("span", { title: "Name" }, currentUser.name),
                        " ",
                        "(",
                        moneyElement,
                        ", ",
                        React.createElement("span", { title: "Resources" }, formatResources(currentPlayer ? currentPlayer.resources : 0)),
                        ")"),
                React.createElement(IconButtonWrapper, { "aria-label": "More", "aria-owns": anchorEl ? 'long-menu' : undefined, "aria-haspopup": "true", onClick: _this.handleClick },
                    React.createElement(MoreVertIcon, null)),
                React.createElement(Menu, { anchorEl: anchorEl, anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }, transformOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }, open: menuIsOpen, onClose: _this.handleClose },
                    (!currentUser || !currentUser.email) &&
                        React.createElement(MenuItem, { onClick: _this.onLoginClick }, "Register or Login"),
                    inGame && React.createElement(MenuItem, { onClick: function () { return _this.onMenuClick("roomInfo"); } }, "Room players"),
                    React.createElement(MenuItem, { onClick: function () { return _this.onMenuClick("openRoomSelection"); } }, "Room selection"),
                    React.createElement(MenuItem, { onClick: function () { return _this.onMenuClick("howToPlay"); } }, "How to play?"),
                    React.createElement(MenuItem, { onClick: function () { return _this.onMenuClick("reddit"); } }, "Follow on Reddit"),
                    currentUser && React.createElement(MenuItem, { onClick: function () { return _this.onMenuClick("logout"); } }, "Logout"))));
        };
        _this.handleClick = function (event) {
            _this.setState({ anchorEl: event.currentTarget });
        };
        _this.handleClose = function () {
            _this.setState({ anchorEl: null });
        };
        _this.onMenuClick = function (menuItemId) {
            _this.handleClose();
            if (menuItemId === 'howToPlay') {
                _this.setState({ howToPlayDialogOpen: true });
            }
            else if (menuItemId === 'logout') {
                localStorage.removeItem('sessionId');
                window.location.reload();
            }
            else if (menuItemId === 'reddit') {
                window.open("https://www.reddit.com/r/bitplanets/");
            }
            else if (menuItemId === 'roomInfo') {
                _this.setState({ roomInfoDialogOpen: true });
            }
            else if (menuItemId === 'openRoomSelection') {
                _this.setState({ roomSelectionDialogOpen: true });
            }
        };
        _this.onRoomInfoDialogClose = function () {
            _this.setState({ roomInfoDialogOpen: false });
        };
        _this.onHowToPlayDialogClose = function () {
            _this.setState({ howToPlayDialogOpen: false });
        };
        _this.handleLoginDialogClose = function () {
            _this.setState({ isLoginDialogOpen: false });
        };
        _this.handleRoomSelectionDialogClose = function () {
            _this.setState({ roomSelectionDialogOpen: false });
        };
        return _this;
    }
    HeaderInner.prototype.isLoaded = function () {
        return true;
    };
    HeaderInner.prototype.render = function () {
        var _a = this.props, currentUser = _a.currentUser, currentUserStatus = _a.currentUserStatus, currentPlayer = _a.currentPlayer, connectionStatus = _a.connectionStatus, inGame = _a.inGame;
        var isReconnecting = connectionStatus === ConnectionStatus.reconnecting;
        var showLoadingDialog = !this.isLoaded() || isReconnecting;
        var roomSelectionIsOpen = inGame && !showLoadingDialog && (!(currentPlayer && currentPlayer.online) && (this.state.roomSelectionDialogOpen === undefined || this.state.roomSelectionDialogOpen)) || this.state.roomSelectionDialogOpen;
        var showAddYourNameDialog = inGame && !showLoadingDialog && currentUserStatus === 'none' && (!currentUser || currentUser.name === undefined);
        return (React.createElement(React.Fragment, null,
            React.createElement(AppBar, null,
                this.renderToolbar(),
                React.createElement(Authentication, { open: this.state.isLoginDialogOpen, onClose: this.handleLoginDialogClose }),
                React.createElement(RoomSelection, { open: roomSelectionIsOpen, onClose: this.handleRoomSelectionDialogClose }),
                React.createElement(HowToPlayDialog, { open: this.state.howToPlayDialogOpen, onClose: this.onHowToPlayDialogClose }),
                React.createElement(AddYourNameDialog, { open: showAddYourNameDialog, onLogin: this.onLoginClick }),
                React.createElement(RoomInfoDialog, { open: this.state.roomInfoDialogOpen, onClose: this.onRoomInfoDialogClose }),
                React.createElement(GameEndStateDialog, null)),
            React.createElement(HeaderSpacer, null)));
    };
    return HeaderInner;
}(React.Component));
var mapState = function (state) {
    return {
        playersById: selectors.players.getPlayersById(state),
        currentPlayer: selectors.ui.global.getCurrentPlayer(state),
        currentUserStatus: selectors.ui.global.getCurrentUserStatus(state),
        planetsById: selectors.planets.getPlanetsById(state),
        currentUser: selectors.ui.global.getCurrentUser(state),
        currentAccount: selectors.ui.global.getCurrentAccount(state),
        connectionStatus: selectors.ui.global.getConnectionStatus(state),
        depositAmountInCents: selectors.ui.global.getCurrentAccountDeposit(state),
    };
};
var ConnectedComponent = connect(mapState)(HeaderInner);
var query = function (_a) {
    var width = _a.width;
    return ({ size: width < 500 ? 'narrow' : 'wide' });
};
export var Header = componentQueries(query)(ConnectedComponent);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=Header.js.map