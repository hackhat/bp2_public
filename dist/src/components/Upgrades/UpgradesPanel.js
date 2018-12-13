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
import * as React from "react";
import { connect } from 'react-redux';
import { selectors } from "../../reducers";
import { createSendClientToServerAction } from "../../actions";
import styled from "react-emotion";
import UpgradeItem from './UpgradeItem';
import { UpgradeActions } from "../../actions/UpgradeActions";
import Typography from "@material-ui/core/Typography";
import { formatResources } from "../../utils/formatResources";
var Root = styled("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n"], ["\n"])));
var Separator = styled("div")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: 10px;\n  width: 100%;\n"], ["\n  height: 10px;\n  width: 100%;\n"])));
var UpgradeList = styled("div")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n"], ["\n"])));
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.render = function () {
        var _this = this;
        var _a = this.props, planet = _a.planet, currentPlayer = _a.currentPlayer;
        if (!planet || !currentPlayer)
            return null;
        var upgradeDefinitionsForThisPlanet = this.props.upgradeDefinitions.filter(function (upgradeDefinition) {
            return upgradeDefinition.forPlanetTypes.includes(planet.type);
        });
        return (React.createElement(Root, null,
            React.createElement(Typography, { variant: "headline", color: "inherit", align: "left" },
                "Planet upgrades x: ",
                planet.x,
                " y: ",
                planet.y),
            React.createElement(Typography, { variant: "subheading", color: "inherit", align: "left" },
                "Current resources: ",
                formatResources(currentPlayer.resources)),
            React.createElement(Separator, null),
            React.createElement(UpgradeList, null, upgradeDefinitionsForThisPlanet.map(function (upgradeDefinition, i) {
                var props = {
                    upgradeDefinition: upgradeDefinition,
                    planet: planet,
                    onUpgrade: function () { return _this.props.onUpgrade(_this.props.planetId, upgradeDefinition.id); },
                };
                var isLastItem = i === _this.props.upgradeDefinitions.length - 1;
                return (React.createElement(React.Fragment, { key: upgradeDefinition.id },
                    React.createElement(UpgradeItem, __assign({}, props)),
                    isLastItem ? null : React.createElement(Separator, null)));
            }))));
    };
    return Component;
}(React.PureComponent));
var mapDispatch = function (dispatch) {
    return {
        onUpgrade: function (planetId, upgradeDefinitionId) {
            var action = createSendClientToServerAction(UpgradeActions.requestUpgrade, {
                planetId: planetId,
                upgradeDefinitionId: upgradeDefinitionId,
            });
            dispatch(action);
        }
    };
};
var mapState = function (state, ownProps) {
    return {
        upgradeDefinitions: selectors.upgrades.getUpgradeDefinitions(state),
        planet: selectors.planets.getPlanetById(state, ownProps.planetId),
        currentPlayer: selectors.ui.global.getCurrentPlayer(state),
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(Component);
export default ConnectedComponent;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=UpgradesPanel.js.map