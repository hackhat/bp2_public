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
import * as React from 'react';
import { Routing } from "./routing/Routing";
import Toasts from "./Toasts";
import Tutorial from "./Tutorial/Tutorial";
import ErrorNotifications from "./ErrorNotifications/ErrorNotifications";
var AppRoot = /** @class */ (function (_super) {
    __extends(AppRoot, _super);
    function AppRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppRoot.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(Routing, null),
            React.createElement(Toasts, null),
            React.createElement(Tutorial, null),
            React.createElement(ErrorNotifications, null)));
    };
    return AppRoot;
}(React.Component));
export default AppRoot;
//# sourceMappingURL=AppRoot.js.map