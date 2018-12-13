import { planetsUtils } from "../../utils/planetsUtils";
import { selectors } from "../index";
import { MINIMUM_UNITS_PER_SHIP } from "../../constants/constants";
export var canCreateShip = function (state, input) {
    var fromPlanetId = input.fromPlanetId, toPlanetId = input.toPlanetId, ownerId = input.ownerId, authenticatedPlayerId = input.authenticatedPlayerId, units = input.units;
    var planetsById = selectors.planets.getPlanetsById(state);
    var playersById = selectors.players.getPlayersById(state);
    var fromPlanet = planetsById[fromPlanetId];
    var toPlanet = planetsById[toPlanetId];
    var owner = playersById[ownerId];
    if (authenticatedPlayerId === undefined) {
        return { err: "Authenticated player id is undefined", ok: false };
    }
    if (authenticatedPlayerId !== ownerId) {
        return { err: "Owner id is not the same as the authenticated player id", ok: false };
    }
    if (fromPlanetId === toPlanetId) {
        return { err: '"From planet" is the same as "to planet"', ok: false };
    }
    if (!fromPlanet) {
        return { err: 'No "from planet" found', ok: false };
    }
    if (!toPlanet) {
        return { err: 'No "to planet" found', ok: false };
    }
    if (fromPlanet.ownerId !== ownerId) {
        return { err: 'Current player is not the owner of the "from planet"', ok: false };
    }
    if (fromPlanet.ownerId === null) {
        return { err: 'No ownerId on the "from planet"', ok: false };
    }
    if (!owner) {
        return { err: 'No owner player found', ok: false };
    }
    if (units < MINIMUM_UNITS_PER_SHIP) {
        return {
            err: "A ship should have at least " + MINIMUM_UNITS_PER_SHIP + " units. You are trying to send " + units + " units. Try again when you have more units on your planet.",
            ok: false
        };
    }
    if (!planetsUtils.isPlanetInRange(fromPlanet, toPlanet)) {
        return {
            err: "The destination planet is out of the planet's range. Click on your planet to see the range. Upgrade your planet's range and try again.",
            ok: false
        };
    }
    if (selectors.planets.isPlanetProtectedByPlayerId(state, toPlanet.id, ownerId)) {
        return {
            err: "This planet can't be attacked because is necessary to allow the survival of new players. Try attacking another planet.",
            ok: false
        };
    }
    return { ok: true };
};
//# sourceMappingURL=canCreateShip.js.map