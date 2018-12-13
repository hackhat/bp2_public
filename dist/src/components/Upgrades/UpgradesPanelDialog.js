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
import withMobileDialog from "@material-ui/core/withMobileDialog/withMobileDialog";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import { GlobalUIActions } from "../../actions/GlobalUIActions";
import UpgradesPanel from './UpgradesPanel';
var Root = styled("section")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n"], ["\n"])));
var UpgradesPanelDialog = /** @class */ (function (_super) {
    __extends(UpgradesPanelDialog, _super);
    function UpgradesPanelDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpgradesPanelDialog.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var close = function () { return _this.props.onClose(props.upgradesPanelState.planetId || ''); };
        return (React.createElement(Dialog, { open: props.upgradesPanelState.isVisible, onClose: close, fullScreen: !!props.fullScreen, maxWidth: "sm", fullWidth: true },
            React.createElement(DialogContent, null,
                React.createElement(UpgradesPanel, { planetId: props.upgradesPanelState.planetId })),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: close, color: "primary" }, "Done"))));
    };
    return UpgradesPanelDialog;
}(React.PureComponent));
var mapDispatch = function (dispatch) {
    return {
        onClose: function (planetId) {
            var action = createAppAction(GlobalUIActions.setVisibilityForUpgradesPanel, {
                planetId: planetId,
                isVisible: false,
            });
            dispatch(action);
        }
    };
};
var mapState = function (state) {
    return {
        upgradesPanelState: selectors.ui.global.getUpgradesPanelState(state),
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(UpgradesPanelDialog);
export default withMobileDialog({ breakpoint: 'xs' })(ConnectedComponent);
var templateObject_1;
// export default ConnectedComponent;
//# sourceMappingURL=UpgradesPanelDialog.js.map