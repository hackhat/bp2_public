import { selectors } from "../index";
export var currentPlayerCanRespawn = function (state, input) {
    var _a = input;
    var currentPlayerId = selectors.ui.global.getCurrentPlayerId(state);
    if (currentPlayerId === undefined) {
        return { ok: false, err: 'No current player id.' };
    }
    var planetsOwnedByPlayerId = selectors.planets.getPlanetsOwnedByPlayerId(state, currentPlayerId);
    if (planetsOwnedByPlayerId.length > 0) {
        return { ok: false, err: 'Player has more than one planet in the game.' };
    }
    return { ok: true };
};
//# sourceMappingURL=currentPlayerCanRespawn.js.map