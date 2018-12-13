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
import { createAppAction, createServerBroadcastAction } from "../../actions/index";
import reducers, { initialState, selectors } from "../../reducers/index";
import { createStore, compose, applyMiddleware } from 'redux';
import { reduxBatch } from '@manaflair/redux-batch';
import { SystemActions } from "../../actions/SystemActions";
import { createEpicMiddleware } from "redux-observable";
import { createServerEpic } from "../../epics/server/createServerEpic";
import * as express from 'express';
import * as SocketIO from 'socket.io';
import { isProduction } from "../../utils/isProduction";
import { getAppVersion } from "../../utils/getAppVersion";
import { globalServerClientInterface } from "../../networking/globalServerClientInterface";
import generateUniqueId from "../../utils/generateUniqueId";
import { globalApiSecretKey } from "../serverSecrets";
import { ROOM_SERVER_PING_INTERVAL_IN_SECONDS } from "../../constants/constants";
var RoomServer = /** @class */ (function () {
    function RoomServer(_a) {
        var port = _a.port;
        this.id = generateUniqueId();
        this.port = port;
    }
    RoomServer.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var registerRoomServerRes, serverStartAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, globalServerClientInterface('registerRoomServer', {
                            secretKey: globalApiSecretKey,
                            roomId: this.id,
                            roomType: 'fakeMoney',
                        })];
                    case 1:
                        registerRoomServerRes = _a.sent();
                        if (!registerRoomServerRes.ok) {
                            throw new Error("Can't start room " + registerRoomServerRes.err);
                        }
                        this.startRoomServerPinger();
                        this.createStore();
                        serverStartAction = createAppAction(SystemActions.serverStart, { roomId: this.id });
                        this.dispatchAction(serverStartAction);
                        return [4 /*yield*/, this.startServer()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoomServer.prototype.kill = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.store = undefined;
                        if (this.socketIOServer) {
                            this.socketIOServer.close();
                        }
                        if (this.pingerInterval !== undefined)
                            clearInterval(this.pingerInterval);
                        promise = new Promise(function (resolve) {
                            if (_this.server) {
                                _this.server.close(function () {
                                    console.log("Closing server");
                                    resolve();
                                });
                                _this.server = undefined;
                            }
                            else {
                                resolve();
                            }
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoomServer.prototype.startRoomServerPinger = function () {
        var _this = this;
        this.pingerInterval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, globalServerClientInterface('roomServerPingUpdate', {
                            secretKey: globalApiSecretKey,
                            roomId: this.id,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }, ROOM_SERVER_PING_INTERVAL_IN_SECONDS * 1000);
    };
    RoomServer.prototype.startServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = new Promise(function (resolve, reject) {
                            try {
                                var app = express();
                                app.get('/', function (req, res) {
                                    res.setHeader('Content-Type', 'application/json');
                                    var info = {
                                        serverType: 'RoomServer',
                                        version: getAppVersion(),
                                        isProductionBuild: isProduction,
                                    };
                                    res.send(JSON.stringify(info, null, '  '));
                                });
                                app.get('/info.json', function (req, res) {
                                    res.setHeader('Content-Type', 'application/json');
                                    var info = {
                                        serverType: 'RoomServer',
                                        version: getAppVersion(),
                                        isProductionBuild: isProduction,
                                    };
                                    res.send(JSON.stringify(info, null, '  '));
                                });
                                if (!isProduction) {
                                    app.get('/state.json', function (req, res) {
                                        res.setHeader('Content-Type', 'application/json');
                                        res.send(JSON.stringify(_this.store && _this.store.getState(), null, '  '));
                                    });
                                    app.get('/actions.json', function (req, res) {
                                        res.setHeader('Content-Type', 'application/json');
                                        var state = _this.store && _this.store.getState();
                                        var actions = selectors.system.getActions(state);
                                        res.send(JSON.stringify(actions, null, '  '));
                                    });
                                    app.get('/restart123', function (req, res) {
                                        res.setHeader('Content-Type', 'application/json');
                                        var gameEndAction = createServerBroadcastAction(SystemActions.gameEnd, null);
                                        _this.dispatchAction(gameEndAction);
                                        res.send({ ok: true });
                                    });
                                }
                                var http_1 = require('http').Server(app);
                                _this.socketIOServer = SocketIO(http_1);
                                var namespace = _this.socketIOServer.of("/room");
                                namespace.on('connection', _this.onNewClientConnected.bind(_this));
                                _this.server = http_1.listen(_this.port, function () {
                                    console.log("Room Server started on port " + _this.port);
                                    resolve();
                                });
                            }
                            catch (e) {
                                reject("Can't start server" + e);
                            }
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Just to confirm the next month rent will be for 23 days (31-8) because our contract rolls on the 8th (we pay in advance of the rolling of the rent)
    RoomServer.prototype.onNewClientConnected = function (socket) {
        var onNewSocketClientConnectedAction = createAppAction(SystemActions.onNewSocketClientConnected, {
            socket: socket,
        });
        this.dispatchAction(onNewSocketClientConnectedAction);
    };
    RoomServer.prototype.createStore = function () {
        var epicMiddleware = createEpicMiddleware();
        this.store = createStore(reducers, initialState, compose(reduxBatch, applyMiddleware(epicMiddleware), reduxBatch));
        var rootEpic = createServerEpic(this.store);
        epicMiddleware.run(rootEpic);
    };
    RoomServer.prototype.dispatchAction = function (action) {
        var errorInDispatch;
        try {
            this.store && this.store.dispatch(action);
            errorInDispatch = false;
        }
        catch (e) {
            errorInDispatch = true;
            // reject this action from being saved and emitted
            console.error("Error during action dispatch", e, action);
        }
        if (errorInDispatch) {
            console.error("Error in dispatching action. This action will not be emitted or saved.", action);
            return;
        }
    };
    return RoomServer;
}());
export { RoomServer };
//# sourceMappingURL=RoomServer.js.map