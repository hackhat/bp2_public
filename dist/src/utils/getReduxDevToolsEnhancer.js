import { ShipActions } from "../actions/ShipActions";
export var getReduxDevToolsEnhancer = function () {
    var options = {
        maxAge: 200,
        actionsBlacklist: [
            ShipActions.arrive,
            ShipActions.send,
        ],
    };
    var reduxDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(options);
    return reduxDevTools ? reduxDevTools : function (n) { return n; };
};
//# sourceMappingURL=getReduxDevToolsEnhancer.js.map