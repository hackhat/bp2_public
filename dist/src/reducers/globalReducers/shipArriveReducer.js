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
import { SystemActions } from "../../actions/SystemActions";
import { ShipActions } from "../../actions/ShipActions";
import * as fromPlanets from "../planetsReducer";
import { PLANET_MONEY_VALUE } from "../../constants/constants";
import * as fromPlayers from "../playersReducer";
import { selectors } from "../index";
export var shipArriveReducer = function (state, action) {
    // This can't be batched because each action depends on the previous result.
    // For example:
    //  - User has 1 coin
    //  - Owns a new planet on ship arrival, and loses 1 coin
    //  - Another ship arrives and also wins that planet, making the user go -1
    // By running them in sequence this cannot happen.
    // state = rootReducer(state, arriveFromReducerAction);
    if (action.type === SystemActions.batchPerformance && action.payload.type === ShipActions.arrive) {
        action.payload.actions.forEach(function (subAction) {
            var ship = selectors.ships.getShipById(state, subAction.payload.shipId);
            if (!ship) {
                console.error("No ship found");
                return;
            }
            var shipPlayerOwner = selectors.players.getPlayerById(state, ship.ownerId);
            if (!shipPlayerOwner) {
                console.error("No to ship player owner found");
                return;
            }
            var toPlanet = selectors.planets.getPlanetById(state, ship.toPlanetId);
            if (!toPlanet) {
                console.error("No to planet found");
                return;
            }
            var isFriendlyShip = toPlanet.ownerId === ship.ownerId;
            if (isFriendlyShip) {
                state = __assign({}, state, { planets: fromPlanets.updatePlanet(state.planets, toPlanet.id, {
                        units: toPlanet.units + ship.units,
                    }) });
            }
            else {
                var shipOwnerPlayerHasMoneyForNewPlanet = shipPlayerOwner.availableMoneyAmountInCents >= PLANET_MONEY_VALUE;
                var resultingUnitsAfterAttack = toPlanet.units - ship.units * ship.attack / toPlanet.defense;
                var shipKilledAllUnits = resultingUnitsAfterAttack < 0;
                var planetOwnerLostThePlanet = shipKilledAllUnits && shipOwnerPlayerHasMoneyForNewPlanet;
                if (planetOwnerLostThePlanet) {
                    var toPlanetOwnerId = toPlanet.ownerId;
                    state = __assign({}, state, { planets: fromPlanets.updatePlanet(state.planets, toPlanet.id, {
                            units: -(resultingUnitsAfterAttack),
                            color: ship.color,
                            ownerId: ship.ownerId,
                        }) });
                    if (toPlanetOwnerId !== null) {
                        state = __assign({}, state, { players: fromPlayers.increasePlayerFinances(state.players, toPlanetOwnerId, -PLANET_MONEY_VALUE, 0) });
                        state = __assign({}, state, { players: fromPlayers.increasePlayerFinances(state.players, ship.ownerId, PLANET_MONEY_VALUE, 0) });
                    }
                    else {
                        state = __assign({}, state, { players: fromPlayers.increasePlayerFinances(state.players, ship.ownerId, PLANET_MONEY_VALUE, -PLANET_MONEY_VALUE) });
                    }
                }
                else {
                    state = __assign({}, state, { planets: fromPlanets.updatePlanet(state.planets, toPlanet.id, {
                            units: resultingUnitsAfterAttack,
                        }) });
                }
            }
        });
    }
    return state;
};
//# sourceMappingURL=shipArriveReducer.js.map