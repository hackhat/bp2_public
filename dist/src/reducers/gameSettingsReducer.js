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
import { SystemActions } from "../actions/SystemActions";
var USE_NATIVE_RESOLUTION = false;
var GAME_SIZE = 5000;
var maxResolution = (typeof window !== 'undefined' && USE_NATIVE_RESOLUTION) ? window.devicePixelRatio : 1;
var initialState = {
    showComets: false,
    resolution: maxResolution,
    mapBoundingBox: {
        top: -GAME_SIZE / 2,
        right: GAME_SIZE / 2,
        bottom: GAME_SIZE / 2,
        left: -GAME_SIZE / 2,
    },
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === SystemActions.setAverageFps) {
        if (action.payload.averageFps < 55) {
            state = lowerGameSettings(state);
        }
    }
    return state;
};
var lowerGameSettings = function (gameSettings) {
    if (gameSettings.showComets) {
        gameSettings = __assign({}, gameSettings, { showComets: false });
    }
    return gameSettings;
};
export var getGameSettings = function (state) {
    return state;
};
//# sourceMappingURL=gameSettingsReducer.js.map