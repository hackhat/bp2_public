import { planetHasEnoughSpaceAround } from "../../utils/planetHasEnoughSpaceAround";
/**
 * First in list has higher priority to be kept in case of a conflict.
 * @param planets
 */
function remove(array, element) {
    array = array.filter(function (item) {
        return item !== element;
    });
    return array;
}
export var cleanUpPlanets = function (planets) {
    planets.reverse().forEach(function (planet) {
        if (!planetHasEnoughSpaceAround(planets, planet)) {
            planets = remove(planets, planet);
        }
    });
    return planets;
};
//# sourceMappingURL=cleanUpPlanets.js.map