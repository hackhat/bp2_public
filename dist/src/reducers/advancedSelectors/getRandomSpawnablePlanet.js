import { selectors } from "../index";
import { planetsUtils } from "../../utils/planetsUtils";
import { selectRandomFromArray } from "../../utils/selectRandomFromArray";
export var getRandomSpawnablePlanet = function (state) {
    var planetsById = selectors.planets.getPlanetsById(state);
    var freePlanets = Object.values(planetsById)
        .filter(planetsUtils.onlyFreePlanet)
        .filter(function (planet) { return planet && planet.playerCanSpawn; });
    return selectRandomFromArray(freePlanets);
};
//# sourceMappingURL=getRandomSpawnablePlanet.js.map