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
import { SystemActions } from "../../actions/SystemActions";
import { filter, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createAppAction } from "../../actions";
import { PLANET_RESOURCES_COST } from "../../reducers/advancedSelectors/canPlayerCreatePlanet";
import { ShipActions } from "../../actions/ShipActions";
import { PlanetActions } from "../../actions/PlanetActions";
import { ToastActions } from "../../actions/ToastActions";
import { SHIP_STREAM_RESOURCE_COST } from "../server/requestShipStreamEpic";
import { selectors } from "../../reducers";
import { PlayerActions } from "../../actions/PlayerActions";
import { RESOURCES_PER_PLANET_KILL } from "../../reducers/playersReducer";
import generateUniqueId from "../../utils/generateUniqueId";
import { formatResources } from "../../utils/formatResources";
import { UpgradeActions } from "../../actions/UpgradeActions";
export var toastEpic = function (api, store) { return function (action$, state$) {
    var outputAction$ = action$.pipe(map(function (action) {
        var state = state$.value;
        var currentPlayerId = selectors.ui.global.getCurrentPlayerId(state);
        if (action.type === PlanetActions.requestCreateOne) {
            return { text: "Creating planet...", autoClose: false, variant: 'info' };
        }
        else if (action.type === SystemActions.newGame) {
            return { text: "A new game started", autoClose: true, variant: 'info' };
        }
        else if (action.type === SystemActions.gameEnd) {
            return { text: "Game ended", autoClose: true, variant: 'info' };
        }
        else if (action.type === PlanetActions.createOne && action.payload.playerId === currentPlayerId) {
            return {
                text: "Created one planet -" + formatResources(PLANET_RESOURCES_COST),
                autoClose: true,
                variant: 'info'
            };
        }
        else if (action.type === ShipActions.requestCreateStream) {
            return { text: "Creating ship stream...", autoClose: false, variant: 'info' };
        }
        else if (action.type === ShipActions.createStream && action.payload.createdByPlayerId === currentPlayerId) {
            return {
                text: "Created one ship stream -" + formatResources(SHIP_STREAM_RESOURCE_COST),
                autoClose: true,
                variant: 'info'
            };
        }
        else if (action.type === SystemActions.sendClientToServerAction) {
            action = action.payload.serverAction;
            if (action.type === PlayerActions.onRoomLogin) {
                return { text: "Joining room...", autoClose: false, variant: 'info' };
            }
        }
        else if (action.type === PlayerActions.onCurrentPlayerRoomLogin) {
            return { text: "Successfully logged in the room", autoClose: true, variant: 'info' };
        }
        else if (action.type === PlayerActions.onRoomLogin && action.payload.partialPlayer.playerId !== currentPlayerId) {
            var player = selectors.players.getPlayerById(state, action.payload.partialPlayer.playerId);
            if (player) {
                return { text: player.name + " joined the room", autoClose: true, variant: 'info' };
            }
        }
        else if (action.type === PlayerActions.exitRoom && action.payload.playerId !== currentPlayerId) {
            var player = selectors.players.getPlayerById(state, action.payload.playerId);
            if (player) {
                return { text: player.name + " exit the room", autoClose: true, variant: 'info' };
            }
        }
        else if (action.type === SystemActions.requestStartGameWith && action.payload.playerId === currentPlayerId) {
            return { text: "Starting game...", autoClose: false, variant: 'info' };
        }
        else if (action.type === SystemActions.startGameWith && action.payload.playerId === currentPlayerId) {
            return { text: "Game started", autoClose: true, variant: 'info' };
        }
        else if (action.type === PlayerActions.addResourcesToMany && currentPlayerId !== undefined) {
            return {
                text: "Giveaway resources +" + formatResources(action.payload.playerToResourceMap[currentPlayerId]),
                autoClose: true,
                variant: 'info'
            };
        }
        else if (action.type === PlayerActions.planetKilled && action.payload.playerId === currentPlayerId) {
            return {
                text: "Killed one planet +" + formatResources(RESOURCES_PER_PLANET_KILL),
                autoClose: true,
                variant: 'info'
            };
        }
        else if (action.type === PlanetActions.createOneError && action.payload.playerId === currentPlayerId) {
            return { text: "Error creating planet " + action.payload.error, autoClose: true, variant: 'error' };
        }
        else if (action.type === ShipActions.createStreamError && action.payload.createdByPlayerId === currentPlayerId) {
            return { text: "Error creating ship stream " + action.payload.error, autoClose: true, variant: 'error' };
        }
        else if (action.type === PlayerActions.requestRoomLogin) {
            return { text: "Logging in room...", autoClose: true, variant: 'info' };
        }
        else if (action.type === UpgradeActions.upgradeError) {
            return { text: "Error upgrading: " + action.payload.error, autoClose: true, variant: 'error' };
        }
        else if (action.type === SystemActions.startGameWithError) {
            return { text: "Error starting game: " + action.payload.error, autoClose: true, variant: 'error' };
        }
        return null;
    }), filter(function (partialToast) { return partialToast !== null; }), map(function (partialToast) {
        return __assign({}, partialToast, { id: generateUniqueId() });
    }), map(function (toast) {
        return createAppAction(ToastActions.addToast, { toast: toast });
    }));
    return merge(outputAction$);
}; };
//# sourceMappingURL=toastEpic.js.map