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
import * as React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';
import { createAppAction } from "../../actions";
import { selectors } from "../../reducers";
import shipStreamSvg from '../../icons/Icons_shipStream.svg';
import planetSvg from '../../icons/Icons_planet.svg';
import upgradesSvg from '../../icons/Icons_upgrades.svg';
import { SHIP_STREAM_RESOURCE_COST } from "../../epics/server/requestShipStreamEpic";
import { PLANET_RESOURCES_COST } from "../../reducers/advancedSelectors/canPlayerCreatePlanet";
import { AttackMode } from "../../interfaces";
import { PlanetMapUIActions } from "../PlanetMap/PlanetMapUIActions";
import CenterFocusStrong from "@material-ui/icons/CenterFocusStrong";
import { InlineSvg } from "../utils/InlineSvg";
import { GlobalUIActions } from "../../actions/GlobalUIActions";
import { formatResources } from "../../utils/formatResources";
var Root = styled("section")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-block;\n  width: 100%;\n  text-align: center;\n  pointer-events: none;\n"], ["\n  display: inline-block;\n  width: 100%;\n  text-align: center;\n  pointer-events: none;\n"])));
var ButtonWrappers = styled("div")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: inline-block;\n  border: 1px solid white;\n"], ["\n  display: inline-block;\n  border: 1px solid white;\n"])));
var getIconButtonOnHoverCss = function (props) {
    if (props.toggled && props.buttonType === ButtonType.radio) {
        return "background: #389d58;";
    }
    else if (props.toggled && props.buttonType === ButtonType.checkbox) {
        return "background: #71b47f;";
    }
    else {
        return "background: #484e76;";
    }
};
var IconButton = styled('button')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: ", ";\n  width: 62px;\n  height: 62px;\n  padding: 5px;\n  box-sizing: border-box;\n  border: 1px solid white;\n  outline: none;\n  cursor: ", ";\n  transition: 0.3s background-color;\n  pointer-events: all;\n  position: relative;\n  \n  &:hover {\n    ", "\n  }\n"], ["\n  background: ", ";\n  width: 62px;\n  height: 62px;\n  padding: 5px;\n  box-sizing: border-box;\n  border: 1px solid white;\n  outline: none;\n  cursor: ", ";\n  transition: 0.3s background-color;\n  pointer-events: all;\n  position: relative;\n  \n  &:hover {\n    ", "\n  }\n"])), function (props) { return props.toggled ? "#389d58" : "#181a27"; }, function (props) { return props.toggled && props.buttonType === ButtonType.radio ? "not-allowed" : "pointer"; }, getIconButtonOnHoverCss);
var ButtonText = styled("span")(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 12px;\n  color: white;\n  display: inline-block;\n  width: 100%;\n  text-align: center;\n  user-select: none;\n"], ["\n  font-size: 12px;\n  color: white;\n  display: inline-block;\n  width: 100%;\n  text-align: center;\n  user-select: none;\n"])));
var PriceTag = styled("span")(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  font-size: 12px;\n  font-weight: bold;\n  background: #ffffff;\n  color: #181a27;\n  border-radius: 0 0 0 3px;\n"], ["\n  position: absolute;\n  top: 0;\n  right: 0;\n  font-size: 12px;\n  font-weight: bold;\n  background: #ffffff;\n  color: #181a27;\n  border-radius: 0 0 0 3px;\n"])));
var ButtonType;
(function (ButtonType) {
    ButtonType["radio"] = "radio";
    ButtonType["checkbox"] = "checkbox";
    ButtonType["button"] = "button";
})(ButtonType || (ButtonType = {}));
var ToolButton = function (props) {
    var svg = props.svg, svgComponent = props.svgComponent, title = props.title, tooltip = props.tooltip, price = props.price, toggled = props.toggled, onClick = props.onClick, buttonType = props.buttonType;
    return (React.createElement(IconButton, { toggled: toggled, onClick: onClick, title: tooltip, buttonType: buttonType },
        svg && React.createElement(InlineSvg, null, svg),
        svgComponent ? React.createElement("div", null, svgComponent) : null,
        React.createElement(ButtonText, null, title),
        price !== undefined && React.createElement(PriceTag, null, price)));
};
var iconClassName = css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 32px;\n  height: 32px;\n  fill: white;\n"], ["\n  width: 32px;\n  height: 32px;\n  fill: white;\n"])));
var Toolbox = /** @class */ (function (_super) {
    __extends(Toolbox, _super);
    function Toolbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toolbox.prototype.render = function () {
        var _a = this.props, selectedPlanet = _a.selectedPlanet, attackMode = _a.attackMode, setAttackMode = _a.setAttackMode, setCreatePlanetMode = _a.setCreatePlanetMode, createPlanetMode = _a.createPlanetMode, requestFocusOnMyPlanets = _a.requestFocusOnMyPlanets, openUpgradesPanel = _a.openUpgradesPanel;
        var toolButtons = [
            selectedPlanet ? {
                key: 'stream',
                svg: shipStreamSvg,
                title: "Stream",
                tooltip: "Creates a stream of ships that continuously sends units to another planet. To delete, press the big circle near the ship stream.",
                price: "" + formatResources(SHIP_STREAM_RESOURCE_COST),
                toggled: attackMode === AttackMode.shipStream,
                buttonType: ButtonType.checkbox,
                onClick: function () {
                    if (attackMode === AttackMode.shipStream) {
                        setAttackMode(AttackMode.ship);
                    }
                    else {
                        setAttackMode(AttackMode.shipStream);
                    }
                },
            } : null,
            selectedPlanet ? {
                key: 'upgrades',
                svg: upgradesSvg,
                title: "Upgrades",
                tooltip: "Click here to open the upgrade panel for this planet",
                toggled: false,
                buttonType: ButtonType.button,
                onClick: function () { return openUpgradesPanel(selectedPlanet.id); },
            } : null,
            !selectedPlanet ? {
                key: 'planet',
                svg: planetSvg,
                title: "+ Planet",
                tooltip: "Click here, then click in the black area to create a planet.",
                price: "" + formatResources(PLANET_RESOURCES_COST),
                toggled: createPlanetMode,
                buttonType: ButtonType.checkbox,
                onClick: function () { return setCreatePlanetMode(!createPlanetMode); },
            } : null,
            {
                key: 'centerOnMyPlanets',
                svgComponent: React.createElement(CenterFocusStrong, { className: iconClassName }),
                title: "Center",
                tooltip: "Click here to center on your planets.",
                toggled: false,
                buttonType: ButtonType.radio,
                onClick: function () { return requestFocusOnMyPlanets(); },
            },
        ];
        return (React.createElement(Root, null,
            React.createElement(ButtonWrappers, null, toolButtons.map(function (toolButton) {
                if (toolButton === null)
                    return null;
                return React.createElement(ToolButton, __assign({}, toolButton));
            }))));
    };
    return Toolbox;
}(React.PureComponent));
var mapDispatch = function (dispatch) {
    return {
        setAttackMode: function (attackMode) {
            var action = createAppAction(PlanetMapUIActions.setAttackMode, {
                attackMode: attackMode,
            });
            dispatch(action);
        },
        setCreatePlanetMode: function (createPlanetMode) {
            var action = createAppAction(PlanetMapUIActions.setCreatePlanetMode, {
                createPlanetMode: createPlanetMode,
            });
            dispatch(action);
        },
        requestFocusOnMyPlanets: function () {
            var action = createAppAction(PlanetMapUIActions.requestFocusOnMyPlanets, null);
            dispatch(action);
        },
        openUpgradesPanel: function (planetId) {
            var action = createAppAction(GlobalUIActions.setVisibilityForUpgradesPanel, {
                planetId: planetId,
                isVisible: true,
            });
            dispatch(action);
        },
    };
};
var mapState = function (state) {
    var selectedPlanetId = selectors.ui.planetMap.getUI(state).selectedPlanetId;
    return {
        selectedPlanet: selectedPlanetId ? selectors.planets.getPlanetById(state, selectedPlanetId) : undefined,
        attackMode: selectors.ui.planetMap.getUI(state).attackMode,
        createPlanetMode: selectors.ui.planetMap.getUI(state).createPlanetMode,
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(Toolbox);
export default ConnectedComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=Toolbox.js.map