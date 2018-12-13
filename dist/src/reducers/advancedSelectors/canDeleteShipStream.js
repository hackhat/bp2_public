import { selectors } from "../index";
export var canDeleteShipStream = function (state, input) {
    var shipStreamId = input.shipStreamId, authenticatedPlayerId = input.authenticatedPlayerId;
    var shipStream = selectors.ships.getShipStreams(state, { includeTemporary: false })[shipStreamId];
    if (!shipStream) {
        return {
            ok: false,
            err: "No shipStream found",
        };
    }
    var fromPlanet = selectors.planets.getPlanetById(state, shipStream.fromPlanetId);
    if (!fromPlanet) {
        return {
            ok: false,
            err: "No fromPlanet found",
        };
    }
    if (fromPlanet.ownerId !== authenticatedPlayerId) {
        return {
            ok: false,
            err: "Only the planet owner can delete an outgoing stream. Conquer this planet and then try again.",
        };
    }
    return {
        ok: true,
    };
};
//# sourceMappingURL=canDeleteShipStream.js.map