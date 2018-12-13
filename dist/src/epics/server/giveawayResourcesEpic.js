import { filter, mergeMap, takeUntil } from 'rxjs/operators';
import { interval, merge } from 'rxjs';
import { createServerBroadcastAction } from "../../actions";
import { selectors } from "../../reducers";
import { SystemActions } from "../../actions/SystemActions";
import { PlayerActions } from "../../actions/PlayerActions";
import { getGameEnd$ } from "../utils/getGameEnd$";
export var GIVEAWAY_RESOURCES_AMOUNT = 1;
export var giveawayResourcesEpic = function (store) { return function (action$, state$) {
    var tick = function () {
        var onlinePlayers = selectors.players.getOnlinePlayers(state$.value);
        if (onlinePlayers.length === 0) {
            return [];
        }
        var playerToResourceMap = {};
        onlinePlayers.forEach(function (player) {
            var planetsOwnedByThePlayer = selectors.planets.getPlanetsOwnedByPlayerId(state$.value, player.id);
            if (planetsOwnedByThePlayer.length === 0)
                return;
            var resourcesFromPlanets = planetsOwnedByThePlayer.reduce(function (accumulator, planet) { return accumulator + planet.resourcesPerCycle; }, 0);
            playerToResourceMap[player.id] = GIVEAWAY_RESOURCES_AMOUNT + resourcesFromPlanets;
        });
        var action = createServerBroadcastAction(PlayerActions.addResourcesToMany, { playerToResourceMap: playerToResourceMap });
        return [action];
    };
    var givewayResources$ = action$.pipe(filter(function (action) { return action.type === SystemActions.newGame; }), mergeMap(function () {
        return interval(30 * 1000).pipe(mergeMap(tick), takeUntil(getGameEnd$(action$)));
    }));
    return merge(givewayResources$);
}; };
//# sourceMappingURL=giveawayResourcesEpic.js.map