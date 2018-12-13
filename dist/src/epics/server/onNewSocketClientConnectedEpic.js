var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import { filter, map, tap, mergeMap, takeUntil, bufferTime, delay } from 'rxjs/operators';
import { Observable, merge, interval, of, concat } from 'rxjs';
import { createAppAction, createServerAction, createServerBroadcastAction, createServerToSingleClientAction } from "../../actions";
import { selectors } from "../../reducers";
import { SystemActions } from "../../actions/SystemActions";
import { PlayerActions } from "../../actions/PlayerActions";
import * as ejson from "ejson";
import { isProduction } from "../../utils/isProduction";
import { ms } from "../../utils/ms";
var LAG_MS = isProduction ? 0 : 250;
export var onNewSocketClientConnectedEpic = function (store) { return function (action$, state$) {
    var handleDisconnect$ = function (_a) {
        var clientId = _a.clientId, socket = _a.socket;
        var observable = new Observable(function (observer) {
            socket.on('disconnect', function () {
                console.log("A player has disconnected.");
                var playerId = selectors.system.getPlayerIdFromClientId(state$.value, clientId) || '';
                if (playerId === '') {
                    console.error("Player id should not be undefined");
                }
                var exitRoomAction = createServerBroadcastAction(PlayerActions.exitRoom, {
                    playerId: playerId,
                });
                var clientDisconnectedAction = createServerBroadcastAction(SystemActions.clientDisconnected, {
                    clientId: clientId,
                });
                observer.next(exitRoomAction);
                observer.next(clientDisconnectedAction);
            });
        });
        return observable;
    };
    var createSetServerDateAction = function (clientId) {
        var setServerDateAction = createServerToSingleClientAction(clientId, SystemActions.setServerDate, { date: new Date() });
        return setServerDateAction;
    };
    var clientToServerAction$ = function (_a) {
        var clientId = _a.clientId, socket = _a.socket;
        var observable = new Observable(function (observer) {
            socket.on('clientToServerAction', function (actionAsString) {
                var action = ejson.parse(actionAsString);
                if (action.type !== SystemActions.sendClientToServerAction) {
                    return;
                }
                // Repackage the action so we have the client id.
                var rawClientAction = createAppAction(SystemActions.rawClientAction, {
                    serverAction: action.payload.serverAction,
                    clientId: clientId,
                });
                observer.next(rawClientAction);
            });
        });
        return observable;
    };
    var serverToClientAction$ = function (input) {
        var clientId = input.clientId, socket = input.socket;
        var actionIndex = 0;
        var serverToSingleClientAction$ = action$.pipe(filter(function (action) { return action.type === SystemActions.serverToSingleClientAction; }), filter(function (action) { return action.clientId === clientId; }), map(function (action) { return action.payload.serverAction; }));
        var serverBroadcastAction$ = action$.pipe(filter(function (action) { return action.type === SystemActions.serverBroadcastAction; }), map(function (action) { return action.payload.serverAction; }));
        var source$ = concat(getOnConnectAction$(input), merge(serverToSingleClientAction$, serverBroadcastAction$));
        return source$.pipe(bufferTime(1, undefined, 1000), filter(function (actions) { return actions.length > 0; }), delay(LAG_MS), tap(function (actions) {
            socket.emit('serverToClientAction', ejson.stringify({ index: actionIndex, actions: actions }));
            actionIndex++;
        }), filter(function () { return false; }));
    };
    var updateServerDateAction$ = function (_a) {
        var clientId = _a.clientId, socket = _a.socket;
        return interval(30000).pipe(map(function () {
            return createSetServerDateAction(clientId);
        }));
    };
    var waitForSetClientId = function (action) { return __awaiter(_this, void 0, void 0, function () {
        var socket, clientId, playerId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("A new client has connected. Waiting for clientId...");
                    socket = action.payload.socket;
                    return [4 /*yield*/, (new Promise(function (resolve) {
                            socket.on('setClientId', function (clientId) {
                                resolve(clientId);
                            });
                        }))];
                case 1:
                    clientId = _a.sent();
                    console.log("Client id for player has been set to " + clientId);
                    playerId = selectors.system.getPlayerIdFromClientId(state$.value, clientId);
                    if (!playerId) return [3 /*break*/, 3];
                    console.log("Can't connect playerId because " + clientId + " clientId is already existing");
                    // @todo: fix it
                    return [4 /*yield*/, ms(Infinity)];
                case 2:
                    // @todo: fix it
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, { clientId: clientId, socket: socket }];
            }
        });
    }); };
    var getOnConnectAction$ = function (input) {
        var setGameStateAction = createServerAction(SystemActions.setGameState, {
            gameState: selectors.advanced.getGameState(state$.value),
        });
        var setServerDateAction = createServerAction(SystemActions.setServerDate, { date: new Date() });
        var onConnectAction$ = of(setGameStateAction, setServerDateAction);
        return onConnectAction$;
    };
    var startClientActions = function (input) {
        var clientDisconnected$ = action$.pipe(filter(function (action) { return action.type === SystemActions.clientDisconnected; }), filter(function (action) {
            return action.payload.clientId === input.clientId;
        }));
        // it works, but not sure why the order matters?
        var socketActions$ = merge(serverToClientAction$(input), clientToServerAction$(input), handleDisconnect$(input), updateServerDateAction$(input)).pipe(takeUntil(clientDisconnected$));
        return socketActions$;
    };
    var socketClientAction$ = action$.pipe(filter(function (action) { return action.type === SystemActions.onNewSocketClientConnected; }), mergeMap(waitForSetClientId), mergeMap(startClientActions));
    return merge(socketClientAction$);
}; };
//# sourceMappingURL=onNewSocketClientConnectedEpic.js.map