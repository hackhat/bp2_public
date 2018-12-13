export var getRandomPointInCircle = function (radius) {
    var randomRadius = radius * Math.sqrt(Math.random());
    var randomAngle = Math.random() * 2 * Math.PI;
    return {
        x: randomRadius * Math.cos(randomAngle),
        y: randomRadius * Math.sin(randomAngle),
    };
};
//# sourceMappingURL=getRandomPointInCircle.js.map