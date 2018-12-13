import { filter, mergeMap, takeUntil } from 'rxjs/operators';
import { interval, merge } from 'rxjs';
import { createServerBroadcastAction } from "../../actions";
import { selectors } from "../../reducers";
import { PlanetType } from "../../interfaces";
import { SystemActions } from "../../actions/SystemActions";
import { getGameEnd$ } from "../utils/getGameEnd$";
import { getPlanetLocationsNearTheCluster } from "../../utils/getPlanetLocationsNearTheCluster";
import { createPlanet } from "../../utils/createPlanet";
import generateUniqueId from "../../utils/generateUniqueId";
import { PlanetActions } from "../../actions/PlanetActions";
import { selectRandomFromArray } from "../../utils/selectRandomFromArray";
export var createNewEmptyPlanetsEpic = function (store) { return function (action$, state$) {
    var tick = function () {
        var allPlanets = Object.values(selectors.planets.getPlanetsById(state$.value));
        if (allPlanets.length > 150) {
            return [];
        }
        var emptyPlanets = selectors.planets.getPlanetsOwnedByPlayerId(state$.value, null);
        var percentOfPlanetsOccupied = 1 - emptyPlanets.length / allPlanets.length;
        if (false && percentOfPlanetsOccupied < 0.5) {
            return [];
        }
        var newPossiblePlanetLocations = getPlanetLocationsNearTheCluster(emptyPlanets);
        var newPossiblePlanets = newPossiblePlanetLocations.map(function (newPossiblePlanetLocation) {
            return createPlanet({
                id: generateUniqueId(),
                x: newPossiblePlanetLocation.x,
                y: newPossiblePlanetLocation.y,
                radius: selectRandomFromArray([25, 25, 25, 35, 35, 50, 50, 50, 75, 75, 100]) || 50,
                type: selectRandomFromArray([PlanetType.resource, PlanetType.generic, PlanetType.generic, PlanetType.generic]) || PlanetType.generic,
                range: 250,
            });
        });
        return [createServerBroadcastAction(PlanetActions.addMany, {
                planets: newPossiblePlanets,
            })];
    };
    var createNewEmptyPlanets$ = action$.pipe(filter(function (action) { return action.type === SystemActions.newGame; }), mergeMap(function () {
        return interval(300).pipe(filter(function () { return selectors.system.getPublicSettings(state$.value).createNewEmptyPlanets; }), mergeMap(tick), takeUntil(getGameEnd$(action$)));
    }));
    return merge(createNewEmptyPlanets$);
}; };
//# sourceMappingURL=createNewEmptyPlanetsEpic.js.map