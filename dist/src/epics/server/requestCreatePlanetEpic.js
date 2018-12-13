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
import { selectors } from "../../reducers";
import { PlanetActions } from "../../actions/PlanetActions";
import { isTypeOfAuthorizedAction } from "../utils/isTypeOfAuthorizedAction";
import { createPlanet } from "../../utils/createPlanet";
import { createPlanetDefaults } from "../../constants/constants";
export var requestCreatePlanetEpic = function (store) { return function (action$, state$) {
    var requestCreatePlanet$ = action$.pipe(isTypeOfAuthorizedAction(PlanetActions.requestCreateOne), mergeMap(function (authorizedAction) {
        var _a = authorizedAction.payload, serverAction = _a.serverAction, authenticatedPlayerId = _a.authenticatedPlayerId;
        var _b = serverAction.payload, x = _b.x, y = _b.y, playerId = _b.playerId, id = _b.id;
        var planet = createPlanet(__assign({}, createPlanetDefaults, { id: id,
            x: x,
            y: y }));
        var canCreatePlanetInput = {
            planet: planet,
            playerId: playerId,
            authenticatedPlayerId: authenticatedPlayerId,
        };
        var res = selectors.advanced.canPlayerCreatePlanet(state$.value, canCreatePlanetInput);
        if (!res.ok) {
            return [
                createServerToSingleClientAction(authorizedAction.payload.clientId, PlanetActions.createOneError, __assign({}, serverAction.payload, { error: res.err })),
            ];
        }
        return [
            createServerBroadcastAction(PlanetActions.createOne, {
                planet: planet,
                playerId: playerId,
            }),
        ];
    }));
    return merge(requestCreatePlanet$);
}; };
//# sourceMappingURL=requestCreatePlanetEpic.js.map