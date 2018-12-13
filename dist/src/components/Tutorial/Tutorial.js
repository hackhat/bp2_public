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
import { createAppAction } from "../../actions";
import TutorialModule from '../../modules/tutorial/Tutorial';
import { StoreConsumer } from "../contexts/Store";
import { tutorialList } from "../../tutorials/list";
import { TutorialActions } from "../../actions/TutorialActions";
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tick = function () {
            _this.forceUpdate();
        };
        return _this;
    }
    Component.prototype.render = function () {
        var state = this.getAppState();
        var tutorialName = selectors.ui.tutorial.getCurrentTutorialName(state);
        if (tutorialName === null)
            return null;
        var tutorialDefinition = tutorialList[tutorialName];
        if (!tutorialDefinition)
            return null;
        var tutorialDefinitionInfo = tutorialDefinition.getInfo(state);
        if (tutorialDefinitionInfo === null)
            return null;
        var tutorialModuleProps = __assign({}, tutorialDefinitionInfo, { closeTutorial: this.props.closeTutorial });
        return (React.createElement(TutorialModule, __assign({}, tutorialModuleProps)));
    };
    Component.prototype.getAppState = function () {
        return this.props.store.getState();
    };
    Component.prototype.componentDidMount = function () {
        setInterval(this.tick, 1000);
    };
    return Component;
}(React.PureComponent));
var mapDispatch = function (dispatch) {
    return {
        closeTutorial: function () {
            var action = createAppAction(TutorialActions.close, null);
            dispatch(action);
        }
    };
};
var ConnectedComponent = connect(null, mapDispatch)(Component);
var Wrapper = function () {
    return (React.createElement(StoreConsumer, null, function (store) { return React.createElement(ConnectedComponent, { store: store }); }));
};
export default Wrapper;
//# sourceMappingURL=Tutorial.js.map