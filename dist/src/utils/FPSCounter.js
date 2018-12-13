var FPSCounter = /** @class */ (function () {
    function FPSCounter() {
        this.frameTimes = [];
    }
    FPSCounter.prototype.tick = function () {
        var now = new Date();
        if (this.lastTickDate !== undefined && Math.random() > 0.99) {
            var diff = +now - (+this.lastTickDate);
            this.frameTimes.push(diff);
            this.frameTimes = this.frameTimes.slice(-5);
        }
        this.lastTickDate = now;
    };
    FPSCounter.prototype.getAverageFps = function () {
        var sum = 0;
        this.frameTimes.forEach(function (i) { return sum += i; });
        var averageFrameTime = sum / this.frameTimes.length;
        return 1000 / averageFrameTime;
    };
    return FPSCounter;
}());
export { FPSCounter };
//# sourceMappingURL=FPSCounter.js.map