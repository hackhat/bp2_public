import { selectors } from "../index";
import { planetHasEnoughSpaceAround } from "../../utils/planetHasEnoughSpaceAround";
import { isPointInBoundingBox } from "../../utils/isPointInBoundingBox";
import planetToPoint from "../../utils/planetToPoint";
var MAX_PLANETS = 220;
export var canCreatePlanet = function (state, input) {
    var planet = input.planet;
    var planetsById = selectors.planets.getPlanetsById(state);
    if (planetsById[planet.id]) {
        return {
            err: "Duplicate planet id, please try again. This is a problem from our side, but should never happen. I guess you were very lucky or tried to hack the game.",
            ok: false
        };
    }
    var planets = Object.values(planetsById);
    var gameSettings = selectors.ui.gameSettings.getGameSettings(state);
    if (!isPointInBoundingBox(planetToPoint(planet), gameSettings.mapBoundingBox)) {
        return {
            err: "Planet is our of bounds. Please place a planet near the center of the game. Current bounding box is " + JSON.stringify(gameSettings.mapBoundingBox) + ".",
            ok: false
        };
    }
    if (!planetHasEnoughSpaceAround(planets, planet)) {
        return { ok: false, err: 'Not enough distance between planets' };
    }
    if (planets.length >= MAX_PLANETS) {
        return { ok: false, err: "Maximum planets in game reached (" + MAX_PLANETS + "). No more planets can be created." };
    }
    return { ok: true };
};
//# sourceMappingURL=canCreatePlanet.js.map