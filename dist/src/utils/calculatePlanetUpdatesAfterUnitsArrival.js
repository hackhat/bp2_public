import { sanitizeBetween } from "./sanitizeBetween";
var calculatePlanetUpdatesAfterUnitsArrival = function (toPlanet, args) {
    var isFriendlyPlanet = args.ownerId === toPlanet.ownerId;
    var ownershipChanged = false;
    var unitsOfNewOwner = 0;
    var unitsRemaning = 0;
    var toPlanetUpdates = {};
    if (isFriendlyPlanet) {
        toPlanetUpdates = {
            units: sanitizeBetween(toPlanet.units + args.units, 0, toPlanet.capacity),
        };
    }
    else {
        var maxKilledUnits = Math.min(toPlanet.units, args.units);
        var unitsSurvivedOnThePlanet = toPlanet.units - maxKilledUnits;
        ownershipChanged = unitsSurvivedOnThePlanet === 0;
        if (ownershipChanged) {
            var aliveUnitsFromShip = args.units - maxKilledUnits;
            unitsOfNewOwner = sanitizeBetween(aliveUnitsFromShip, 0, toPlanet.capacity);
            toPlanetUpdates = {
                units: 0,
                ownerId: undefined,
                color: args.color,
            };
        }
        else {
            unitsRemaning = sanitizeBetween(toPlanet.units - args.units, 0, toPlanet.capacity);
            toPlanetUpdates = {
                units: sanitizeBetween(toPlanet.units - args.units, 0, toPlanet.capacity),
            };
        }
    }
    return { toPlanetUpdates: toPlanetUpdates, ownershipChanged: ownershipChanged, unitsOfNewOwner: unitsOfNewOwner, unitsRemaning: unitsRemaning };
};
export var calculatePlanetUpdatesAfterShipArrival = function (toPlanet, ship) {
    return calculatePlanetUpdatesAfterUnitsArrival(toPlanet, {
        ownerId: ship.ownerId,
        color: ship.color,
        units: ship.units
    });
};
//# sourceMappingURL=calculatePlanetUpdatesAfterUnitsArrival.js.map