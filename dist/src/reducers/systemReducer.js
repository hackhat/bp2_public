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
import { GameStatus } from "../interfaces";
import { PlayerActions } from "../actions/PlayerActions";
var initialState = {
    gameStatus: GameStatus.loading,
    gameEndDate: undefined,
    // Server side only
    clientIdToPlayerIdMap: {},
    actions: [],
    publicSettings: {
        autoSpawnAfterRoomLogin: true,
        enableAddPlanetUnits: true,
        cleanUpProtectedPlanetsAfterMsOfPlayerOffline: 60 * 1000,
        createNewEmptyPlanets: true,
        maxOutboundStreamsFromPlanet: 5,
    },
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var _a, _b;
    if (action.type === SystemActions.setGameState) {
        state = setGameState(state, action.payload.gameState.system);
    }
    else if (action.type === SystemActions.gameEnd) {
        state = __assign({}, state, { gameEndDate: undefined, gameStatus: GameStatus.ended });
    }
    else if (action.type === SystemActions.newGame) {
        state = __assign({}, state, { gameEndDate: action.payload.gameEndDate, gameStatus: GameStatus.playing });
    }
    else if (action.type === SystemActions.cleanUpGameData) {
        state = __assign({}, state, { gameStatus: GameStatus.playing, gameEndDate: undefined });
    }
    else if (action.type === PlayerActions.onRoomLogin) {
        state = __assign({}, state, { clientIdToPlayerIdMap: __assign({}, state.clientIdToPlayerIdMap, (_a = {}, _a[action.payload.partialPlayer.clientId] = action.payload.partialPlayer.playerId, _a)) });
    }
    else if (action.type === SystemActions.setPublicSetting) {
        state = __assign({}, state, { publicSettings: __assign({}, state.publicSettings, (_b = {}, _b[action.payload.key] = action.payload.value, _b)) });
    }
    else if (action.type === SystemActions.disconnect) {
        state = __assign({}, state, { gameStatus: GameStatus.loading, gameEndDate: undefined });
    }
    else if (action.type === SystemActions.serverStart) {
        state = __assign({}, state, { roomId: action.payload.roomId });
    }
    return state;
};
export var getPublicSetting = function (state, key) {
    return state.publicSettings[key];
};
export var getPublicSettings = function (state) {
    return state.publicSettings;
};
export var getRoomId = function (state) {
    return state.roomId;
};
export var getPlayerIdFromClientId = function (state, clientId) {
    return state.clientIdToPlayerIdMap[clientId];
};
export var getClientIdFromPlayerId = function (state, playerId) {
    var clientId = undefined;
    Object.keys(state.clientIdToPlayerIdMap).forEach(function (loopClientId) {
        var loopPlayerId = state.clientIdToPlayerIdMap[loopClientId];
        if (loopPlayerId === playerId) {
            clientId = loopClientId;
        }
    });
    return clientId;
};
export var getGameEndDate = function (state) {
    return state.gameEndDate;
};
export var getActions = function (state) {
    return state.actions;
};
export var getGameStatus = function (state) {
    return state.gameStatus;
};
export var getGameState = function (state) {
    return {
        gameEndDate: state.gameEndDate,
        gameStatus: state.gameStatus,
        roomId: state.roomId,
        publicSettings: state.publicSettings,
    };
};
export var setGameState = function (state, gameState) {
    return __assign({}, state, { gameEndDate: gameState.gameEndDate, gameStatus: gameState.gameStatus, roomId: gameState.roomId, publicSettings: __assign({}, state.publicSettings, gameState.publicSettings) });
};
export default reducer;
//# sourceMappingURL=systemReducer.js.map