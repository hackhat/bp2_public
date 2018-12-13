export var isPointInBoundingBox = function (point, boundingBox) {
    var insideTopBound = point.y >= boundingBox.top;
    var insideBottomBound = point.y <= boundingBox.bottom;
    var insideLeftBound = point.x >= boundingBox.left;
    var insideRightBound = point.x <= boundingBox.right;
    return insideTopBound && insideBottomBound && insideLeftBound && insideRightBound;
};
//# sourceMappingURL=isPointInBoundingBox.js.map