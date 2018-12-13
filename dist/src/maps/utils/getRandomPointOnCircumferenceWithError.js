export var getRandomPointOnCircumferenceWithError = function (center, radius, radiusErrorPercent) {
    var randomAngle = Math.random() * Math.PI * 2;
    var randomRadius = radius * (1 - radiusErrorPercent) + radius * radiusErrorPercent * Math.random();
    return {
        x: center.x + randomRadius * Math.cos(randomAngle),
        y: center.y + randomRadius * Math.sin(randomAngle),
    };
};
//# sourceMappingURL=getRandomPointOnCircumferenceWithError.js.map