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
import { PlanetProperty, PlanetType } from "../interfaces";
var initialState = {
    upgradeDefinitions: {
        UPC001: {
            id: 'UPC001',
            title: 'Build units per cycle',
            property: PlanetProperty.unitsPerCycle,
            addend: 5,
            resourcesCost: 5,
            forPlanetTypes: [PlanetType.generic, PlanetType.resource],
        },
        R001: {
            id: 'R001',
            title: 'Range',
            property: PlanetProperty.range,
            addend: 30,
            resourcesCost: 2,
            forPlanetTypes: [PlanetType.generic, PlanetType.resource],
        },
        D001: {
            id: 'D001',
            title: 'Defense',
            property: PlanetProperty.defense,
            addend: 0.10,
            resourcesCost: 1,
            forPlanetTypes: [PlanetType.generic, PlanetType.resource],
        },
        A001: {
            id: 'A001',
            title: 'Attack',
            property: PlanetProperty.attack,
            addend: 0.10,
            resourcesCost: 1,
            forPlanetTypes: [PlanetType.generic, PlanetType.resource],
        },
        C001: {
            id: 'C001',
            title: 'Capacity (max units)',
            property: PlanetProperty.capacity,
            addend: 10,
            resourcesCost: 1,
            forPlanetTypes: [PlanetType.generic, PlanetType.resource],
        },
        RD001: {
            id: 'RD001',
            title: 'Radius',
            property: PlanetProperty.radius,
            addend: 10,
            resourcesCost: 1,
            forPlanetTypes: [PlanetType.generic, PlanetType.resource],
        },
        RPC001: {
            id: 'RPC001',
            title: 'Resources per cycle',
            property: PlanetProperty.resourcesPerCycle,
            addend: 1,
            resourcesCost: 50,
            forPlanetTypes: [PlanetType.resource],
        },
    }
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    return state;
};
export var getUpgradeDefinitions = function (state) {
    return Object.values(state.upgradeDefinitions);
};
export var getUpgradeDefinitionById = function (state, upgradeDefinitionId) {
    return state.upgradeDefinitions[upgradeDefinitionId];
};
export var getGameState = function (state) {
    return {
        upgradeDefinitions: state.upgradeDefinitions,
    };
};
export var setGameState = function (state, gameState) {
    return __assign({}, state, { upgradeDefinitions: gameState.upgradeDefinitions });
};
//# sourceMappingURL=upgradesReducer.js.map