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
import { filter, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createAppAction } from "../../actions";
import { selectors } from "../../reducers";
import { SystemActions } from "../../actions/SystemActions";
import { ofType } from "../utils/ofType";
import { authorizeClientToServerAction } from "../../utils/authorizeClientToServerAction";
import { isProduction } from "../../utils/isProduction";
import { isNotNullOrUndefined } from "../../utils/isNotNullOrUndefined";
/**
 * We want to restrict the actions that can be dispatched within the system.
 */
export var authorizeRawClientActionsEpic = function (store) { return function (action$, state$) {
    var authorizedClientAction$ = action$.pipe(ofType(SystemActions.rawClientAction), map(function (action) {
        var innerAction = __assign({}, action.payload.serverAction, { 
            // Don't trust client side dates
            date: new Date() });
        var clientId = action.payload.clientId;
        var authenticatedPlayerId = selectors.system.getPlayerIdFromClientId(state$.value, clientId);
        var authorizeActionRes = authorizeClientToServerAction({
            action: innerAction,
            authenticatedPlayerId: authenticatedPlayerId,
            state: state$.value,
        });
        if (!authorizeActionRes.ok) {
            console.log("Error:", authorizeActionRes.error);
            return null;
        }
        // Repackage the action so we can attach the playerId for action specific validation.
        var authorizedClientAction = createAppAction(SystemActions.authorizedClientAction, {
            serverAction: innerAction,
            authenticatedPlayerId: authenticatedPlayerId,
            clientId: clientId,
        });
        !isProduction && false && console.log("Received client action " + innerAction.date.toISOString() + ": " + innerAction.type + ': ' + JSON.stringify(innerAction.payload));
        return authorizedClientAction;
    }), filter(isNotNullOrUndefined));
    return merge(authorizedClientAction$);
}; };
//# sourceMappingURL=authorizeRawClientActionsEpic.js.map