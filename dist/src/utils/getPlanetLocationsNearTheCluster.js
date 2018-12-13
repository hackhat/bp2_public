import * as quickHull from 'quickhull';
import planetToPoint from "./planetToPoint";
import { getRandomPointOnCircumferenceWithError } from "../maps/utils/getRandomPointOnCircumferenceWithError";
export var getPlanetLocationsNearTheCluster = function (planets) {
    var points = planets.map(planetToPoint);
    var hullResult = quickHull(points);
    var newPlanetLocations = hullResult.filter(function (point) { return !!point; }).map(function (point) {
        return getRandomPointOnCircumferenceWithError(point, 200, 2.5);
    });
    return newPlanetLocations;
};
//# sourceMappingURL=getPlanetLocationsNearTheCluster.js.map