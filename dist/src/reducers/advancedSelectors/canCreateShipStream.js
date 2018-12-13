import { planetsUtils } from "../../utils/planetsUtils";
import { SHIP_STREAM_RESOURCE_COST } from "../../epics/server/requestShipStreamEpic";
import { selectors } from "../index";
import { formatResources } from "../../utils/formatResources";
export var canCreateShipStream = function (state, input) {
    var fromPlanetId = input.fromPlanetId, toPlanetId = input.toPlanetId, authenticatedPlayerId = input.authenticatedPlayerId;
    if (authenticatedPlayerId === undefined) {
        return { err: 'Authenticated player id is undefined', ok: false };
    }
    var planetsById = selectors.planets.getPlanetsById(state);
    var playersById = selectors.players.getPlayersById(state);
    var shipStreamsById = selectors.ships.getShipStreams(state, { includeTemporary: false });
    var fromPlanet = planetsById[fromPlanetId];
    var toPlanet = planetsById[toPlanetId];
    var ownerId = authenticatedPlayerId;
    var owner = playersById[ownerId];
    if (authenticatedPlayerId !== ownerId) {
        return { err: "Authenticated player does't match the ship stream owner id", ok: false };
    }
    if (fromPlanetId === toPlanetId) {
        return { err: '"From planet" is the same as "to planet"', ok: false };
    }
    if (!fromPlanet) {
        return { err: 'No from planet', ok: false };
    }
    if (!toPlanet) {
        return { err: 'No to planet', ok: false };
    }
    if (fromPlanet.ownerId !== authenticatedPlayerId) {
        return { err: 'From planet owner is not the same as the logged in player', ok: false };
    }
    if (fromPlanet.ownerId === null) {
        return { err: 'No ownerId on the from planet', ok: false };
    }
    if (!owner) {
        return { err: 'No owner player found', ok: false };
    }
    if (owner.resources < SHIP_STREAM_RESOURCE_COST) {
        return {
            err: "You don't have enough resources. To create a ship stream you need " + formatResources(SHIP_STREAM_RESOURCE_COST) + ". Try again when you have more resources.",
            ok: false
        };
    }
    if (selectors.planets.isPlanetProtectedByPlayerId(state, toPlanet.id, ownerId)) {
        return {
            err: "This planet can't be attacked because is necessary to allow the survival of new players. Try attacking another planet.",
            ok: false
        };
    }
    var hasAShipStreamBetweenThesePlanetsAlready = !!Object.values(shipStreamsById).find(function (shipStream) {
        if (!shipStream) {
            return false;
        }
        var betweenFromAndTo = shipStream.fromPlanetId === fromPlanetId && shipStream.toPlanetId === toPlanetId;
        return betweenFromAndTo;
    });
    if (hasAShipStreamBetweenThesePlanetsAlready) {
        return {
            err: "Another ship stream already existing between these 2 planets. Having another one won't send more units, so don't worry about it.",
            ok: false
        };
    }
    if (!planetsUtils.isPlanetInRange(fromPlanet, toPlanet)) {
        return {
            err: "The destination planet is out of the planet's range. Click on your planet to see the range. Upgrade your planet's range and try again.",
            ok: false
        };
    }
    var outgoingShipStreams = Object.values(shipStreamsById).filter(function (shipStream) {
        if (!shipStream) {
            return false;
        }
        return shipStream.fromPlanetId === fromPlanetId;
    }).length;
    var maxOutboundStreamsFromPlanet = selectors.system.getPublicSettings(state).maxOutboundStreamsFromPlanet;
    if (outgoingShipStreams >= maxOutboundStreamsFromPlanet) {
        return {
            err: "You reached the maximum amount of outgoing ship streams for this planet. Max " + maxOutboundStreamsFromPlanet + " ship streams.",
            ok: false
        };
    }
    return { ok: true };
};
//# sourceMappingURL=canCreateShipStream.js.map