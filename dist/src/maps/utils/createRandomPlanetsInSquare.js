import { PlanetType } from "../../interfaces";
import * as _ from "lodash";
import generateUniqueId from "../../utils/generateUniqueId";
import { createPlanet } from "../../utils/createPlanet";
export var createRandomPlanetsInSquare = function () {
    var numberOfPlanets = 50;
    var formationRadius = 750;
    var basePlanetRadius = 25;
    return _.times(numberOfPlanets, function (i) {
        var radius = basePlanetRadius + _.random(1, 50, false);
        return createPlanet({
            id: generateUniqueId(),
            x: _.random(-formationRadius, formationRadius, false),
            y: _.random(-formationRadius, formationRadius, false),
            radius: radius,
            range: 250,
            playerCanSpawn: true,
            type: PlanetType.generic,
        });
    });
};
//# sourceMappingURL=createRandomPlanetsInSquare.js.map