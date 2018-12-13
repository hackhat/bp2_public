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
import { PlanetType } from "../interfaces";
import { PLANET_WITHOUT_OWNER_COLOR } from "../constants/constants";
export var createPlanet = function (partialPlanet) {
    var resourcesPerCycle = 0;
    if (partialPlanet.type === PlanetType.resource) {
        resourcesPerCycle = 1;
    }
    return __assign({ unitsPerCycle: 5, resourcesPerCycle: resourcesPerCycle, defense: 1, attack: 1, ownerId: null, playerCanSpawn: true, color: PLANET_WITHOUT_OWNER_COLOR }, partialPlanet, { units: partialPlanet.radius * 2, capacity: partialPlanet.radius * 2, temporary: true, appliedUpgradeDefinitionIds: [] });
};
//# sourceMappingURL=createPlanet.js.map