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
import { HashRouter, Route } from "react-router-dom";
import GameRoot from '../GameRoot';
import HomePage from '../HomePage/HomePage';
import GoogleAnalytics from "./GoogleAnalytics";
var routes = [
    {
        id: 'home',
        path: '/',
        component: HomePage,
    },
    {
        id: 'gameRoot',
        path: '/game',
        component: GameRoot,
    }
];
export var Routing = function () {
    return (React.createElement(HashRouter, null,
        React.createElement(React.Fragment, null,
            routes.map(function (route) {
                return React.createElement(Route, __assign({ key: route.id, exact: true }, route));
            }),
            React.createElement(GoogleAnalytics, null))));
};
//# sourceMappingURL=Routing.js.map