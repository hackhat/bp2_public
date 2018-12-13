import { filter, mergeMap, takeUntil } from 'rxjs/operators';
import { merge, interval } from 'rxjs';
import { createServerBroadcastAction } from "../../actions";
import { selectors } from "../../reducers";
import { SystemActions } from "../../actions/SystemActions";
import { PlanetActions } from "../../actions/PlanetActions";
import { getGameEnd$ } from "../utils/getGameEnd$";
export var addPlanetUnitsEpic = function (store) { return function (action$, state$) {
    var tick = function () {
        var onlinePlayers = selectors.players.getOnlinePlayers(state$.value);
        if (onlinePlayers.length === 0) {
            return [];
        }
        return [
            createServerBroadcastAction(PlanetActions.unitCycleTick, null),
        ];
    };
    var addPlanetUnits$ = action$.pipe(filter(function (action) { return action.type === SystemActions.newGame; }), mergeMap(function () {
        return interval(5 * 1000).pipe(filter(function () { return !!selectors.system.getPublicSetting(state$.value, "enableAddPlanetUnits"); }), mergeMap(tick), takeUntil(getGameEnd$(action$)));
    }));
    return merge(addPlanetUnits$);
}; };
//# sourceMappingURL=addPlanetUnitsEpic.js.map