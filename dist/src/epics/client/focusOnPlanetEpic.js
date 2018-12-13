import { SystemActions } from "../../actions/SystemActions";
import { filter, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createAppAction } from "../../actions";
import { selectors } from "../../reducers";
import { PlanetMapUIActions } from "../../components/PlanetMap/PlanetMapUIActions";
import { onRoomDataLoaded } from "../utils/onRoomDataLoaded";
import { ofType } from "../utils/ofType";
export var focusOnPlanetEpic = function (api, store) { return function (action$, state$) {
    var mapToFocusPlanetAction = function () {
        var currentPlayerId = selectors.ui.global.getCurrentPlayerId(state$.value);
        if (currentPlayerId === undefined) {
            return null;
        }
        var randomPlanetOwnedByPlayer = selectors.planets.getPlanetsOwnedByPlayerId(state$.value, currentPlayerId)[0];
        if (randomPlanetOwnedByPlayer === undefined) {
            return null;
        }
        return createAppAction(PlanetMapUIActions.focusOnPlanet, {
            planetId: randomPlanetOwnedByPlayer.id,
        });
    };
    var focusOnPlanetAfterJoinRoom$ = onRoomDataLoaded(action$, state$).pipe(map(mapToFocusPlanetAction), filter(function (action) { return action !== null; }));
    var focusOnPlanetAfterRequest$ = action$.pipe(ofType(PlanetMapUIActions.requestFocusOnMyPlanets), map(mapToFocusPlanetAction), filter(function (action) { return action !== null; }));
    var focusOnPlanetAfterStartGameWith$ = action$.pipe(filter(function (action) { return action.type === SystemActions.startGameWith; }), filter(function (action) {
        var currentPlayerId = selectors.ui.global.getCurrentPlayerId(state$.value);
        return action.payload.playerId === currentPlayerId;
    }), map(function (action) {
        return action.payload.playerId;
    }), map(mapToFocusPlanetAction), filter(function (action) { return action !== null; }));
    return merge(focusOnPlanetAfterJoinRoom$, focusOnPlanetAfterRequest$, focusOnPlanetAfterStartGameWith$);
}; };
//# sourceMappingURL=focusOnPlanetEpic.js.map