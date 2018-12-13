var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';
import { selectors } from "../../reducers/index";
import * as Color from "color";
import * as _ from "lodash";
import CloudIcon from '@material-ui/icons/Cloud';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import { CountryFlag } from "../CountryFlag/CountryFlag";
import { formatMoney } from "../../utils/formatMoney";
import { formatResources } from "../../utils/formatResources";
var getScoreBoardDataThrottled = _.throttle(selectors.advanced.getScoreBoardData, 1000);
var darkenColor = function (color) { return Color(color).darken(0).hex(); };
var darkenColorMemoized = _.memoize(darkenColor);
var Root = styled("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 300px;\n  height: 200px;\n  overflow: auto;\n  background: #181a27a8;\n  background: linear-gradient(to top, rgba(9,19,38,0) 0%,rgba(9,19,38,1) 100%);\n  border-left: 0.5px solid #ffffff;\n"], ["\n  width: 300px;\n  height: 200px;\n  overflow: auto;\n  background: #181a27a8;\n  background: linear-gradient(to top, rgba(9,19,38,0) 0%,rgba(9,19,38,1) 100%);\n  border-left: 0.5px solid #ffffff;\n"])));
var Table = styled("table")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  padding: 5px;\n  font-size: 12px;\n"], ["\n  width: 100%;\n  padding: 5px;\n  font-size: 12px;\n"])));
var TableRow = styled("tr")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: ", ";\n  height: 16px;\n"], ["\n  color: ", ";\n  height: 16px;\n"])), function (props) { return props.color; });
var TableCellTh = styled("th")(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  text-align: left;\n  font-weight: normal;\n  white-space: nowrap;\n"], ["\n  text-align: left;\n  font-weight: normal;\n  white-space: nowrap;\n"])));
var TableCellDominatedTh = styled(TableCellTh)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  text-align: right;\n"], ["\n  text-align: right;\n"])));
var TableCellTd = styled("td")(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  text-align: left;\n  word-wrap: break-word;\n  height: 16px;\n  vertical-align: middle;\n"], ["\n  text-align: left;\n  word-wrap: break-word;\n  height: 16px;\n  vertical-align: middle;\n"])));
var TableCellDominatedTd = styled("td")(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  text-align: right;\n  height: 16px;\n  vertical-align: middle;\n"], ["\n  text-align: right;\n  height: 16px;\n  vertical-align: middle;\n"])));
var DepositSpan = styled("span")(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  font-size: 67%;\n"], ["\n  font-size: 67%;\n"])));
var iconClassName = css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  height: 14px;\n  width: 14px;\n  vertical-align: middle;\n"], ["\n  height: 14px;\n  width: 14px;\n  vertical-align: middle;\n"])));
var sumDeposits = function (accumulator, currentValue) { return accumulator + currentValue.depositAmountInCents; };
var sumMoney = function (accumulator, currentValue) { return accumulator + currentValue.availableMoneyAmountInCents + currentValue.depositAmountInCents; };
var sumPlanetsOwned = function (accumulator, currentValue) { return accumulator + currentValue.planetsOwned; };
var OverlayScoreBoard = function (_a) {
    var scoreBoardData = _a.scoreBoardData;
    var totalPlayers = scoreBoardData.length;
    var onlinePlayer = scoreBoardData.filter(function (_) { return _.online; }).length;
    var totalMoneyInGame = scoreBoardData.reduce(sumMoney, 0);
    var totalDepositsInGame = scoreBoardData.reduce(sumDeposits, 0);
    var totalMoneyInGameElement = (React.createElement("span", null,
        React.createElement("span", { title: "Total money including deposits" }, formatMoney(totalMoneyInGame, true)),
        totalDepositsInGame !== 0 ? (React.createElement(DepositSpan, { title: "In game deposits" },
            "-",
            formatMoney(totalDepositsInGame, false))) : ''));
    var onlinePlayersSpan = (React.createElement("span", { title: "Online players/total players" },
        "Online ",
        onlinePlayer,
        "/",
        totalPlayers));
    var planetsOwned = scoreBoardData.reduce(sumPlanetsOwned, 0);
    return (React.createElement(Root, null,
        React.createElement(Table, null,
            React.createElement("tbody", null,
                React.createElement(TableRow, { color: "#7d7d7d" },
                    React.createElement(TableCellTh, null,
                        "Players (",
                        totalMoneyInGameElement,
                        ", ",
                        onlinePlayersSpan,
                        ")"),
                    React.createElement(TableCellDominatedTh, null,
                        "Planets (",
                        React.createElement("span", { title: "Planets owned" }, planetsOwned),
                        ")")),
                scoreBoardData.map(function (scoreBoardItem, i) {
                    var color = scoreBoardItem.color || 'white';
                    var countryFlag = React.createElement(CountryFlag, { countryCode: scoreBoardItem.countryCode || '?' });
                    var iconOnline = scoreBoardItem.online ?
                        React.createElement("span", { title: "Online" },
                            React.createElement(CloudIcon, { className: iconClassName })) :
                        React.createElement("span", { title: "Offline" },
                            React.createElement(CloudOffIcon, { className: iconClassName }));
                    var verifiedPlayerIcon = scoreBoardItem.hasEmail ?
                        React.createElement("span", { title: "User with email" },
                            React.createElement(VerifiedUserIcon, { className: iconClassName })) : null;
                    var money = (React.createElement("span", null,
                        React.createElement("span", { title: "Total money including deposits" }, formatMoney(scoreBoardItem.availableMoneyAmountInCents + scoreBoardItem.depositAmountInCents, true)),
                        scoreBoardItem.depositAmountInCents !== 0 ?
                            React.createElement(DepositSpan, { title: "In game deposits" },
                                "-",
                                formatMoney(scoreBoardItem.depositAmountInCents, false)) : ''));
                    var rank = React.createElement("span", { title: "Rank in game" },
                        "#",
                        (i + 1 + '').padStart(2, '0'));
                    var name = React.createElement("span", { title: "Name" }, scoreBoardItem.name);
                    var resources = React.createElement("span", { title: "Resources" }, formatResources(scoreBoardItem.resources));
                    return (React.createElement(TableRow, { key: scoreBoardItem.playerId, color: darkenColorMemoized(color) },
                        React.createElement(TableCellTd, null,
                            rank,
                            " ",
                            iconOnline,
                            " ",
                            countryFlag,
                            " ",
                            name,
                            " ",
                            verifiedPlayerIcon,
                            " (",
                            money,
                            ", ",
                            resources,
                            ")"),
                        React.createElement(TableCellDominatedTd, null,
                            scoreBoardItem.planetsOwned,
                            "/",
                            scoreBoardItem.totalPlanets)));
                })))));
};
var mapDispatch = function (dispatch) {
    return {};
};
var mapState = function (state) {
    return {
        scoreBoardData: getScoreBoardDataThrottled(state),
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(OverlayScoreBoard);
export default ConnectedComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=OverlayScoreBoard.js.map