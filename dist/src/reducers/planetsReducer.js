var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { PlanetActions } from "../actions/PlanetActions";
import { ShipActions } from "../actions/ShipActions";
import { SystemActions } from "../actions/SystemActions";
import { sanitizeBetween } from "../utils/sanitizeBetween";
import { createPlanetDefaults, MINIMUM_UNITS_PER_SHIP, PLANET_WITHOUT_OWNER_COLOR } from "../constants/constants";
import { planetsUtils } from "../utils/planetsUtils";
import { selectRandomFromArray } from "../utils/selectRandomFromArray";
import { createPlanet } from "../utils/createPlanet";
import { planetHasEnoughSpaceAround } from "../utils/planetHasEnoughSpaceAround";
var initialState = {
    planetsById: {},
    planetIdsToThreatLevelByBotId: {},
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var _a, _b, _c, _d;
    if (action.type === SystemActions.setGameState) {
        state = setGameState(state, action.payload.gameState.planets);
    }
    else if (action.type === SystemActions.cleanUpGameData) {
        state = __assign({}, state, { planetsById: {}, planetIdsToThreatLevelByBotId: {} });
    }
    else if (action.type === PlanetActions.requestCreateOne) {
        var _e = action.payload, x = _e.x, y = _e.y, id = _e.id;
        state = __assign({}, state, { planetsById: __assign({}, state.planetsById, (_a = {}, _a[id] = createPlanet(__assign({}, createPlanetDefaults, { id: id,
                x: x,
                y: y, temporary: true })), _a)) });
    }
    else if (action.type === PlanetActions.addPlanetsUpdatesById) {
        var newPlanetsById_1 = {};
        var planetsUpdatesById_1 = action.payload.planetsUpdatesById;
        Object.keys(planetsUpdatesById_1).forEach(function (planetId) {
            var planet = state.planetsById[planetId];
            var planetUpdate = planetsUpdatesById_1[planetId];
            if (!planet || !planetUpdate) {
                console.error("Planet not found");
                return;
            }
            newPlanetsById_1[planetId] = __assign({}, planet, planetUpdate);
        });
        state = __assign({}, state, { planetsById: __assign({}, state.planetsById, newPlanetsById_1) });
    }
    else if (action.type === SystemActions.disconnect) {
        state = __assign({}, state, { planetsById: {}, planetIdsToThreatLevelByBotId: {} });
    }
    else if (action.type === SystemActions.batchPerformance && action.payload.type === ShipActions.send) {
        var actions = action.payload.actions;
        var copyOfPlanetsById_1 = __assign({}, state.planetsById);
        actions.forEach(function (subAction) {
            var ship = subAction.payload.ship;
            var fromPlanet = copyOfPlanetsById_1[ship.fromPlanetId];
            if (!fromPlanet) {
                return;
            }
            copyOfPlanetsById_1[ship.fromPlanetId] = __assign({}, fromPlanet, { units: sanitizeBetween(fromPlanet.units - ship.units, 0, fromPlanet.capacity) });
        });
        state = __assign({}, state, { planetsById: copyOfPlanetsById_1 });
    }
    else if (action.type === PlanetActions.addUnits) {
        var planet = state.planetsById[action.payload.planetId];
        if (planet) {
            state = __assign({}, state, { planetsById: __assign({}, state.planetsById, (_b = {}, _b[action.payload.planetId] = __assign({}, planet, { units: sanitizeBetween(planet.units + action.payload.unitsToAdd, 0, planet.capacity) }), _b)) });
        }
    }
    else if (action.type === PlanetActions.unitCycleTick) {
        var newPlanetsById_2 = {};
        Object.values(state.planetsById).forEach(function (planet) {
            if (!planet)
                return;
            if (planet.ownerId === null)
                return;
            if (planet.units === planet.capacity)
                return;
            planet = sanitizePlanet(__assign({}, planet, { units: planet.units + planet.unitsPerCycle }));
            newPlanetsById_2[planet.id] = planet;
        });
        state = __assign({}, state, { planetsById: __assign({}, state.planetsById, newPlanetsById_2) });
    }
    else if (action.type === PlanetActions.addUnitsToMany) {
        var newPlanets_1 = {};
        var unitsToPlanetMap_1 = action.payload.unitsToPlanetMap;
        Object.keys(unitsToPlanetMap_1).forEach(function (planetId) {
            var planet = state.planetsById[planetId];
            if (!planet)
                return;
            var unitsToAdd = unitsToPlanetMap_1[planetId];
            newPlanets_1[planet.id] = __assign({}, planet, { units: sanitizeBetween(planet.units + unitsToAdd, 0, planet.capacity) });
        });
        state = __assign({}, state, { planetsById: __assign({}, state.planetsById, newPlanets_1) });
    }
    else if (action.type === SystemActions.startGameWith) {
        var planet = state.planetsById[action.payload.planetId];
        if (planet) {
            state = __assign({}, state, { planetsById: __assign({}, state.planetsById, (_c = {}, _c[action.payload.planetId] = __assign({}, planet, { ownerId: action.payload.playerId, color: action.payload.color }), _c)) });
        }
    }
    else if (action.type === PlanetActions.disownMany) {
        action.payload.planetIds.forEach(function (planetId) {
            state = updatePlanet(state, planetId, {
                ownerId: null,
                color: PLANET_WITHOUT_OWNER_COLOR,
            });
        });
    }
    else if (action.type === PlanetActions.createOneError) {
        var planetsById = __assign({}, state.planetsById);
        delete planetsById[action.payload.id];
        state = __assign({}, state, { planetsById: planetsById });
    }
    else if (action.type === PlanetActions.debugSetThreatLevelsForBot) {
        state = __assign({}, state, { planetIdsToThreatLevelByBotId: __assign({}, state.planetIdsToThreatLevelByBotId, (_d = {}, _d[action.payload.botId] = action.payload.planetIdsToThreatLevel, _d)) });
    }
    return state;
};
export var addPlanet = function (state, planet) {
    var _a;
    return __assign({}, state, { planetsById: __assign({}, state.planetsById, (_a = {}, _a[planet.id] = __assign({}, planet, { x: Math.round(planet.x), y: Math.round(planet.y), units: sanitizeBetween(planet.units, 0, planet.capacity) }), _a)) });
};
export var addManyPlanets = function (state, planets) {
    planets.forEach(function (planet) {
        state = addPlanet(state, __assign({}, planet, { temporary: false }));
    });
    return state;
};
var sanitizePlanet = function (planet) {
    return __assign({}, planet, { units: sanitizeBetween(planet.units, 0, planet.capacity), radius: sanitizeBetween(planet.radius, 25, 500) });
};
export var updatePlanet = function (state, planetId, planetUpdates) {
    var _a;
    var originalPlanet = state.planetsById[planetId];
    if (!originalPlanet) {
        console.error("Original planet not found");
        return state;
    }
    var updatedPlanet = sanitizePlanet(__assign({}, originalPlanet, planetUpdates, { 
        // To make sure the planet object has not a different id.
        id: planetId }));
    if (planetUpdates.radius) {
        if (!planetHasEnoughSpaceAround(Object.values(state.planetsById), updatedPlanet)) {
            return state;
        }
    }
    var nextState = __assign({}, state, { planetsById: __assign({}, state.planetsById, (_a = {}, _a[planetId] = updatedPlanet, _a)) });
    return nextState;
};
// @todo: deprecate
export var getPlanets = function (state) {
    return state.planetsById;
};
export var getPlanetsById = function (state) {
    return state.planetsById;
};
export var getPlanetById = function (state, planetId) {
    return state.planetsById[planetId];
};
export var getEstimatedUnitsToSendByShipFromPlanet = function (state, planetId) {
    var planet = state.planetsById[planetId];
    if (!planet) {
        return 0;
    }
    var halfUnits = planet.units / 2;
    if (halfUnits < MINIMUM_UNITS_PER_SHIP) {
        return planet.units;
    }
    return Math.floor(halfUnits);
};
export var getPlanetsOwnedByPlayerId = function (state, playerId) {
    return Object.values(state.planetsById)
        .filter(function (planet) { return !!planet; })
        .filter(function (planet) {
        return planet.ownerId === playerId;
    });
};
export var getPlanetIdsToThreatLevel = function (state, botId) {
    return state.planetIdsToThreatLevelByBotId[botId];
};
export var getPlanetsInRangeOfPlanetId = function (state, planetId) {
    var planetsById = getPlanetsById(state);
    var planet = planetsById[planetId];
    if (!planet) {
        return [];
    }
    var planets = Object.values(planetsById).filter(function (planet) { return planet !== undefined; });
    var planetsInRange = planetsUtils.getPlanetsInRange(planet, planets);
    return planetsInRange;
};
export var getPlanetsByProtectedGroupId = function (state, protectedGroupId) {
    var planetsById = getPlanetsById(state);
    var planets = Object.values(planetsById).filter(function (planet) {
        return planet && planet.protectedGroupId === protectedGroupId;
    });
    return planets;
};
export var getRandomSpawnablePlanet = function (state) {
    var planetsById = getPlanetsById(state);
    var planets = Object.values(planetsById)
        .filter(planetsUtils.onlyFreePlanet)
        .filter(planetsUtils.isSpawnable);
    return selectRandomFromArray(planets);
};
export var isPlanetProtectedByPlayerId = function (state, targetPlanetId, byPlayerId) {
    var targetPlanet = getPlanetById(state, targetPlanetId);
    if (!targetPlanet) {
        return undefined;
    }
    if (targetPlanet.protectedGroupId === undefined) {
        return false;
    }
    else {
        var protectedPlanets = getPlanetsByProtectedGroupId(state, targetPlanet.protectedGroupId);
        var protectedPlanet_1 = true;
        protectedPlanets.forEach(function (planet) {
            if (planet.ownerId === byPlayerId) {
                protectedPlanet_1 = false;
            }
        });
        return protectedPlanet_1;
    }
};
export var getGameState = function (state) {
    return {
        planetsById: state.planetsById,
    };
};
export var setGameState = function (state, gameState) {
    return __assign({}, state, { planetsById: gameState.planetsById, planetIdsToThreatLevelByBotId: {} });
};
//# sourceMappingURL=planetsReducer.js.map