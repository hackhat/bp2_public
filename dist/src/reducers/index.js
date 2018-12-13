import * as fromPlanets from './planetsReducer';
import * as fromShips from './shipsReducer';
import * as fromPlayers from './playersReducer';
import * as fromUsers from './usersReducer';
import * as fromSystem from './systemReducer';
import * as fromToasts from './toastsReducer';
import * as fromChat from './chatReducer';
import * as fromGameSettings from './gameSettingsReducer';
import * as fromAccounts from './accountsReducer';
import * as fromAccountsToUsers from './accountsToUsersReducer';
import * as fromGlobalUI from './globalUIReducer';
import * as fromTutorial from './tutorialReducer';
import * as fromRoomDeposits from './roomDepositsReducer';
import * as fromUpgrades from './upgradesReducer';
import { canCreateShipStream } from './advancedSelectors/canCreateShipStream';
import { getCurrentSelectedPlanet } from './advancedSelectors/getCurrentSelectedPlanet';
import { canCreateShip } from './advancedSelectors/canCreateShip';
import { canDeleteShipStream } from './advancedSelectors/canDeleteShipStream';
import { canStartGameWith } from './advancedSelectors/canStartGameWith';
import { canPlayerCreatePlanet } from './advancedSelectors/canPlayerCreatePlanet';
import { canCreatePlanet } from './advancedSelectors/canCreatePlanet';
import { currentPlayerCanRespawn } from './advancedSelectors/currentPlayerCanRespawn';
import { getScoreBoardData } from './advancedSelectors/getScoreBoardData';
import { canUpgrade } from './advancedSelectors/canUpgrade';
import { getRandomSpawnablePlanet } from './advancedSelectors/getRandomSpawnablePlanet';
import { getUnitsToAddToPlanetPerCycleForPlayerId } from './advancedSelectors/getUnitsToAddToPlanetPerCycleForPlayerId';
import * as planetMapUI from "../components/PlanetMap/planetMapUIReducer";
import { ShipActions } from "../actions/ShipActions";
import { canSendChatMessage } from "./advancedSelectors/canSendChatMessage";
import { disownManyReducer } from "./globalReducers/disownManyReducer";
import { shipArriveReducer } from "./globalReducers/shipArriveReducer";
import { upgradeReducer } from "./globalReducers/upgradeReducer";
import { createPlanetReducer } from "./globalReducers/createPlanetReducer";
import { getAverageResourcesGainedByCurrentlyOnlinePlayers } from "./advancedSelectors/getAverageResourcesGainedByCurrentlyOnlinePlayers";
// Hack so we shouldn't need to add all initial states for all reducers.
export var initialState = {
    ui: {},
};
var ignoreActions = [
    // Use batch actions for these actions.
    ShipActions.arrive,
    ShipActions.send,
];
var rootReducer = function (state, action) {
    if (ignoreActions.includes(action.type)) {
        return state;
    }
    state = disownManyReducer(state, action);
    state = shipArriveReducer(state, action);
    state = upgradeReducer(state, action);
    state = createPlanetReducer(state, action);
    var appState = {
        players: fromPlayers.reducer(state.players, action),
        users: fromUsers.reducer(state.users, action),
        planets: fromPlanets.reducer(state.planets, action),
        ships: fromShips.reducer(state.ships, action),
        system: fromSystem.reducer(state.system, action),
        toasts: fromToasts.reducer(state.toasts, action),
        chat: fromChat.reducer(state.chat, action),
        accounts: fromAccounts.reducer(state.accounts, action),
        accountsToUsers: fromAccountsToUsers.reducer(state.accountsToUsers, action),
        roomDeposits: fromRoomDeposits.reducer(state.roomDeposits, action),
        upgrades: fromUpgrades.reducer(state.upgrades, action),
        ui: {
            planetMap: planetMapUI.reducer(state.ui.planetMap, action),
            gameSettings: fromGameSettings.reducer(state.ui.gameSettings, action),
            global: fromGlobalUI.reducer(state.ui.global, action),
            tutorial: fromTutorial.reducer(state.ui.tutorial, action),
        },
    };
    return appState;
};
export default rootReducer;
var chatSelectors = {
    getMessages: function (state) {
        return fromChat.getMessages(state.chat);
    },
    getGameState: function (state) {
        return fromChat.getGameState(state.chat);
    },
};
var roomDepositsSelectors = {
    getGameState: function (state) {
        return fromRoomDeposits.getGameState(state.roomDeposits);
    },
    getRoomDepositByAccountIdAndRoomId: function (state, accountId, roomId) {
        return fromRoomDeposits.getRoomDepositByAccountIdAndRoomId(state.roomDeposits, accountId, roomId);
    },
};
var accountsSelectors = {
    getGameState: function (state) {
        return fromAccounts.getGameState(state.accounts);
    },
    getAccountById: function (state, accountId) {
        return fromAccounts.getAccountById(state.accounts, accountId);
    },
};
var advancedSelectors = {
    currentPlayerCanRespawn: currentPlayerCanRespawn,
    getCurrentSelectedPlanet: getCurrentSelectedPlanet,
    canStartGameWith: canStartGameWith,
    canUpgrade: canUpgrade,
    canDeleteShipStream: canDeleteShipStream,
    canSendChatMessage: canSendChatMessage,
    canCreateShipStream: canCreateShipStream,
    canCreateShip: canCreateShip,
    canCreatePlanet: canCreatePlanet,
    canPlayerCreatePlanet: canPlayerCreatePlanet,
    getUnitsToAddToPlanetPerCycleForPlayerId: getUnitsToAddToPlanetPerCycleForPlayerId,
    getScoreBoardData: getScoreBoardData,
    getRandomSpawnablePlanet: getRandomSpawnablePlanet,
    getAverageResourcesGainedByCurrentlyOnlinePlayers: getAverageResourcesGainedByCurrentlyOnlinePlayers,
    getGameState: function (state) {
        return {
            planets: selectors.planets.getGameState(state),
            ships: selectors.ships.getGameState(state),
            players: selectors.players.getGameState(state),
            system: selectors.system.getGameState(state),
            chat: selectors.chat.getGameState(state),
            roomDeposits: selectors.roomDeposits.getGameState(state),
            accounts: selectors.accounts.getGameState(state),
            upgrades: selectors.upgrades.getGameState(state),
        };
    },
};
var upgradesSelectors = {
    getUpgradeDefinitions: function (state) {
        return fromUpgrades.getUpgradeDefinitions(state.upgrades);
    },
    getGameState: function (state) {
        return fromUpgrades.getGameState(state.upgrades);
    },
    getUpgradeDefinitionById: function (state, upgradeDefinitionId) {
        return fromUpgrades.getUpgradeDefinitionById(state.upgrades, upgradeDefinitionId);
    },
};
var usersSelectors = {
    getUserById: function (state, userId) {
        return fromUsers.getUserById(state.users, userId);
    },
};
var playersSelectors = {
    getPlayersById: function (state) {
        return fromPlayers.getPlayers(state.players);
    },
    getGameState: function (state) {
        return fromPlayers.getGameState(state.players);
    },
    getPlayersAsList: function (state) {
        return fromPlayers.getPlayersAsList(state.players);
    },
    getOnlinePlayers: function (state) {
        return fromPlayers.getOnlinePlayers(state.players);
    },
    getOfflinePlayers: function (state) {
        return fromPlayers.getOfflinePlayers(state.players);
    },
    getPlayerById: function (state, playerId) {
        return fromPlayers.getPlayerById(state.players, playerId);
    },
    isPlayerIdOnline: function (state, playerId) {
        return fromPlayers.isPlayerIdOnline(state.players, playerId);
    },
    getPlayerWithAccountId: function (state, accountId) {
        return fromPlayers.getPlayerWithAccountId(state.players, accountId);
    },
    isAccountLoggingIn: function (state, accountId) {
        return fromPlayers.isAccountLoggingIn(state.players, accountId);
    },
};
var planetSelectors = {
    getPlanetById: function (state, planetId) {
        return fromPlanets.getPlanetById(state.planets, planetId);
    },
    getPlanetsById: function (state) {
        return fromPlanets.getPlanets(state.planets);
    },
    getGameState: function (state) {
        return fromPlanets.getGameState(state.planets);
    },
    getEstimatedUnitsToSendByShipFromPlanet: function (state, planetId) {
        return fromPlanets.getEstimatedUnitsToSendByShipFromPlanet(state.planets, planetId);
    },
    getPlanetsOwnedByPlayerId: function (state, playerId) {
        return fromPlanets.getPlanetsOwnedByPlayerId(state.planets, playerId);
    },
    getPlanetIdsToThreatLevel: function (state, botId) {
        return fromPlanets.getPlanetIdsToThreatLevel(state.planets, botId);
    },
    getPlanetsInRangeOfPlanetId: function (state, planetId) {
        return fromPlanets.getPlanetsInRangeOfPlanetId(state.planets, planetId);
    },
    getPlanetsByProtectedGroupId: function (state, protectedGroupId) {
        return fromPlanets.getPlanetsByProtectedGroupId(state.planets, protectedGroupId);
    },
    isPlanetProtectedByPlayerId: function (state, planetId, byPlayerId) {
        return fromPlanets.isPlanetProtectedByPlayerId(state.planets, planetId, byPlayerId);
    },
    getRandomSpawnablePlanet: function (state) {
        return fromPlanets.getRandomSpawnablePlanet(state.planets);
    },
};
var shipsSelectors = {
    getShipStreams: function (state, options) {
        return fromShips.getShipStreams(state.ships, options);
    },
    getGameState: function (state) {
        return fromShips.getGameState(state.ships);
    },
    getShipsById: function (state) {
        return fromShips.getShips(state.ships);
    },
    getShipById: function (state, shipId) {
        return fromShips.getShipById(state.ships, shipId);
    },
};
var systemSelectors = {
    getRoomId: function (state) {
        return fromSystem.getRoomId(state.system);
    },
    getActions: function (state) {
        return fromSystem.getActions(state.system);
    },
    getGameEndDate: function (state) {
        return fromSystem.getGameEndDate(state.system);
    },
    getGameStatus: function (state) {
        return fromSystem.getGameStatus(state.system);
    },
    getGameState: function (state) {
        return fromSystem.getGameState(state.system);
    },
    getPublicSetting: function (state, settingId) {
        return fromSystem.getPublicSetting(state.system, settingId);
    },
    getPublicSettings: function (state) {
        return fromSystem.getPublicSettings(state.system);
    },
    getPlayerIdFromClientId: function (state, clientId) {
        return fromSystem.getPlayerIdFromClientId(state.system, clientId);
    },
    getClientIdFromPlayerId: function (state, playerId) {
        return fromSystem.getClientIdFromPlayerId(state.system, playerId);
    },
};
var toastsSelectors = {
    getLastToast: function (state) {
        return fromToasts.getLastToast(state.toasts);
    },
    getLastError: function (state) {
        return fromToasts.getLastError(state.toasts);
    },
};
var uiSelectors = {
    global: {
        getAddMoreMoneyPanelState: function (state) {
            return fromGlobalUI.getAddMoreMoneyPanelState(state.ui.global);
        },
        getUpgradesPanelState: function (state) {
            return fromGlobalUI.getUpgradesPanelState(state.ui.global);
        },
        getCurrentAccountId: function (state) {
            return fromGlobalUI.getCurrentAccountId(state.ui.global);
        },
        getCurrentPlayer: function (state) {
            var currentPlayerId = selectors.ui.global.getCurrentPlayerId(state);
            if (!currentPlayerId) {
                return undefined;
            }
            return selectors.players.getPlayerById(state, currentPlayerId);
        },
        getCurrentPlayerId: function (state) {
            return fromGlobalUI.getCurrentPlayerId(state.ui.global);
        },
        getClientDateOffsetInMs: function (state) {
            return fromGlobalUI.getClientDateOffsetInMs(state.ui.global);
        },
        getPlayerRoomLoginLoadingStatus: function (state) {
            return fromGlobalUI.getPlayerRoomLoginLoadingStatus(state.ui.global);
        },
        getConnectionStatus: function (state) {
            return fromGlobalUI.getConnectionStatus(state.ui.global);
        },
        getCurrentAccountDeposit: function (state) {
            var currentAccountId = selectors.ui.global.getCurrentAccountId(state);
            if (currentAccountId === undefined)
                return undefined;
            var roomId = selectors.system.getRoomId(state);
            if (roomId === undefined)
                return undefined;
            var roomDeposit = selectors.roomDeposits.getRoomDepositByAccountIdAndRoomId(state, currentAccountId, roomId);
            if (roomDeposit) {
                return roomDeposit.depositAmountInCents;
            }
            return undefined;
        },
        getAverageFps: function (state) {
            return fromGlobalUI.getAverageFps(state.ui.global);
        },
        getRequestEmailDialogIsOpen: function (state) {
            return fromGlobalUI.getRequestEmailDialogIsOpen(state.ui.global);
        },
        getPlayerRequestStartGameLoadingStatus: function (state) {
            return fromGlobalUI.getPlayerRequestStartGameLoadingStatus(state.ui.global);
        },
        getCurrentClientId: function (state) {
            return fromGlobalUI.getCurrentClientId(state.ui.global);
        },
        getCurrentUserId: function (state) {
            return fromGlobalUI.getCurrentUserId(state.ui.global);
        },
        getCurrentUserStatus: function (state) {
            return fromGlobalUI.getCurrentUserStatus(state.ui.global);
        },
        getCurrentUser: function (state) {
            var currentUserId = selectors.ui.global.getCurrentUserId(state);
            return selectors.users.getUserById(state, currentUserId);
        },
        getCurrentAccount: function (state) {
            var currentAccountId = selectors.ui.global.getCurrentAccountId(state);
            if (currentAccountId === undefined)
                return undefined;
            return selectors.accounts.getAccountById(state, currentAccountId);
        },
    },
    planetMap: {
        getUI: function (state) {
            return planetMapUI.getUI(state.ui.planetMap);
        },
        getPlanetsMapUILoadingStatus: function (state) {
            return planetMapUI.getPlanetsMapUILoadingStatus(state.ui.planetMap);
        },
    },
    gameSettings: {
        getGameSettings: function (state) {
            return fromGameSettings.getGameSettings(state.ui.gameSettings);
        }
    },
    tutorial: {
        getCurrentTutorialName: function (state) {
            return fromTutorial.getCurrentTutorialName(state.ui.tutorial);
        },
        getTutorialList: function (state) {
            return fromTutorial.getTutorialList(state.ui.tutorial);
        },
    }
};
export var selectors = {
    chat: chatSelectors,
    roomDeposits: roomDepositsSelectors,
    accounts: accountsSelectors,
    advanced: advancedSelectors,
    users: usersSelectors,
    players: playersSelectors,
    planets: planetSelectors,
    ships: shipsSelectors,
    system: systemSelectors,
    toasts: toastsSelectors,
    upgrades: upgradesSelectors,
    ui: uiSelectors,
};
//# sourceMappingURL=index.js.map