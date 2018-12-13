import { selectors } from "../index";
export var canStartGameWith = function (state, input) {
    var planetId = input.planetId, authenticatedPlayerId = input.authenticatedPlayerId, playerId = input.playerId;
    if (authenticatedPlayerId === undefined) {
        return { ok: false, err: "Player id is undefined" };
    }
    if (authenticatedPlayerId !== playerId) {
        return { err: "Authenticated player id doesn't match the player id", ok: false };
    }
    var player = selectors.players.getPlayerById(state, authenticatedPlayerId);
    if (!player) {
        return { ok: false, err: "Can't find player with id \"" + authenticatedPlayerId + "\"" };
    }
    var planetsOwnedByPlayer = selectors.planets.getPlanetsOwnedByPlayerId(state, authenticatedPlayerId);
    var planet = selectors.planets.getPlanetById(state, planetId);
    if (!planet) {
        return { ok: false, err: "Planet not found" };
    }
    if (planet.ownerId !== null) {
        return { ok: false, err: "Planet is owned by somebody else" };
    }
    if (planetsOwnedByPlayer.length > 0) {
        return { ok: false, err: "Player owns more than 0 planets" };
    }
    return {
        ok: true,
    };
};
//# sourceMappingURL=canStartGameWith.js.map