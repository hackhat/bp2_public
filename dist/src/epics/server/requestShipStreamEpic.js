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
import { map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createServerBroadcastAction, createServerToSingleClientAction } from "../../actions";
import { ShipActions } from "../../actions/ShipActions";
import { selectors } from "../../reducers";
import { isTypeOfAuthorizedAction } from "../utils/isTypeOfAuthorizedAction";
import { isProduction } from "../../utils/isProduction";
export var SHIP_STREAM_RESOURCE_COST = isProduction ? 2 : 2;
export var requestShipStreamEpic = function (store) { return function (action$, state$) {
    var shipStreamRequestAction$ = action$.pipe(isTypeOfAuthorizedAction(ShipActions.requestCreateStream), map(function (authorizedAction) {
        var _a = authorizedAction.payload, serverAction = _a.serverAction, authenticatedPlayerId = _a.authenticatedPlayerId;
        var state = state$.value;
        var _b = serverAction.payload.shipStream, fromPlanetId = _b.fromPlanetId, toPlanetId = _b.toPlanetId;
        var res = selectors.advanced.canCreateShipStream(state, {
            fromPlanetId: fromPlanetId,
            toPlanetId: toPlanetId,
            authenticatedPlayerId: authenticatedPlayerId
        });
        if (!authenticatedPlayerId)
            throw new Error("No authenticatedPlayerId found");
        if (!res.ok) {
            console.error('Error creating ship stream:', res.err);
            return createServerToSingleClientAction(authorizedAction.payload.clientId, ShipActions.createStreamError, __assign({}, serverAction.payload, { createdByPlayerId: authenticatedPlayerId, error: res.err }));
        }
        return createServerBroadcastAction(ShipActions.createStream, __assign({}, serverAction.payload, { createdByPlayerId: authenticatedPlayerId }));
    }));
    return merge(shipStreamRequestAction$);
}; };
//# sourceMappingURL=requestShipStreamEpic.js.map