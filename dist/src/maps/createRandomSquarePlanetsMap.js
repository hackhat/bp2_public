import { createCircularFormationPlanets } from "./utils/createCircularFormationPlanets";
import { createRandomPlanetsInSquare } from "./utils/createRandomPlanetsInSquare";
import { cleanUpPlanets } from "./utils/cleanUpPlanets";
export var createRandomSquarePlanetsMap = function () {
    var circularPlanets = createCircularFormationPlanets({
        numberOfPlanets: 20,
        formationRadius: 500,
        formationOffset: { x: 0, y: 0 },
        basePlanetRadius: 25,
        planetRadiusRandomness: {
            min: 1,
            max: 50,
        },
        playerCanSpawn: true,
        range: 300,
    });
    var planets = circularPlanets.concat(createRandomPlanetsInSquare());
    planets = cleanUpPlanets(planets);
    return planets;
};
//# sourceMappingURL=createRandomSquarePlanetsMap.js.map