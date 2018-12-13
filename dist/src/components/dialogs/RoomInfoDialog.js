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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { selectors } from "../../reducers/index";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from "react-emotion";
import { formatPercent } from "../../utils/formatPercent";
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { formatMoney } from "../../utils/formatMoney";
import { formatResources } from "../../utils/formatResources";
var TabContainer = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  overflow-x: auto;\n"], ["\n  overflow-x: auto;\n"])));
var StatusBox = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 10px;\n"], ["\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 10px;\n"])));
var OnlineStatus = styled(StatusBox)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: green;\n"], ["\n  background-color: green;\n"])));
var OfflineStatus = styled(StatusBox)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background-color: red;\n"], ["\n  background-color: red;\n"])));
var Name = styled('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: inline-block;\n  word-wrap: break-word;\n"], ["\n  display: inline-block;\n  word-wrap: break-word;\n"])));
var RoomInfoDialog = /** @class */ (function (_super) {
    __extends(RoomInfoDialog, _super);
    function RoomInfoDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedTabId: 'players',
        };
        _this.onTabChange = function (event, selectedTabId) {
            _this.setState({ selectedTabId: selectedTabId });
        };
        return _this;
    }
    RoomInfoDialog.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(Tabs, { value: this.state.selectedTabId, onChange: this.onTabChange, indicatorColor: "primary", textColor: "primary", fullWidth: true },
                React.createElement(Tab, { label: "Players", value: "players" })),
            this.state.selectedTabId === 'players' && this.renderPlayersTab()));
    };
    RoomInfoDialog.prototype.renderPlayersTab = function () {
        return (React.createElement(TabContainer, null,
            React.createElement(Table, null,
                React.createElement(TableHead, null,
                    React.createElement(TableRow, null,
                        React.createElement(TableCell, null, "Name"),
                        React.createElement(TableCell, { numeric: true }, "Percent dominated"),
                        React.createElement(TableCell, { numeric: true }, "Planets owned"),
                        React.createElement(TableCell, { numeric: true }, "Money + Deposit"),
                        React.createElement(TableCell, { numeric: true }, "Deposit"),
                        React.createElement(TableCell, { numeric: true }, "Resources"))),
                React.createElement(TableBody, null, this.props.scoreBoardData.map(function (scoreBoardItem) {
                    return (React.createElement(TableRow, { key: scoreBoardItem.playerId },
                        React.createElement(TableCell, { component: "th", scope: "row" },
                            scoreBoardItem.online ? React.createElement(OnlineStatus, null) : React.createElement(OfflineStatus, null),
                            React.createElement(Name, null, scoreBoardItem.name ? scoreBoardItem.name.slice(0, 20) : 'Unnamed')),
                        React.createElement(TableCell, { numeric: true }, formatPercent(scoreBoardItem.percentDominated)),
                        React.createElement(TableCell, { numeric: true }, scoreBoardItem.planetsOwned),
                        React.createElement(TableCell, { numeric: true }, formatMoney(scoreBoardItem.availableMoneyAmountInCents + scoreBoardItem.depositAmountInCents, true)),
                        React.createElement(TableCell, { numeric: true }, formatMoney(scoreBoardItem.depositAmountInCents, true)),
                        React.createElement(TableCell, { numeric: true }, formatResources(scoreBoardItem.resources))));
                })))));
    };
    return RoomInfoDialog;
}(React.Component));
var mapDispatch = function (dispatch) {
    return {};
};
var mapState = function (state) {
    return {
        scoreBoardData: selectors.advanced.getScoreBoardData(state),
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(RoomInfoDialog);
var DialogWrapper = function (props) {
    return (React.createElement(Dialog, { onClose: props.onClose, open: props.open, fullScreen: !!props.fullScreen },
        React.createElement(DialogContent, null,
            React.createElement(ConnectedComponent, null)),
        React.createElement(DialogActions, null,
            React.createElement(Button, { variant: "contained", onClick: props.onClose, color: "primary" }, "Close"))));
};
export default withMobileDialog({ breakpoint: 'xs' })(DialogWrapper);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=RoomInfoDialog.js.map