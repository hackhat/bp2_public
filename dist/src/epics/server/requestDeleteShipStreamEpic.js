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
import { mergeMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createServerBroadcastAction, createServerToSingleClientAction } from "../../actions";
import { ShipActions } from "../../actions/ShipActions";
import { selectors } from "../../reducers";
import { isTypeOfAuthorizedAction } from "../utils/isTypeOfAuthorizedAction";
export var requestDeleteShipStreamEpic = function (store) { return function (action$, state$) {
    var requestDeleteShipStreamAction$ = action$.pipe(isTypeOfAuthorizedAction(ShipActions.requestDeleteStream), mergeMap(function (authorizedAction) {
        var state = state$.value;
        var _a = authorizedAction.payload, authenticatedPlayerId = _a.authenticatedPlayerId, serverAction = _a.serverAction;
        var shipStreamId = serverAction.payload.shipStreamId;
        var res = selectors.advanced.canDeleteShipStream(state, { shipStreamId: shipStreamId, authenticatedPlayerId: authenticatedPlayerId });
        if (!res.ok) {
            console.error('Error creating ship stream:', res.err);
            return [
                createServerToSingleClientAction(authorizedAction.payload.clientId, ShipActions.deleteStreamError, __assign({}, serverAction.payload, { error: res.err }))
            ];
        }
        return [
            createServerBroadcastAction(ShipActions.deleteStream, serverAction.payload)
        ];
    }));
    return merge(requestDeleteShipStreamAction$);
}; };
//# sourceMappingURL=requestDeleteShipStreamEpic.js.map