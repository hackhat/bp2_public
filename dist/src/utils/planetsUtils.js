import planetToPoint from "./planetToPoint";
import calculateDistanceBetween2Points from "./calculateDistanceBetween2Points";
export var onlyFreePlanet = function (planet) { return planet.ownerId === null; };
export var isSpawnable = function (planet) { return planet.playerCanSpawn; };
export var isOwnedBy = function (playerId) { return function (planet) { return planet.ownerId === playerId; }; };
export var isNotOwnedBy = function (playerId) { return function (planet) { return planet.ownerId !== playerId; }; };
export var isPlanetInRange = function (fromPlanet, toPlanet) {
    if (fromPlanet.id === toPlanet.id) {
        return false;
    }
    var planetDistanceFromCore = calculateDistanceBetween2Points(planetToPoint(fromPlanet), planetToPoint(toPlanet));
    var planetDistanceFromEdges = planetDistanceFromCore - fromPlanet.radius - toPlanet.radius;
    var planetReachable = fromPlanet.range > planetDistanceFromEdges;
    return planetReachable;
};
export var getPlanetsInRange = function (fromPlanet, planets) {
    var planetsInRange = planets.filter(function (planet) {
        return isPlanetInRange(fromPlanet, planet);
    });
    return planetsInRange;
};
export var sortByUnitsMissing = function (planets) {
    return planets.sort(function (a, b) {
        var aMissing = a.capacity - a.units;
        var bMissing = b.capacity - b.units;
        return bMissing - aMissing;
    });
};
export var getPercentageFilled = function (planet) { return planet.units / planet.capacity; };
export var planetsUtils = {
    onlyFreePlanet: onlyFreePlanet,
    isSpawnable: isSpawnable,
    isPlanetInRange: isPlanetInRange,
    getPlanetsInRange: getPlanetsInRange,
    isOwnedBy: isOwnedBy,
    isNotOwnedBy: isNotOwnedBy,
    sortByUnitsMissing: sortByUnitsMissing,
    getPercentageFilled: getPercentageFilled,
};
//# sourceMappingURL=planetsUtils.js.map