import { filter, mergeMap, takeUntil } from 'rxjs/operators';
import { merge, interval } from 'rxjs';
import { createServerBroadcastAction } from "../../actions";
import { selectors } from "../../reducers";
import { SystemActions } from "../../actions/SystemActions";
import calculateShipLocation from "../../utils/calculateShipLocation";
import { ShipActions } from "../../actions/ShipActions";
import { getGameEnd$ } from "../utils/getGameEnd$";
import { createOnShipArriveAction } from "../utils/createOnShipArriveAction";
/**
 * Dispatches ship arrived actions.
 * Every x seconds loops through the ships and checks which
 * ships arrived to the destination.
 */
export var shipArriveListenerEpic = function (store) { return function (action$, state$) {
    var tick = function () {
        var serverBroadcastShipArriveActions = [];
        // game loop on server side
        // check if new ships arrived
        var state = state$.value;
        var ships = Object.values(selectors.ships.getShipsById(state));
        var planetsById = selectors.planets.getPlanetsById(state);
        ships.forEach(function (ship) {
            if (!ship || ship.arrived) {
                return;
            }
            var fromPlanet = planetsById[ship.fromPlanetId];
            var toPlanet = planetsById[ship.toPlanetId];
            if (!fromPlanet || !toPlanet) {
                console.error("From or to planet not found");
                return;
            }
            var percentDistanceTraveled = calculateShipLocation(ship, fromPlanet, toPlanet, new Date()).percentDistanceTraveled;
            if (percentDistanceTraveled === 1) {
                var toPlanetIsFull = toPlanet.units === toPlanet.capacity;
                var isFriendlyShip = toPlanet.ownerId === ship.ownerId;
                if (toPlanetIsFull && isFriendlyShip)
                    return;
                var shipArriveAction = createOnShipArriveAction(state, ship);
                serverBroadcastShipArriveActions.push(shipArriveAction);
            }
        });
        if (serverBroadcastShipArriveActions.length === 0)
            return [];
        var batchPerformanceAction = createServerBroadcastAction(SystemActions.batchPerformance, {
            type: ShipActions.arrive,
            actions: serverBroadcastShipArriveActions.map(function (action) { return action.payload.serverAction; }),
        });
        return [
            batchPerformanceAction
        ].concat(serverBroadcastShipArriveActions);
    };
    var shipArriveAction$ = action$.pipe(filter(function (action) { return action.type === SystemActions.newGame; }), mergeMap(function () {
        return interval(500).pipe(mergeMap(tick), takeUntil(getGameEnd$(action$)));
    }));
    return merge(shipArriveAction$);
}; };
//# sourceMappingURL=shipArriveListenerEpic.js.map