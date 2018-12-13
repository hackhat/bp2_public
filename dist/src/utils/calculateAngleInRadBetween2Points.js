// https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
// to rad
export var calculateAngleInRadBetween2Points = function (fromPoint, toPoint) {
    var deltaX = toPoint.x - fromPoint.x;
    var deltaY = toPoint.y - fromPoint.y;
    return Math.atan2(deltaY, deltaX); // range (-PI, PI]
};
//# sourceMappingURL=calculateAngleInRadBetween2Points.js.map