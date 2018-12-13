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
import { UserActions } from "../actions/UserActions";
import { PlayerActions } from "../actions/PlayerActions";
import { SystemActions } from "../actions/SystemActions";
import { ConnectionStatus, LoadingStatus } from "../interfaces";
import { getFirstAccountIdWithTypeFromList } from "../utils/getFirstAccountIdWithTypeFromList";
import { GlobalUIActions } from "../actions/GlobalUIActions";
var initialState = {
    clientDateOffsetInMs: 0,
    playerRoomLoginLoadingStatus: LoadingStatus.none,
    connectionStatus: ConnectionStatus.disconnected,
    averageFps: 60,
    requestEmailDialogIsOpen: false,
    playerRequestStartGameLoadingStatus: LoadingStatus.none,
    currentUserLoadingStatus: LoadingStatus.loading,
    upgradesPanelState: {
        isVisible: false,
        planetId: null,
    },
    addMoreMoneyPanelState: {
        isVisible: false,
    },
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === GlobalUIActions.addCurrentUserAndAccounts) {
        var fakeMoneyAccountId = getFirstAccountIdWithTypeFromList(action.payload.accounts, 'fakeMoney');
        state = __assign({}, state, { currentUserId: action.payload.user.id, currentAccountId: fakeMoneyAccountId, currentUserLoadingStatus: LoadingStatus.loaded });
    }
    else if (action.type === SystemActions.requestStartGameWith) {
        state = __assign({}, state, { playerRequestStartGameLoadingStatus: LoadingStatus.loading });
    }
    else if (action.type === SystemActions.currentPlayerStartGameWith) {
        state = __assign({}, state, { playerRequestStartGameLoadingStatus: LoadingStatus.loaded });
    }
    else if (action.type === PlayerActions.currentPlayerExitRoom) {
        state = __assign({}, state, { currentPlayerId: undefined });
    }
    else if (action.type === PlayerActions.onCurrentPlayerRoomLogin) {
        state = __assign({}, state, { currentPlayerId: action.payload.partialPlayer.playerId, playerRoomLoginLoadingStatus: LoadingStatus.loaded });
    }
    else if (action.type === PlayerActions.setCurrentPlayerId) {
        state = __assign({}, state, { currentPlayerId: action.payload.playerId });
    }
    else if (action.type === SystemActions.cleanUpGameData) {
        state = __assign({}, state, { clientDateOffsetInMs: 0 });
    }
    else if (action.type === SystemActions.disconnect) {
        state = __assign({}, state, { clientDateOffsetInMs: 0, playerRoomLoginLoadingStatus: LoadingStatus.none, connectionStatus: ConnectionStatus.disconnected, averageFps: 60, playerRequestStartGameLoadingStatus: LoadingStatus.none });
    }
    else if (action.type === SystemActions.setServerDateOffset) {
        state = __assign({}, state, { clientDateOffsetInMs: action.payload.offsetInMs });
    }
    else if (action.type === PlayerActions.requestRoomLogin) {
        state = __assign({}, state, { playerRoomLoginLoadingStatus: LoadingStatus.loading });
    }
    else if (action.type === PlayerActions.requestRoomLoginError) {
        state = __assign({}, state, { playerRoomLoginLoadingStatus: LoadingStatus.none });
    }
    else if (action.type === SystemActions.clientSideSocketChange && action.payload.newState === 'reconnect_attempt') {
        state = __assign({}, state);
    }
    else if (action.type === SystemActions.clientSideSocketChange && action.payload.newState === 'reconnect') {
        state = __assign({}, state, { connectionStatus: ConnectionStatus.connected });
    }
    else if (action.type === SystemActions.clientSideSocketChange && action.payload.newState === 'reconnect_attempt') {
        state = __assign({}, state, { connectionStatus: ConnectionStatus.reconnecting });
    }
    else if (action.type === SystemActions.setGameState) {
        state = __assign({}, state, { connectionStatus: ConnectionStatus.connected });
    }
    else if (action.type === SystemActions.setAverageFps) {
        state = __assign({}, state, { averageFps: action.payload.averageFps });
    }
    else if (action.type === SystemActions.setRequestEmailDialogVisibility) {
        state = __assign({}, state, { requestEmailDialogIsOpen: action.payload.isVisible });
    }
    else if (action.type === UserActions.addCurrentUser) {
        state = __assign({}, state, { currentUserId: action.payload.user.id, currentUserLoadingStatus: LoadingStatus.loaded });
    }
    else if (action.type === UserActions.setNoCurrentUser) {
        state = __assign({}, state, { currentUserLoadingStatus: LoadingStatus.none });
    }
    else if (action.type === SystemActions.appStart) {
        state = __assign({}, state, { currentClientId: action.payload.clientId });
    }
    else if (action.type === GlobalUIActions.setVisibilityForUpgradesPanel) {
        state = __assign({}, state, { upgradesPanelState: {
                isVisible: action.payload.isVisible,
                planetId: action.payload.planetId,
            } });
    }
    else if (action.type === GlobalUIActions.setVisibilityForAddMoreMoneyPanel) {
        state = __assign({}, state, { addMoreMoneyPanelState: {
                isVisible: action.payload.isVisible,
            } });
    }
    return state;
};
export var getCurrentAccountId = function (state) {
    return state.currentAccountId;
};
export var getCurrentPlayerId = function (state) {
    return state.currentPlayerId;
};
export var getClientDateOffsetInMs = function (state) {
    return state.clientDateOffsetInMs;
};
export var getPlayerRoomLoginLoadingStatus = function (state) {
    return state.playerRoomLoginLoadingStatus;
};
export var getConnectionStatus = function (state) {
    return state.connectionStatus;
};
export var getAverageFps = function (state) {
    return state.averageFps;
};
export var getRequestEmailDialogIsOpen = function (state) {
    return state.requestEmailDialogIsOpen;
};
export var getPlayerRequestStartGameLoadingStatus = function (state) {
    return state.playerRequestStartGameLoadingStatus;
};
export var getCurrentClientId = function (state) {
    return state.currentClientId;
};
export var getCurrentUserId = function (state) {
    return state.currentUserId;
};
export var getCurrentUserStatus = function (state) {
    return state.currentUserLoadingStatus;
};
export var getUpgradesPanelState = function (state) {
    return state.upgradesPanelState;
};
export var getAddMoreMoneyPanelState = function (state) {
    return state.addMoreMoneyPanelState;
};
//# sourceMappingURL=globalUIReducer.js.map