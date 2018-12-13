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
import styled from "react-emotion";
import { PlanetProperty } from "../../interfaces";
import { formatPlanetRange } from "../../utils/formatPlanetRange";
import { formatResources } from "../../utils/formatResources";
import { formatDecimal } from "../../utils/formatDecimal";
var Root = styled("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  box-shadow: 0 0 17px 0px rgba(0, 0, 0, 0.2);\n  border-radius: 4px;\n  overflow: hidden;\n"], ["\n  display: flex;\n  box-shadow: 0 0 17px 0px rgba(0, 0, 0, 0.2);\n  border-radius: 4px;\n  overflow: hidden;\n"])));
var Title = styled("div")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n font-weight: bold;\n"], ["\n font-weight: bold;\n"])));
var TextLine = styled("div")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  opacity: 0.8;\n"], ["\n  opacity: 0.8;\n"])));
var LeftPart = styled("div")(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 50%;\n  height: 100%;\n  padding: 5px;\n"], ["\n  width: 50%;\n  height: 100%;\n  padding: 5px;\n"])));
var RightPart = styled("div")(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 50%;\n  height: 100%;\n  background: #3f51b5;\n  padding: 5px;\n  color: white;\n  cursor: pointer;\n  user-select: none;\n  & * {\n    user-select: none;\n  }\n  &:hover{\n    background: #303f9f;\n  }\n"], ["\n  width: 50%;\n  height: 100%;\n  background: #3f51b5;\n  padding: 5px;\n  color: white;\n  cursor: pointer;\n  user-select: none;\n  & * {\n    user-select: none;\n  }\n  &:hover{\n    background: #303f9f;\n  }\n"])));
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.render = function () {
        return (React.createElement(Root, null,
            React.createElement(LeftPart, null,
                React.createElement(Title, null, this.props.upgradeDefinition.title),
                React.createElement(TextLine, null,
                    "Current: ",
                    this.renderCurrentValue())),
            React.createElement(RightPart, { onClick: this.props.onUpgrade },
                React.createElement(Title, null, "Upgrade"),
                React.createElement(TextLine, null, this.renderUpgradeInfo()),
                React.createElement(TextLine, null,
                    "Cost: ",
                    formatResources(this.props.upgradeDefinition.resourcesCost)))));
    };
    Component.prototype.renderCurrentValue = function () {
        var property = this.props.upgradeDefinition.property;
        if (property === PlanetProperty.range) {
            return formatPlanetRange(this.props.planet[property]);
        }
        else if (property === PlanetProperty.defense) {
            return formatDecimal(this.props.planet[property], 2);
        }
        else if (property === PlanetProperty.attack) {
            return formatDecimal(this.props.planet[property], 2);
        }
        else if (property === PlanetProperty.capacity) {
            return formatDecimal(this.props.planet[property], 0);
        }
        else if (property === PlanetProperty.radius) {
            return formatDecimal(this.props.planet[property], 0);
        }
        else if (property === PlanetProperty.resourcesPerCycle) {
            return formatDecimal(this.props.planet[property], 0);
        }
        else if (property === PlanetProperty.unitsPerCycle) {
            return formatDecimal(this.props.planet[property], 0);
        }
        return "[Error]";
    };
    Component.prototype.renderUpgradeInfo = function () {
        var property = this.props.upgradeDefinition.property;
        if (property === PlanetProperty.range) {
            return "Range: +" + formatPlanetRange(this.props.upgradeDefinition.addend);
        }
        else if (property === PlanetProperty.defense) {
            return "Defense: +" + formatDecimal(this.props.upgradeDefinition.addend, 2);
        }
        else if (property === PlanetProperty.attack) {
            return "Attack: +" + formatDecimal(this.props.upgradeDefinition.addend, 2);
        }
        else if (property === PlanetProperty.capacity) {
            return "Capacity: +" + formatDecimal(this.props.upgradeDefinition.addend, 0);
        }
        else if (property === PlanetProperty.radius) {
            return "Radius: +" + formatDecimal(this.props.upgradeDefinition.addend, 0);
        }
        else if (property === PlanetProperty.resourcesPerCycle) {
            return "Resources per cycle: +" + formatDecimal(this.props.upgradeDefinition.addend, 0);
        }
        else if (property === PlanetProperty.unitsPerCycle) {
            return "Units per cycle: +" + formatDecimal(this.props.upgradeDefinition.addend, 0);
        }
        return "[Error]";
    };
    return Component;
}(React.PureComponent));
export default Component;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=UpgradeItem.js.map