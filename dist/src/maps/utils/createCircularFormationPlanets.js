import { PlanetType } from "../../interfaces";
import * as _ from "lodash";
import { degreesToRadians } from "../../utils/degreesToRadiansConversion";
import generateUniqueId from "../../utils/generateUniqueId";
import { createPlanet } from "../../utils/createPlanet";
;
export var createCircularFormationPlanets = function (options) {
    var numberOfPlanets = options.numberOfPlanets, formationRadius = options.formationRadius, formationOffset = options.formationOffset, basePlanetRadius = options.basePlanetRadius, planetRadiusRandomness = options.planetRadiusRandomness, playerCanSpawn = options.playerCanSpawn, range = options.range;
    return _.times(numberOfPlanets, function (i) {
        var degreesInRad = degreesToRadians(i / numberOfPlanets * 360);
        var radius = basePlanetRadius + _.random(planetRadiusRandomness.min, planetRadiusRandomness.max, false);
        return createPlanet({
            id: generateUniqueId(),
            x: Math.round(Math.cos(degreesInRad) * formationRadius + formationOffset.x),
            y: Math.round(Math.sin(degreesInRad) * formationRadius + formationOffset.y),
            radius: radius,
            range: range,
            temporary: false,
            playerCanSpawn: playerCanSpawn,
            protectedGroupId: i,
            type: PlanetType.generic,
        });
    });
};
//# sourceMappingURL=createCircularFormationPlanets.js.map