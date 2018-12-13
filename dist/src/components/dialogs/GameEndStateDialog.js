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
import { connect } from 'react-redux';
import { selectors } from "../../reducers/index";
import { GameStatus } from "../../interfaces";
import styled from "react-emotion";
import DialogContent from "@material-ui/core/DialogContent";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import cupImageUrl from '../cup.png';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
var TabContainer = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  overflow-x: auto;\n"], ["\n  overflow-x: auto;\n"])));
var StatusBox = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 10px;\n"], ["\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 10px;\n"])));
var OnlineStatus = styled(StatusBox)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: green;\n"], ["\n  background-color: green;\n"])));
var OfflineStatus = styled(StatusBox)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background-color: red;\n"], ["\n  background-color: red;\n"])));
var Name = styled('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: inline-block;\n"], ["\n  display: inline-block;\n"])));
var WinnerSection = styled("section")(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"])));
var WinnerName = styled("span")(templateObject_7 || (templateObject_7 = __makeTemplateObject(["    \n  font-size: 28px;\n  font-weight: bold;\n  padding: 10px;\n"], ["    \n  font-size: 28px;\n  font-weight: bold;\n  padding: 10px;\n"])));
var NormalPlayerName = styled("p")(templateObject_8 || (templateObject_8 = __makeTemplateObject(["    \n  font-size: 12px;\n  padding: 5px;\n"], ["    \n  font-size: 12px;\n  padding: 5px;\n"])));
var CupImage = styled("img")(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  width: 100%;\n  max-width: 256px;\n  padding-top: 10px;\n"], ["\n  width: 100%;\n  max-width: 256px;\n  padding-top: 10px;\n"])));
var GameEndStateDialog = /** @class */ (function (_super) {
    __extends(GameEndStateDialog, _super);
    function GameEndStateDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    GameEndStateDialog.prototype.render = function () {
        var _a = this.props, scoreBoardData = _a.scoreBoardData, fullScreen = _a.fullScreen;
        var firstPlayer = scoreBoardData[0], otherPlayers = scoreBoardData.slice(1);
        return (React.createElement(Dialog, { open: this.props.isOpen, fullScreen: !!fullScreen },
            React.createElement(DialogTitle, null, "Match end score board"),
            React.createElement(DialogContent, null,
                React.createElement(DialogContentText, null, "Below are the winners of the previous match."),
                React.createElement(DialogContentText, null, "A new match will start soon."),
                React.createElement(WinnerSection, null,
                    React.createElement(CupImage, { src: cupImageUrl }),
                    React.createElement(WinnerName, null,
                        "#1. ",
                        firstPlayer ? firstPlayer.name : 'Nobody',
                        ": ",
                        firstPlayer ? firstPlayer.planetsOwned : 0,
                        " planets of ",
                        firstPlayer ? firstPlayer.totalPlanets : 0)),
                otherPlayers.map(function (scoreBoardItem, i) {
                    return (React.createElement(NormalPlayerName, { key: scoreBoardItem.playerId },
                        "#",
                        i + 2,
                        ". ",
                        scoreBoardItem.name,
                        ": ",
                        scoreBoardItem.planetsOwned,
                        " planets of ",
                        scoreBoardItem.totalPlanets));
                }))));
    };
    return GameEndStateDialog;
}(React.Component));
var emptyScoreBoardData = [];
var mapDispatch = function (dispatch) {
    return {};
};
var mapState = function (state) {
    var gameStatus = selectors.system.getGameStatus(state);
    var isOpen = gameStatus === GameStatus.ended;
    return {
        scoreBoardData: isOpen ? selectors.advanced.getScoreBoardData(state) : emptyScoreBoardData,
        isOpen: isOpen,
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(GameEndStateDialog);
export default withMobileDialog({ breakpoint: 'xs' })(ConnectedComponent);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=GameEndStateDialog.js.map