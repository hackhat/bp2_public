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
import { selectors } from "../../reducers";
import { ShipActions } from "../../actions/ShipActions";
import * as moment from "moment";
import { isTypeOfAuthorizedAction } from "../utils/isTypeOfAuthorizedAction";
import { SHIP_DELAY_IN_MS } from "../../constants/constants";
// Delay the send ship action so it will let other people
// notice that a ship is preparing. Otherwise sometimes you
// only see the ship mid flight and is bad.
export var requestSendShipEpic = function (store) { return function (action$, state$) {
    var requestSendShipEpic$ = action$.pipe(isTypeOfAuthorizedAction(ShipActions.requestSendShip), map(function (authorizedAction) {
        var authenticatedPlayerId = authorizedAction.payload.authenticatedPlayerId;
        var serverAction = authorizedAction.payload.serverAction;
        if (!authenticatedPlayerId) {
            return createServerToSingleClientAction(authorizedAction.payload.clientId, ShipActions.requestSendShipError, __assign({}, serverAction.payload, { error: "No authenticatedPlayerId" }));
        }
        var _a = serverAction.payload, id = _a.id, fromPlanetId = _a.fromPlanetId, toPlanetId = _a.toPlanetId, units = _a.units;
        var shipOwner = selectors.players.getPlayerById(state$.value, authenticatedPlayerId);
        if (!shipOwner) {
            return createServerToSingleClientAction(authorizedAction.payload.clientId, ShipActions.requestSendShipError, __assign({}, serverAction.payload, { error: "No shipOwner" }));
        }
        if (!shipOwner.color) {
            return createServerToSingleClientAction(authorizedAction.payload.clientId, ShipActions.requestSendShipError, __assign({}, serverAction.payload, { error: "No shipOwner.color" }));
        }
        var fromPlanet = selectors.planets.getPlanetById(state$.value, fromPlanetId);
        if (!fromPlanet) {
            return createServerToSingleClientAction(authorizedAction.payload.clientId, ShipActions.requestSendShipError, __assign({}, serverAction.payload, { error: "No fromPlanet" }));
        }
        var ship = {
            id: id,
            temporary: true,
            ownerId: authenticatedPlayerId,
            arrived: false,
            color: shipOwner.color,
            fromPlanetId: fromPlanetId,
            toPlanetId: toPlanetId,
            units: units,
            dateSent: moment().add(SHIP_DELAY_IN_MS, 'ms').toDate(),
            attack: fromPlanet.attack,
        };
        var canCreateShipInput = {
            ownerId: ship.ownerId,
            fromPlanetId: ship.fromPlanetId,
            toPlanetId: ship.toPlanetId,
            authenticatedPlayerId: authenticatedPlayerId,
            units: ship.units,
        };
        var canCreateShipRes = selectors.advanced.canCreateShip(state$.value, canCreateShipInput);
        if (!canCreateShipRes.ok) {
            return createServerToSingleClientAction(authorizedAction.payload.clientId, ShipActions.requestSendShipError, __assign({}, serverAction.payload, { error: canCreateShipRes.err }));
        }
        return createServerBroadcastAction(ShipActions.send, {
            ship: ship,
        });
    }));
    return merge(requestSendShipEpic$);
}; };
//# sourceMappingURL=requestSendShipEpic.js.map