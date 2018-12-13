import { selectors } from "../reducers";
import { PlanetActions } from "../actions/PlanetActions";
import { SystemActions } from "../actions/SystemActions";
import { ShipActions } from "../actions/ShipActions";
import { PlayerActions } from "../actions/PlayerActions";
import { ChatActions } from "../actions/ChatActions";
import { roomApiSecretKey } from "../server/serverSecrets";
import { UpgradeActions } from "../actions/UpgradeActions";
var loggedInActions = [
    PlanetActions.requestCreateOne,
    SystemActions.requestStartGameWith,
    ShipActions.requestSendShip,
    ShipActions.requestCreateStream,
    ShipActions.requestDeleteStream,
    PlayerActions.requestRoomLogin,
    ChatActions.requestSendMessage,
    PlayerActions.exitRoom,
    UpgradeActions.requestUpgrade,
];
var loggedOutActions = [
    PlayerActions.requestRoomLogin,
];
export var authorizeClientToServerAction = function (_a) {
    var action = _a.action, authenticatedPlayerId = _a.authenticatedPlayerId, state = _a.state;
    if (action.roomApiSecretKey === roomApiSecretKey) {
        return { ok: true };
    }
    var player = authenticatedPlayerId === undefined ? undefined : selectors.players.getPlayerById(state, authenticatedPlayerId);
    var loggedIn = player !== undefined;
    var actionAuthorized = false;
    var error;
    if (loggedIn) {
        actionAuthorized = loggedInActions.indexOf(action.type) !== -1;
        if (!actionAuthorized) {
            error = "You can't access the action \"" + action.type + "\" while logged in.";
        }
    }
    else {
        actionAuthorized = loggedOutActions.indexOf(action.type) !== -1;
        if (!actionAuthorized) {
            error = "You can't access the action \"" + action.type + "\" while logged out.";
        }
    }
    if (!actionAuthorized) {
        return {
            ok: false,
            error: error,
        };
    }
    return {
        ok: true
    };
};
//# sourceMappingURL=authorizeClientToServerAction.js.map