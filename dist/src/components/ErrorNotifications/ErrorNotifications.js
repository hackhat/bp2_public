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
import { selectors } from "../../reducers";
import { createAppAction } from "../../actions";
import styled from "react-emotion";
import { ToastActions } from "../../actions/ToastActions";
var Root = styled("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: #983535;\n  color: white;\n  position: fixed;\n  top: 10px;\n  @media (max-width: 600px){\n    left: 10px;\n    right: 10px;\n  }\n  @media (min-width: 600px){\n    left: 20%;\n    right: 20%;\n  }\n  padding: 10px;\n  z-index: 10000;\n  border-radius: 4px;\n  cursor: pointer;\n"], ["\n  background: #983535;\n  color: white;\n  position: fixed;\n  top: 10px;\n  @media (max-width: 600px){\n    left: 10px;\n    right: 10px;\n  }\n  @media (min-width: 600px){\n    left: 20%;\n    right: 20%;\n  }\n  padding: 10px;\n  z-index: 10000;\n  border-radius: 4px;\n  cursor: pointer;\n"])));
var TapToCloseMessage = styled("span")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 12px;\n  opacity: 0.75;\n"], ["\n  font-size: 12px;\n  opacity: 0.75;\n"])));
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.render = function () {
        if (!this.props.lastError)
            return null;
        return (React.createElement(Root, { onClick: this.props.removeLastError },
            this.props.lastError,
            React.createElement(TapToCloseMessage, null, " Click or tap to close.")));
    };
    return Component;
}(React.PureComponent));
var mapDispatch = function (dispatch) {
    return {
        removeLastError: function () {
            var action = createAppAction(ToastActions.removeLastError, null);
            dispatch(action);
        }
    };
};
var mapState = function (state) {
    return {
        lastError: selectors.toasts.getLastError(state),
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(Component);
export default ConnectedComponent;
var templateObject_1, templateObject_2;
//# sourceMappingURL=ErrorNotifications.js.map