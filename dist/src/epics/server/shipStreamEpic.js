import { filter, mergeMap, takeUntil } from 'rxjs/operators';
import { merge, interval } from 'rxjs';
import { createServerBroadcastAction } from "../../actions";
import { ShipActions } from "../../actions/ShipActions";
import { selectors } from "../../reducers";
import { SystemActions } from "../../actions/SystemActions";
import { planetsUtils } from "../../utils/planetsUtils";
import * as _ from "lodash";
import { TemporaryPlanets } from "../../utils/TemporaryPlanets";
import { getGameEnd$ } from "../utils/getGameEnd$";
import { MINIMUM_UNITS_PER_SHIP, SHIP_DELAY_IN_MS, SHIP_STREAM_FREQUENCY } from "../../constants/constants";
import generateUniqueId from "../../utils/generateUniqueId";
import * as moment from "moment";
export var shipStreamEpic = function (store) { return function (action$, state$) {
    var tick = function () {
        var outputActions = [];
        var state = state$.value;
        var planetsById = selectors.planets.getPlanetsById(state);
        var playersById = selectors.players.getPlayersById(state);
        var shipStreamsById = selectors.ships.getShipStreams(state, { includeTemporary: false });
        var shipStreamsByPlanetId = _.groupBy(shipStreamsById, 'fromPlanetId');
        var temporaryPlanets = new TemporaryPlanets(planetsById);
        var shipDateSent = moment().add(SHIP_DELAY_IN_MS, 'ms').toDate();
        _.forEach(shipStreamsByPlanetId, function (shipStreams, fromPlanetId) {
            var fromPlanet = temporaryPlanets.getPlanetById(fromPlanetId);
            if (!fromPlanet)
                return;
            if (planetsUtils.getPercentageFilled(fromPlanet) < 0.5)
                return;
            var availableUnitsToSend = fromPlanet.units - Math.floor(fromPlanet.units * 0.66);
            if (availableUnitsToSend < 1)
                return;
            var estimatedUnitsLeft = fromPlanet.units - availableUnitsToSend;
            if (estimatedUnitsLeft < 10)
                return;
            var availableUnitsLeftToBeSent = availableUnitsToSend;
            var unitsSentByEachStream = Math.max(Math.floor(availableUnitsToSend / shipStreams.length), MINIMUM_UNITS_PER_SHIP);
            _.shuffle(shipStreams).forEach(function (shipStream) {
                var toPlanet = temporaryPlanets.getPlanetById(shipStream.toPlanetId);
                if (!fromPlanet.ownerId)
                    return;
                if (availableUnitsLeftToBeSent < MINIMUM_UNITS_PER_SHIP)
                    return;
                var shipStreamOwner = playersById[fromPlanet.ownerId];
                if (!shipStreamOwner)
                    return;
                if (!shipStreamOwner.color)
                    return;
                if (!toPlanet)
                    return;
                var friendlyPlanet = toPlanet.ownerId === fromPlanet.ownerId;
                if (friendlyPlanet && planetsUtils.getPercentageFilled(toPlanet) === 1)
                    return;
                var ship = {
                    id: generateUniqueId(),
                    fromPlanetId: fromPlanet.id,
                    toPlanetId: toPlanet.id,
                    ownerId: fromPlanet.ownerId,
                    temporary: true,
                    color: fromPlanet.color,
                    arrived: false,
                    dateSent: shipDateSent,
                    units: unitsSentByEachStream,
                    attack: fromPlanet.attack,
                };
                var sendShipAction = createServerBroadcastAction(ShipActions.send, {
                    ship: ship
                });
                outputActions.push(sendShipAction);
                availableUnitsLeftToBeSent -= ship.units;
            });
        });
        return outputActions;
    };
    var shipStreamAction$ = action$.pipe(filter(function (action) { return action.type === SystemActions.newGame; }), mergeMap(function () {
        return interval(SHIP_STREAM_FREQUENCY).pipe(mergeMap(tick), takeUntil(getGameEnd$(action$)));
    }));
    return merge(shipStreamAction$);
}; };
//# sourceMappingURL=shipStreamEpic.js.map