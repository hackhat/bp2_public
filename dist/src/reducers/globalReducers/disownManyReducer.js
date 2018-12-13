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
import * as fromPlayers from "../playersReducer";
import { PLANET_MONEY_VALUE } from "../../constants/constants";
import { selectors } from "../index";
export var disownManyReducer = function (state, action) {
    if (action.type === PlanetActions.disownMany) {
        action.payload.planetIds.forEach(function (planetId) {
            var planet = selectors.planets.getPlanetById(state, planetId);
            if (!planet || !planet.ownerId)
                return;
            state = __assign({}, state, { players: fromPlayers.increasePlayerFinances(state.players, planet.ownerId, -PLANET_MONEY_VALUE, PLANET_MONEY_VALUE) });
        });
    }
    return state;
};
//# sourceMappingURL=disownManyReducer.js.map