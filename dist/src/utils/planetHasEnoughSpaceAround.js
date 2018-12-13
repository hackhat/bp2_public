import calculateDistanceBetween2Points from "./calculateDistanceBetween2Points";
import { MIN_DISTANCE_BETWEEN_PLANETS } from "../constants/constants";
/**
 * Ignores comparison with planets with the same id.
 */
export var planetHasEnoughSpaceAround = function (planets, planet) {
    var i = planets.length;
    // while and not for each because can be an expensive task
    while (i--) {
        var existingPlanet = planets[i];
        if (!existingPlanet) {
            continue;
        }
        if (existingPlanet.id === planet.id) {
            continue;
        }
        var distanceFromCenter = calculateDistanceBetween2Points(existingPlanet, planet);
        var distanceFromEdges = distanceFromCenter - existingPlanet.radius - planet.radius;
        if (distanceFromEdges < MIN_DISTANCE_BETWEEN_PLANETS) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=planetHasEnoughSpaceAround.js.map