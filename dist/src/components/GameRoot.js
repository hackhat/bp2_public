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
import { ConnectionStatus, LoadingStatus } from "../interfaces";
import { Header } from "./Header";
import styled from "react-emotion";
import Toolbox from "./Toolbox/Toolbox";
import OverlayScoreBoard from "./dialogs/OverlayScoreBoard";
import Chat from "./Chat/Chat";
import Game from "./PlanetMap/phaser/PlanetMap";
import componentQueries from 'react-component-queries';
import { AddYourEmailDialog } from "./dialogs/AddYourEmailDialog";
import { SystemActions } from "../actions/SystemActions";
import UpgradesPanelDialog from './Upgrades/UpgradesPanelDialog';
import AddMoreMoneyPanelDialog from './AddMoreMoney/AddMoreMoneyPanelDialog';
var GameWrapper = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  @media (max-width: 600px){\n    top: 56px;\n  }\n  @media (min-width: 600px){\n    top: 64px;\n  }\n  bottom: 0;\n  right: 0;\n  left: 0;\n"], ["\n  position: absolute;\n  @media (max-width: 600px){\n    top: 56px;\n  }\n  @media (min-width: 600px){\n    top: 64px;\n  }\n  bottom: 0;\n  right: 0;\n  left: 0;\n"])));
var ToolboxWrapper = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  bottom: 23px;\n  right: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  pointer-events: none;\n"], ["\n  position: absolute;\n  bottom: 23px;\n  right: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  pointer-events: none;\n"])));
var ScoreBoardWrapper = styled("div")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  right: 1px;\n  z-index: 1;\n"], ["\n  position: absolute;\n  top: 0;\n  right: 1px;\n  z-index: 1;\n"])));
var ChatWrapper = styled("div")(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: absolute;\n  bottom: 100px;\n  right: 1px;\n  z-index: 1;\n  max-width: 250px;\n  height: 200px;\n"], ["\n  position: absolute;\n  bottom: 100px;\n  right: 1px;\n  z-index: 1;\n  max-width: 250px;\n  height: 200px;\n"])));
var Root = styled('section')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n"], ["\n  width: 100%;\n  height: 100%;\n"])));
var GameRoot = /** @class */ (function (_super) {
    __extends(GameRoot, _super);
    function GameRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameRoot.prototype.render = function () {
        var _a = this.props, size = _a.size, requestEmailDialogIsOpen = _a.requestEmailDialogIsOpen;
        var loadingStatus = this.getLoadingStatus();
        return (React.createElement(Root, null,
            React.createElement(Header, { inGame: true }),
            React.createElement(AddYourEmailDialog, { open: requestEmailDialogIsOpen, onClose: this.props.onAddYourEmailDialogClose }),
            React.createElement(GameWrapper, null,
                React.createElement(Game, null),
                size === "wide" && (React.createElement(ScoreBoardWrapper, null,
                    React.createElement(OverlayScoreBoard, null))),
                size === "wide" && (React.createElement(ChatWrapper, null,
                    React.createElement(Chat, null)))),
            React.createElement(ToolboxWrapper, null,
                React.createElement(Toolbox, null)),
            React.createElement(UpgradesPanelDialog, null),
            React.createElement(AddMoreMoneyPanelDialog, null)));
    };
    GameRoot.prototype.getLoadingStatus = function () {
        var hasCurrentUser = this.props.currentUser === undefined;
        var isReconnecting = this.props.connectionStatus === ConnectionStatus.reconnecting;
        var isPlanetMapLoading = this.props.planetMapLoadingStatus === LoadingStatus.loading;
        var isPlayerRoomLoginLoading = this.props.playerRoomLoginLoadingStatus === LoadingStatus.loading;
        var isPlayerRequestStartGameLoading = this.props.playerRequestStartGameLoadingStatus === LoadingStatus.loading;
        var modulesLoading = {
            hasCurrentUser: hasCurrentUser,
            isReconnecting: isReconnecting,
            isPlanetMapLoading: isPlanetMapLoading,
            isPlayerRoomLoginLoading: isPlayerRoomLoginLoading,
            isPlayerRequestStartGameLoading: isPlayerRequestStartGameLoading,
        };
        var isLoading = hasCurrentUser || isReconnecting || isPlanetMapLoading || isPlayerRoomLoginLoading || isPlayerRequestStartGameLoading;
        return { isLoading: !isLoading, modulesLoading: modulesLoading };
    };
    return GameRoot;
}(React.PureComponent));
var mapDispatch = function (dispatch) {
    return {
        onAddYourEmailDialogClose: function () {
            var action = createAppAction(SystemActions.setRequestEmailDialogVisibility, {
                isVisible: false,
            });
            dispatch(action);
        },
    };
};
var mapState = function (state) {
    return {
        planetMapLoadingStatus: selectors.ui.planetMap.getPlanetsMapUILoadingStatus(state),
        playerRoomLoginLoadingStatus: selectors.ui.global.getPlayerRoomLoginLoadingStatus(state),
        connectionStatus: selectors.ui.global.getConnectionStatus(state),
        playerRequestStartGameLoadingStatus: selectors.ui.global.getPlayerRequestStartGameLoadingStatus(state),
        requestEmailDialogIsOpen: selectors.ui.global.getRequestEmailDialogIsOpen(state),
        ui: selectors.ui.planetMap.getUI(state),
        currentUser: selectors.ui.global.getCurrentUser(state),
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(GameRoot);
var query = function (_a) {
    var width = _a.width;
    return ({ size: width < 500 ? 'narrow' : 'wide' });
};
export default componentQueries(query)(ConnectedComponent);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=GameRoot.js.map