import calculateDistanceBetween2Points from "./calculateDistanceBetween2Points";
import { calculateShipPath } from "./calculateShipPath";
var pxPerSecond = 75;
var calculateShipLocation = function (ship, fromPlanet, toPlanet, serverDate) {
    var timeElapsedInSeconds = ship.temporary ? 0 : Math.max(+serverDate - +ship.dateSent, 0) / 1000;
    var _a = calculateShipPath(fromPlanet, toPlanet), fromPoint = _a.fromPoint, toPoint = _a.toPoint;
    var totalDistance = calculateDistanceBetween2Points(fromPoint, toPoint);
    var speed = pxPerSecond;
    var distanceTraveled = Math.min(timeElapsedInSeconds * speed, totalDistance);
    var percentDistanceTraveled = distanceTraveled / totalDistance;
    var deltaX = toPoint.x - fromPoint.x;
    var deltaY = toPoint.y - fromPoint.y;
    var x = fromPoint.x + percentDistanceTraveled * deltaX;
    var y = fromPoint.y + percentDistanceTraveled * deltaY;
    return { x: x, y: y, percentDistanceTraveled: percentDistanceTraveled };
};
export default calculateShipLocation;
//# sourceMappingURL=calculateShipLocation.js.map