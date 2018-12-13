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
import { Observable, ReplaySubject, Subject } from "rxjs/index";
import { createAppAction } from "../actions";
import * as io from 'socket.io-client';
import * as ejson from 'ejson';
import { getServerUrl } from "./getServerUrl";
import { SystemActions } from "../actions/SystemActions";
/**
 * Call `requestConnectToRoom()` to requestConnectToRoom to the room server.
 * Call `disconnect()` to disconnect from the room server.
 * Send actions to server with `sendActionToServer(action)`.
 * Listen to new server actions with `getServerAction$()`.
 *
 * After disconnect you need to create a new instance.
 */
var RoomServerClientInterface = /** @class */ (function () {
    function RoomServerClientInterface() {
        var _this = this;
        /**
         * Clients sends actions to the server
         */
        this.sendActionToServer = function (action) {
            if (_this.socket) {
                _this.socket.emit('clientToServerAction', ejson.stringify(action));
            }
            else {
                _this.clientToServerAction$.next(action);
            }
        };
        /**
         * Server pushes actions to the client.
         * Emitted actions are final and confirmed by the server.
         */
        this.getServerAction$ = function () {
            return _this.serverToClientAction$.asObservable();
        };
        this.resetSubjects();
    }
    RoomServerClientInterface.prototype.connect = function (clientId, port, roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.socket) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.disconnect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.roomId = roomId;
                        this.port = port;
                        this.clientId = clientId;
                        url = getServerUrl() + ":" + port + "/room";
                        this.socket = io(url);
                        this.start();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoomServerClientInterface.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise((function (resolve) {
                        if (_this.socket) {
                            _this.socket.on('disconnect', function () {
                                _this.socket = undefined;
                                _this.clientId = undefined;
                                _this.roomId = undefined;
                                _this.port = undefined;
                                _this.resetSubjects();
                                resolve();
                            });
                            _this.socket.disconnect();
                        }
                        else {
                            resolve();
                        }
                    }))];
            });
        });
    };
    RoomServerClientInterface.prototype.resetSubjects = function () {
        this.serverToClientAction$ && this.serverToClientAction$.complete();
        this.clientToServerAction$ && this.clientToServerAction$.complete();
        this.serverToClientAction$ = new Subject();
        this.clientToServerAction$ = new ReplaySubject();
    };
    RoomServerClientInterface.prototype.start = function () {
        var _this = this;
        // @todo: wait to be accepted connected, like an ack
        var socket = this.socket;
        if (!socket) {
            throw new Error("No socket setup yet.");
        }
        this.clientToServerAction$.subscribe(function (action) {
            socket.emit('clientToServerAction', ejson.stringify(action));
        });
        // No need for wrapping in Observable
        var observable = new Observable(function (observer) {
            var lastIndex = -1;
            socket.on('serverToClientAction', function (actionsAsString) {
                var _a = ejson.parse(actionsAsString), index = _a.index, actions = _a.actions;
                if (index !== lastIndex + 1) {
                    alert("Some message have been dropped: " + (lastIndex + 1) + '-' + index);
                    window.location.reload();
                }
                lastIndex = index;
                // console.log(`Received chunk of actions`, actions);
                if (actions.length > 0) {
                    observer.next(actions);
                }
            });
            var onSocketStateChange = function (newState) {
                observer.next([createAppAction(SystemActions.clientSideSocketChange, { newState: newState })]);
            };
            socket.on('connect', function () {
                onSocketStateChange("connect");
            });
            socket.on('connect_error', function () {
                onSocketStateChange("connect_error");
            });
            socket.on('connect_timeout', function () {
                onSocketStateChange("connect_timeout");
            });
            socket.on('reconnect', function () {
                lastIndex = -1;
                socket.emit("setClientId", _this.clientId);
                onSocketStateChange("reconnect");
            });
            socket.on('reconnect_attempt', function () {
                onSocketStateChange("reconnect_attempt");
            });
            socket.on('reconnecting', function () {
                onSocketStateChange("reconnecting");
            });
            socket.on('reconnect_error', function () {
                onSocketStateChange("reconnect_error");
            });
            socket.on('reconnect_failed', function () {
                onSocketStateChange("reconnect");
            });
            return function () {
                socket.disconnect();
            };
        });
        observable.subscribe(this.serverToClientAction$);
        socket.emit("setClientId", this.clientId);
    };
    return RoomServerClientInterface;
}());
export { RoomServerClientInterface };
//# sourceMappingURL=RoomServerClientInterface.js.map