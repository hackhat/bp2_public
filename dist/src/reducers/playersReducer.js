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
import * as _ from "lodash";
import { PlayerActions } from "../actions/PlayerActions";
import { SystemActions } from "../actions/SystemActions";
import { PlanetActions } from "../actions/PlanetActions";
import { PLANET_RESOURCES_COST } from "./advancedSelectors/canPlayerCreatePlanet";
import { ShipActions } from "../actions/ShipActions";
import { SHIP_STREAM_RESOURCE_COST } from "../epics/server/requestShipStreamEpic";
import { isNotUndefined } from "../utils/isNotUndefined";
import { PLANET_MONEY_VALUE } from "../constants/constants";
export var RESOURCES_PER_PLANET_KILL = 1;
export var INITIAL_RESOURCES = 15;
var initialState = {
    playersById: {},
    inProgressLoginsByAccountId: {},
};
var isOnline = function (player) { return player.online; };
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var _a, _b, _c, _d, _e;
    if (action.type === SystemActions.cleanUpGameData) {
        // Remove offline players and resets values for the player
        var newPlayersById_1 = {};
        Object.values(state.playersById)
            .filter(isNotUndefined)
            .filter(isOnline)
            .map(function (player) {
            player = __assign({}, player, { availableMoneyAmountInCents: 0, depositAmountInCents: 0, resources: INITIAL_RESOURCES, resourcesUsed: 0, kills: 0 });
            newPlayersById_1[player.id] = player;
        });
        state = __assign({}, state, { playersById: newPlayersById_1 });
    }
    else if (action.type === SystemActions.disconnect) {
        state = __assign({}, state, { playersById: {} });
    }
    else if (action.type === PlayerActions.removeAllPlayers) {
        state = __assign({}, state, { playersById: {} });
    }
    else if (action.type === SystemActions.setGameState) {
        state = setGameState(state, action.payload.gameState.players);
    }
    else if (action.type === PlayerActions.addMany) {
        action.payload.players.forEach(function (player) {
            var _a;
            state = __assign({}, state, { playersById: __assign({}, state.playersById, (_a = {}, _a[player.id] = player, _a)) });
        });
    }
    else if (action.type === PlayerActions.exitRoom) {
        var playerId = action.payload.playerId;
        var player = state.playersById[playerId];
        if (player) {
            state = __assign({}, state, { playersById: __assign({}, state.playersById, (_a = {}, _a[playerId] = __assign({}, player, { online: false, lastOfflineDate: action.date }), _a)) });
        }
    }
    else if (action.type === PlayerActions.onRoomLogin) {
        var partialPlayer = action.payload.partialPlayer;
        state = removeInProgressAccountLogin(state, partialPlayer.accountId);
        var playerId = partialPlayer.playerId;
        var player = __assign({ availableMoneyAmountInCents: 0, depositAmountInCents: 0, kills: 0, resources: 0, resourcesUsed: 0 }, state.playersById[playerId], { id: playerId, name: partialPlayer.name, hasEmail: partialPlayer.hasEmail, countryCode: partialPlayer.countryCode, accountId: partialPlayer.accountId, userId: partialPlayer.userId, online: true });
        state = __assign({}, state, { playersById: __assign({}, state.playersById, (_b = {}, _b[playerId] = player, _b)) });
    }
    else if (action.type === SystemActions.startGameWith) {
        var playerId = action.payload.playerId;
        var player = state.playersById[playerId];
        if (!player) {
            console.error("ERROR: Player id \"" + playerId + "\" doesn't exist. Action id: \"" + action.id + "\"");
        }
        else {
            state = __assign({}, state, { playersById: __assign({}, state.playersById, (_c = {}, _c[playerId] = __assign({}, player, { resources: player.resources + player.resourcesUsed === 0 ? action.payload.initialResources : player.resources, color: action.payload.color, 
                    // Sometimes you might have an existing deposit in the game
                    availableMoneyAmountInCents: player.availableMoneyAmountInCents + action.payload.totalMoneyAmountInCents - PLANET_MONEY_VALUE, 
                    // When you start a new game you own a planet, therefore we subtract some money here.
                    depositAmountInCents: player.depositAmountInCents + PLANET_MONEY_VALUE }), _c)) });
        }
    }
    else if (action.type === PlayerActions.setName) {
        var playerId = action.payload.playerId;
        var player = state.playersById[playerId];
        if (!player) {
            console.error("ERROR: Player id \"" + playerId + "\" doesn't exist. Action id: \"" + action.id + "\"");
        }
        else {
            state = __assign({}, state, { playersById: __assign({}, state.playersById, (_d = {}, _d[playerId] = __assign({}, player, { name: action.payload.name }), _d)) });
        }
    }
    else if (action.type === PlayerActions.addResources) {
        state = addResourcesToPlayerId(state, action.payload.playerId, action.payload.quantity);
    }
    else if (action.type === PlanetActions.createOne) {
        state = addResourcesToPlayerId(state, action.payload.playerId, -PLANET_RESOURCES_COST);
    }
    else if (action.type === PlayerActions.addResourcesToMany) {
        var playerToResourcesMap_1 = action.payload.playerToResourceMap;
        Object.keys(playerToResourcesMap_1).forEach(function (playerId) {
            var resources = playerToResourcesMap_1[playerId];
            state = addResourcesToPlayerId(state, playerId, resources);
        });
    }
    else if (action.type === PlayerActions.planetKilled) {
        state = addResourcesToPlayerId(state, action.payload.playerId, RESOURCES_PER_PLANET_KILL);
        state = addKillsToPlayerId(state, action.payload.playerId, 1);
    }
    else if (action.type === ShipActions.createStream) {
        state = addResourcesToPlayerId(state, action.payload.createdByPlayerId, -SHIP_STREAM_RESOURCE_COST);
    }
    else if (action.type === PlayerActions.requestRoomLoginError) {
        state = removeInProgressAccountLogin(state, action.payload.accountId);
    }
    else if (action.type === PlayerActions.depositsReleased) {
        state = updatePlayer(state, action.payload.playerId, {
            depositAmountInCents: 0,
        });
    }
    else if (action.type === PlayerActions.loggingInPlayer) {
        state = __assign({}, state, { inProgressLoginsByAccountId: __assign({}, state.inProgressLoginsByAccountId, (_e = {}, _e[action.payload.accountId] = true, _e)) });
    }
    return state;
};
var removeInProgressAccountLogin = function (state, accountId) {
    var copyOfInProgressLoginsByAccountId = __assign({}, state.inProgressLoginsByAccountId);
    delete copyOfInProgressLoginsByAccountId[accountId];
    state = __assign({}, state, { inProgressLoginsByAccountId: copyOfInProgressLoginsByAccountId });
    return state;
};
export var addResourcesToPlayerId = function (state, playerId, resources) {
    var _a;
    if (playerId === undefined) {
        return state;
    }
    var player = state.playersById[playerId];
    if (!player) {
        console.error("ERROR: Player with id \"" + playerId + "\" not found.");
        return state;
    }
    else {
        return __assign({}, state, { playersById: __assign({}, state.playersById, (_a = {}, _a[playerId] = __assign({}, player, { resources: player.resources + resources, resourcesUsed: player.resourcesUsed + (resources < 0 ? -resources : 0) }), _a)) });
    }
};
var addKillsToPlayerId = function (state, playerId, kills) {
    if (playerId === undefined) {
        return state;
    }
    var player = state.playersById[playerId];
    if (!player) {
        console.error("ERROR: Player with id \"" + playerId + "\" not found.");
        return state;
    }
    else {
        return updatePlayer(state, playerId, { kills: player.kills + kills });
    }
};
export var updatePlayer = function (state, playerId, player) {
    var _a;
    return __assign({}, state, { playersById: __assign({}, state.playersById, (_a = {}, _a[playerId] = __assign({}, state.playersById[playerId], player, { id: playerId }), _a)) });
};
export var increasePlayerFinances = function (state, playerId, depositAmountToIncrease, availableMoneyAmountToIncrease) {
    var playerToChange = getPlayerById(state, playerId);
    if (!playerToChange) {
        console.error("No playerToChange found");
        return state;
    }
    return updatePlayer(state, playerId, {
        depositAmountInCents: playerToChange.depositAmountInCents + depositAmountToIncrease,
        availableMoneyAmountInCents: playerToChange.availableMoneyAmountInCents + availableMoneyAmountToIncrease,
    });
};
export var getPlayerResources = function (state, playerId) {
    var player = getPlayerById(state, playerId);
    if (!player) {
        console.error("No player found");
        return null;
    }
    return player.resources;
};
export var getPlayers = function (state) {
    return state.playersById;
};
export var getPlayersAsList = function (state) {
    return Object.values(state.playersById).filter(function (player) { return player !== undefined; });
};
export var getOnlinePlayers = function (state) {
    return getPlayersAsList(state).filter(function (player) { return player.online; });
};
export var getOfflinePlayers = function (state) {
    return getPlayersAsList(state).filter(function (player) { return !player.online; });
};
export var isPlayerIdOnline = function (state, playerId) {
    var player = getPlayerById(state, playerId);
    if (!player) {
        return false;
    }
    return player.online;
};
export var isAccountLoggingIn = function (state, accountId) {
    return !!state.inProgressLoginsByAccountId[accountId];
};
export var getGameState = function (state) {
    return {
        playersById: state.playersById,
    };
};
export var setGameState = function (state, gameState) {
    return __assign({}, state, { playersById: gameState.playersById });
};
export var getPlayerById = function (state, playerId) {
    return state.playersById[playerId];
};
export var getPlayerWithAccountId = function (state, accountId) {
    return _.find(state.playersById, { accountId: accountId });
};
//# sourceMappingURL=playersReducer.js.map