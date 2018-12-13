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
import { PlanetActions } from "../../actions/PlanetActions";
import * as fromPlanets from "../planetsReducer";
import { selectors } from "../index";
import { SystemActions } from "../../actions/SystemActions";
export var createPlanetReducer = function (state, action) {
    if (action.type === PlanetActions.createOne) {
        state = addManyPlanetsWithValidation(state, [action.payload.planet]);
    }
    else if (action.type === SystemActions.newGame) {
        state = addManyPlanetsWithValidation(state, action.payload.planets);
    }
    else if (action.type === PlanetActions.addMany) {
        state = addManyPlanetsWithValidation(state, action.payload.planets);
    }
    return state;
};
var addManyPlanetsWithValidation = function (state, planets) {
    planets.forEach(function (planet) {
        if (selectors.advanced.canCreatePlanet(state, { planet: planet }).ok) {
            state = __assign({}, state, { planets: fromPlanets.addPlanet(state.planets, planet) });
        }
    });
    return state;
};
//# sourceMappingURL=createPlanetReducer.js.map