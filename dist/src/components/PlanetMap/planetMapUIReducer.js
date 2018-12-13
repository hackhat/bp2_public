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
import { PlanetMapUIActions } from "./PlanetMapUIActions";
import { AttackMode, LoadingStatus } from "../../interfaces";
var initialState = {
    attackMode: AttackMode.ship,
    createPlanetMode: false,
    gameAssetsLoadingStatus: LoadingStatus.none,
    isGamePaused: false,
    phaserGameLoadingStatus: LoadingStatus.none,
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === PlanetMapUIActions.onBackgroundClick) {
        state = __assign({}, state, { selectedPlanetId: undefined, attackMode: AttackMode.ship });
    }
    else if (action.type === PlanetMapUIActions.onPlanetIdSelected) {
        state = __assign({}, state, { selectedPlanetId: action.payload.planetId });
    }
    else if (action.type === PlanetMapUIActions.focusOnPlanet) {
        state = __assign({}, state, { focusOnPlanetId: action.payload.planetId });
    }
    else if (action.type === PlanetMapUIActions.removePlanetFocus) {
        state = __assign({}, state, { focusOnPlanetId: undefined });
    }
    else if (action.type === PlanetMapUIActions.setAttackMode) {
        state = __assign({}, state, { attackMode: action.payload.attackMode });
    }
    else if (action.type === PlanetMapUIActions.setCreatePlanetMode) {
        state = __assign({}, state, { createPlanetMode: action.payload.createPlanetMode });
    }
    else if (action.type === PlanetMapUIActions.setIsGamePaused) {
        state = __assign({}, state, { isGamePaused: action.payload.isPaused });
    }
    else if (action.type === PlanetMapUIActions.onPhaserGameCreated) {
        state = __assign({}, state, { phaserGameLoadingStatus: LoadingStatus.loaded, getGame: action.payload.getGame, getCanvasElement: action.payload.getCanvasElement });
    }
    else if (action.type === PlanetMapUIActions.onMount) {
        state = __assign({}, state, { createGame: action.payload.createGame, destroyGame: action.payload.destroyGame });
    }
    else if (action.type === PlanetMapUIActions.requestCreatePhaserGame) {
        state = __assign({}, state, { phaserGameLoadingStatus: LoadingStatus.loading });
    }
    else if (action.type === PlanetMapUIActions.destroyPhaserGame) {
        state = __assign({}, state, { phaserGameLoadingStatus: LoadingStatus.none, createGame: undefined, getGame: undefined, getCanvasElement: undefined });
    }
    return state;
};
export var getUI = function (state) {
    return state;
};
export var getPlanetsMapUILoadingStatus = function (state) {
    return state.phaserGameLoadingStatus;
};
export default reducer;
//# sourceMappingURL=planetMapUIReducer.js.map