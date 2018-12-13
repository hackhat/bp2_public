var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var TemporaryPlanets = /** @class */ (function () {
    function TemporaryPlanets(planetsById) {
        this.planetUpdatesById = {};
        this.planetsById = planetsById;
    }
    TemporaryPlanets.prototype.updatePlanet = function (planetDetails) {
        if (!this.planetUpdatesById[planetDetails.id]) {
            this.planetUpdatesById[planetDetails.id] = {};
        }
        this.planetUpdatesById[planetDetails.id] = __assign({}, this.planetUpdatesById[planetDetails.id], planetDetails);
    };
    TemporaryPlanets.prototype.getPlanetById = function (planetId) {
        var planet = this.planetsById[planetId];
        if (!planet)
            return undefined;
        return __assign({}, planet, this.planetUpdatesById[planetId]);
    };
    TemporaryPlanets.prototype.getPlanetUpdatesById = function () {
        return this.planetUpdatesById;
    };
    return TemporaryPlanets;
}());
export { TemporaryPlanets };
//# sourceMappingURL=TemporaryPlanets.js.map