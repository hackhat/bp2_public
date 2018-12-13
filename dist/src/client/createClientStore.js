import { createEpicMiddleware } from "redux-observable";
import { createAppAction } from "../actions";
import { initialState } from "../reducers";
import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers";
import { reduxBatch } from "@manaflair/redux-batch";
import { getReduxDevToolsEnhancer } from "../utils/getReduxDevToolsEnhancer";
import { createClientEpic } from "../epics/client/createClientEpic";
import { SystemActions } from "../actions/SystemActions";
import generateUniqueId from "../utils/generateUniqueId";
/**
 * Make sure the `roomSCI` is not connected, otherwise you might not get all actions
 * and the state will be incomplete.
 */
export var createClientStore = function (_a) {
    var enableReduxDevTools = _a.enableReduxDevTools, roomSCI = _a.roomSCI;
    var epicMiddleware = createEpicMiddleware();
    var store = createStore(reducers, initialState, compose(reduxBatch, applyMiddleware(epicMiddleware), reduxBatch, enableReduxDevTools ? getReduxDevToolsEnhancer() : function (a) { return a; }));
    var rootEpic = createClientEpic(roomSCI, store);
    epicMiddleware.run(rootEpic);
    store.dispatch(createAppAction(SystemActions.appStart, {
        clientId: generateUniqueId(),
    }));
    return store;
};
//# sourceMappingURL=createClientStore.js.map