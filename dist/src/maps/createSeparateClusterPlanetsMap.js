import { PlanetType } from "../interfaces";
import { cleanUpPlanets } from "./utils/cleanUpPlanets";
import { createCircularFormationPlanets } from "./utils/createCircularFormationPlanets";
import { createRandomPlanetsInCircle } from "./utils/createRandomPlanetsInCircle";
import { isProduction } from "../utils/isProduction";
var SPACE_BETWEEN_LAYERS = 350;
var LAYER_PLANET_RADIUS = 50;
var WAR_ZONE_RADIUS = 500;
var WAR_ZONE_PLANETS = 25;
var INCLUDE_SATELLITES = false;
var BRANCHES = 30;
var INCLUDE_4_LAYER = false;
var SPAWN_FROM_WAR_ZONE_PLANETS = isProduction ? true : true;
var SPAWN_FROM_SAFE_ZONE_PLANETS = isProduction ? true : false;
var CREATE_SAFE_PLANETS = false;
export var createSeparateClusterPlanetsMap = function () {
    var centerPoint = { x: 0, y: 0 };
    var warZonePlanetsResources = createRandomPlanetsInCircle({
        formationRadius: WAR_ZONE_RADIUS,
        numberOfPlanets: Math.round(WAR_ZONE_PLANETS * 0.6),
        playerCanSpawn: SPAWN_FROM_WAR_ZONE_PLANETS,
        planetType: PlanetType.resource
    });
    var warZonePlanetsGeneric = createRandomPlanetsInCircle({
        formationRadius: WAR_ZONE_RADIUS,
        numberOfPlanets: Math.round(WAR_ZONE_PLANETS * 0.4),
        playerCanSpawn: SPAWN_FROM_WAR_ZONE_PLANETS,
        planetType: PlanetType.generic
    });
    var layer1 = createCircularFormationPlanets({
        basePlanetRadius: LAYER_PLANET_RADIUS,
        formationOffset: { x: centerPoint.x, y: centerPoint.y },
        formationRadius: WAR_ZONE_RADIUS + SPACE_BETWEEN_LAYERS * 0,
        numberOfPlanets: BRANCHES,
        planetRadiusRandomness: {
            min: 0,
            max: 0,
        },
        playerCanSpawn: false,
        range: SPACE_BETWEEN_LAYERS + LAYER_PLANET_RADIUS + 100,
    });
    var layer2 = createCircularFormationPlanets({
        basePlanetRadius: LAYER_PLANET_RADIUS,
        formationOffset: { x: centerPoint.x, y: centerPoint.y },
        formationRadius: WAR_ZONE_RADIUS + SPACE_BETWEEN_LAYERS * 1,
        numberOfPlanets: BRANCHES,
        planetRadiusRandomness: {
            min: 0,
            max: 0,
        },
        playerCanSpawn: false,
        range: SPACE_BETWEEN_LAYERS + LAYER_PLANET_RADIUS - 30,
    });
    var layer3 = createCircularFormationPlanets({
        basePlanetRadius: LAYER_PLANET_RADIUS,
        formationOffset: { x: centerPoint.x, y: centerPoint.y },
        formationRadius: WAR_ZONE_RADIUS + SPACE_BETWEEN_LAYERS * 2,
        numberOfPlanets: BRANCHES,
        planetRadiusRandomness: {
            min: 0,
            max: 0,
        },
        playerCanSpawn: SPAWN_FROM_WAR_ZONE_PLANETS,
        range: SPACE_BETWEEN_LAYERS + LAYER_PLANET_RADIUS - 30,
    });
    var layer4 = createCircularFormationPlanets({
        basePlanetRadius: LAYER_PLANET_RADIUS,
        formationOffset: { x: centerPoint.x, y: centerPoint.y },
        formationRadius: WAR_ZONE_RADIUS + SPACE_BETWEEN_LAYERS * 3,
        numberOfPlanets: BRANCHES,
        planetRadiusRandomness: {
            min: 0,
            max: 0,
        },
        playerCanSpawn: SPAWN_FROM_SAFE_ZONE_PLANETS,
        range: SPACE_BETWEEN_LAYERS + LAYER_PLANET_RADIUS,
    });
    var satellites = [];
    layer4.map(function (planet) {
        var clusterPlanets = createCircularFormationPlanets({
            basePlanetRadius: 75,
            formationOffset: { x: planet.x, y: planet.y },
            formationRadius: SPACE_BETWEEN_LAYERS,
            numberOfPlanets: 6,
            planetRadiusRandomness: {
                min: 0,
                max: 0,
            },
            playerCanSpawn: false,
            range: 400,
        });
        satellites = satellites.concat(clusterPlanets);
    });
    var planets = (CREATE_SAFE_PLANETS ? layer1 : []).concat((CREATE_SAFE_PLANETS ? layer2 : []), (CREATE_SAFE_PLANETS ? layer3 : []), (INCLUDE_SATELLITES ? satellites : []), (INCLUDE_4_LAYER ? layer4 : []), warZonePlanetsResources, warZonePlanetsGeneric);
    planets = cleanUpPlanets(planets);
    return planets;
};
//# sourceMappingURL=createSeparateClusterPlanetsMap.js.map