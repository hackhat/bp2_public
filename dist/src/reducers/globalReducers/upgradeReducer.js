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
import { UpgradeActions } from "../../actions/UpgradeActions";
import * as fromPlanets from "../planetsReducer";
import * as fromPlayers from "../playersReducer";
import * as fromUpgrades from "../upgradesReducer";
import { selectors } from "../index";
export var upgradeReducer = function (state, action) {
    var _a;
    if (action.type === UpgradeActions.upgrade) {
        var planet = fromPlanets.getPlanetById(state.planets, action.payload.planetId);
        if (planet) {
            var upgradeDefinition = fromUpgrades.getUpgradeDefinitionById(state.upgrades, action.payload.upgradeDefinitionId);
            var res = selectors.advanced.canUpgrade(state, {
                authenticatedPlayerId: action.payload.playerId,
                planetId: action.payload.planetId,
                upgradeDefinitionId: action.payload.upgradeDefinitionId,
            });
            if (res.ok) {
                state = __assign({}, state, { planets: fromPlanets.updatePlanet(state.planets, action.payload.planetId, (_a = {
                            appliedUpgradeDefinitionIds: planet.appliedUpgradeDefinitionIds.concat([
                                action.payload.upgradeDefinitionId,
                            ])
                        },
                        _a[upgradeDefinition.property] = planet[upgradeDefinition.property] + upgradeDefinition.addend,
                        _a)), players: fromPlayers.addResourcesToPlayerId(state.players, action.payload.playerId, -upgradeDefinition.resourcesCost) });
            }
        }
    }
    return state;
};
//# sourceMappingURL=upgradeReducer.js.map