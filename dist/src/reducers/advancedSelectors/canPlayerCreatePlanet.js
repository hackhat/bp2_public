import { selectors } from "../index";
import { formatResources } from "../../utils/formatResources";
import { planetsUtils } from "../../utils/planetsUtils";
export var PLANET_RESOURCES_COST = 2;
export var canPlayerCreatePlanet = function (state, input) {
    var authenticatedPlayerId = input.authenticatedPlayerId, planet = input.planet, playerId = input.playerId;
    var playersById = selectors.players.getPlayersById(state);
    if (authenticatedPlayerId === undefined) {
        return { err: 'No authenticatedPlayerId', ok: false };
    }
    if (authenticatedPlayerId !== playerId) {
        return { err: "Authenticated player id doesn't match the player id", ok: false };
    }
    var owner = playersById[authenticatedPlayerId];
    if (!owner) {
        return { err: 'No owner', ok: false };
    }
    if (owner.resources < PLANET_RESOURCES_COST) {
        return {
            err: "You don't have enough resources. To create a planet you need " + formatResources(PLANET_RESOURCES_COST) + ". Try again when you have more resources.",
            ok: false
        };
    }
    var canCreatePlanetRes = selectors.advanced.canCreatePlanet(state, { planet: planet });
    if (!canCreatePlanetRes.ok) {
        return canCreatePlanetRes;
    }
    var planetsOwnedByPlayer = selectors.planets.getPlanetsOwnedByPlayerId(state, playerId);
    if (planetsOwnedByPlayer.length > 0) {
        var isInRange_1 = true;
        planetsOwnedByPlayer.forEach(function (playerPlanet) {
            if (!planetsUtils.isPlanetInRange(playerPlanet, planet)) {
                isInRange_1 = false;
            }
        });
        if (!isInRange_1) {
            return {
                err: "The planet must be in your range. You can't create a planet far away from you. Please try again and create a planet in the range of any of your planets.",
                ok: false
            };
        }
    }
    return { ok: true };
};
//# sourceMappingURL=canPlayerCreatePlanet.js.map