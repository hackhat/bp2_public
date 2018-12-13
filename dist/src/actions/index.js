import generateUniqueId from "../utils/generateUniqueId";
import { SystemActions } from "./SystemActions";
export var createAppAction = function (actionType, payload, roomApiSecretKey) {
    return {
        type: actionType,
        payload: payload,
        roomApiSecretKey: roomApiSecretKey,
    };
};
export var createServerAction = function (actionType, payload, roomApiSecretKey) {
    return {
        id: generateUniqueId(),
        type: actionType,
        isGameAction: true,
        // This date will be overridden on the server side.
        date: new Date(),
        payload: payload,
        roomApiSecretKey: roomApiSecretKey,
    };
};
/**
 * Used to create a `SystemActions.SendClientToServerAction` action with a game action that will be sent to the
 * server, but not used by our reducers yet. Only when the server validates and sends it back.
 *
 * Sends an action to the server, and the server will actually pass in the reducer and dispatch to other clients.
 */
export var createSendClientToServerAction = function (actionType, payload, roomApiSecretKey) {
    var serverAction = createServerAction(actionType, payload, roomApiSecretKey);
    return {
        id: generateUniqueId(),
        type: SystemActions.sendClientToServerAction,
        payload: { serverAction: serverAction },
        date: new Date(),
        isGameAction: true,
        roomApiSecretKey: roomApiSecretKey,
    };
};
/**
 * Will unpack the action and run in the server reducer.
 * Will send the unpacked action to the clients.
 */
export var createServerBroadcastAction = function (actionType, payload, roomApiSecretKey) {
    var serverAction = createServerAction(actionType, payload, roomApiSecretKey);
    return {
        type: SystemActions.serverBroadcastAction,
        payload: { serverAction: serverAction },
        roomApiSecretKey: roomApiSecretKey,
    };
};
// Just send an action to one client only
export var createServerToSingleClientAction = function (clientId, actionType, payload) {
    var serverAction = createServerAction(actionType, payload);
    return {
        type: SystemActions.serverToSingleClientAction,
        payload: { serverAction: serverAction },
        clientId: clientId,
    };
};
//# sourceMappingURL=index.js.map