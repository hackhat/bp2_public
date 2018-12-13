import * as _ from "lodash";
import generateUniqueId from "../../utils/generateUniqueId";
import { getRandomPointInCircle } from "./getRandomPointInCircle";
import { cleanUpPlanets } from "./cleanUpPlanets";
import { createPlanet } from "../../utils/createPlanet";
export var createRandomPlanetsInCircle = function (options) {
    var formationRadius = options.formationRadius, numberOfPlanets = options.numberOfPlanets, playerCanSpawn = options.playerCanSpawn, planetType = options.planetType;
    var basePlanetRadius = 15;
    var planets = [];
    var maxRuns = numberOfPlanets + 1000;
    while (maxRuns > 0 && planets.length < numberOfPlanets) {
        maxRuns--;
        var _a = getRandomPointInCircle(formationRadius), x = _a.x, y = _a.y;
        var radius = basePlanetRadius + _.random(20, 125, false);
        planets.push(createPlanet({
            id: generateUniqueId(),
            x: Math.round(x),
            y: Math.round(y),
            radius: 50,
            range: 250,
            playerCanSpawn: playerCanSpawn,
            type: planetType,
        }));
        planets = cleanUpPlanets(planets);
    }
    return planets;
};
//# sourceMappingURL=createRandomPlanetsInCircle.js.map