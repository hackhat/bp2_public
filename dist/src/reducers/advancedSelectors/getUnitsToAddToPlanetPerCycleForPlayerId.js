import { selectors } from "../index";
import { isProduction } from "../../utils/isProduction";
var baseUnitsToAdd = isProduction ? 10 : 10;
export var getUnitsToAddToPlanetPerCycleForPlayerId = function (state, planetId) {
    var planet = selectors.planets.getPlanetById(state, planetId);
    if (planet) {
        return planet.unitsPerCycle;
    }
    return baseUnitsToAdd;
};
//# sourceMappingURL=getUnitsToAddToPlanetPerCycleForPlayerId.js.map