import { calculateAngleInRadBetween2Points } from "./calculateAngleInRadBetween2Points";
import planetToPoint from "./planetToPoint";
import { calculatePointOnCircumferenceFromSlope } from "./calculatePointOnCircumferenceFromSlope";
/**
 * Calculates the path from the edge of the planets.
 */
export var calculateShipPath = function (fromPlanet, toPlanet) {
    var pathSlope = calculateAngleInRadBetween2Points(planetToPoint(fromPlanet), planetToPoint(toPlanet));
    return {
        fromPoint: calculatePointOnCircumferenceFromSlope(planetToPoint(fromPlanet), fromPlanet.radius, pathSlope),
        toPoint: calculatePointOnCircumferenceFromSlope(planetToPoint(toPlanet), toPlanet.radius, pathSlope - Math.PI),
    };
};
//# sourceMappingURL=calculateShipPath.js.map