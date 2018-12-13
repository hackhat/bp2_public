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
import { withRouter } from 'react-router-dom';
var GoogleAnalytics = /** @class */ (function (_super) {
    __extends(GoogleAnalytics, _super);
    function GoogleAnalytics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoogleAnalytics.prototype.componentDidMount = function () {
        this.trackPageView(this.props);
    };
    GoogleAnalytics.prototype.componentWillUpdate = function (nextProps) {
        if (nextProps.location.pathname === this.props.location.pathname) {
            // don't log identical link clicks (nav links likely)
            return;
        }
        this.trackPageView(nextProps);
    };
    GoogleAnalytics.prototype.trackPageView = function (_a) {
        var location = _a.location;
        if (window.gtag && window.GA_TRACKING_ID) {
            window.gtag('config', window.GA_TRACKING_ID, {
                'page_title': document.title,
                'page_location': window.location.href.replace('/#', ''),
                'page_path': location.pathname,
            });
        }
    };
    GoogleAnalytics.prototype.render = function () {
        return null;
    };
    return GoogleAnalytics;
}(React.Component));
export default withRouter(GoogleAnalytics);
//# sourceMappingURL=GoogleAnalytics.js.map