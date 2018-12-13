export var calculatePointOnCircumferenceFromSlope = function (circleCenter, circleRadius, slope) {
    return {
        x: circleCenter.x + circleRadius * Math.cos(slope),
        y: circleCenter.y + circleRadius * Math.sin(slope),
    };
};
//# sourceMappingURL=calculatePointOnCircumferenceFromSlope.js.map