import { createPlanet } from "../../src/utils/createPlanet";
import { PlanetType } from "../../src/interfaces";
var bigRadius = 50;
var smallRadius = 10;
export var namedPlanets = {
    big: createPlanet({
        id: 'big',
        x: 0,
        y: 0,
        radius: bigRadius,
        range: 1000,
        protectedGroupId: 1,
        type: PlanetType.generic,
    }),
    smallRight: createPlanet({
        id: 'smallRight',
        x: 200,
        y: 0,
        radius: smallRadius,
        range: 1000,
        type: PlanetType.generic,
    }),
    smallBottom: createPlanet({
        id: 'smallBottom',
        x: 0,
        y: 200,
        radius: smallRadius,
        range: 1000,
        type: PlanetType.generic,
    }),
    smallLeft: createPlanet({
        id: 'smallLeft',
        x: -200,
        y: 0,
        radius: smallRadius,
        range: 1000,
        type: PlanetType.generic,
    }),
};
export var planets = Object.values(namedPlanets);
//# sourceMappingURL=planets.js.map