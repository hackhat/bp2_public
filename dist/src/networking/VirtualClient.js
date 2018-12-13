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
/**
 * A virtual client enables you a clean api to communicate with the game
 * instead of manually dispatching actions.
 *
 * Abstracts away technical things that a client of the game might not want
 * to specify manually.
 */
import generateUniqueId from "../utils/generateUniqueId";
import { globalServerClientInterface } from "./globalServerClientInterface";
import { RoomServerClientInterface } from "./RoomServerClientInterface";
import { createAppAction, createSendClientToServerAction } from "../actions/index";
import { PlayerActions } from "../actions/PlayerActions";
import { SystemActions } from "../actions/SystemActions";
import { selectors } from "../reducers/index";
import { ms } from "../utils/ms";
import { createClientStore } from "../client/createClientStore";
import { ShipActions } from "../actions/ShipActions";
import { GlobalUIActions } from "../actions/GlobalUIActions";
import { globalApiSecretKey } from "../server/serverSecrets";
var VirtualClient = /** @class */ (function () {
    function VirtualClient() {
    }
    VirtualClient.prototype.dispatchAction = function (action) {
        if (!this.store) {
            throw new Error("No store to dispatch.");
        }
        this.store.dispatch(action);
    };
    ;
    VirtualClient.prototype.loginUser = function (loginInput) {
        return __awaiter(this, void 0, void 0, function () {
            var loginRes, addCurrentUserAndAccountsAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, globalServerClientInterface('login', loginInput)];
                    case 1:
                        loginRes = _a.sent();
                        if (!loginRes.ok) {
                            throw new Error("Error logging in " + loginRes.err);
                        }
                        this.sessionId = loginRes.payload.session.id;
                        addCurrentUserAndAccountsAction = createAppAction(GlobalUIActions.addCurrentUserAndAccounts, loginRes.payload);
                        this.dispatchAction(addCurrentUserAndAccountsAction);
                        return [2 /*return*/];
                }
            });
        });
    };
    VirtualClient.prototype.createUser = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var createUserRes, updateUserRes, addCurrentUserAndAccountsAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, globalServerClientInterface('createUser', { userAgent: "test" })];
                    case 1:
                        createUserRes = _a.sent();
                        if (!createUserRes.ok) {
                            throw new Error("createUserRes" + createUserRes.err);
                        }
                        this.sessionId = createUserRes.payload.session.id;
                        return [4 /*yield*/, globalServerClientInterface('updateUser', {
                                sessionId: this.getSessionId(),
                                updateUser: userData,
                            })];
                    case 2:
                        updateUserRes = _a.sent();
                        if (!updateUserRes.ok) {
                            throw new Error("update user" + updateUserRes.reason);
                        }
                        addCurrentUserAndAccountsAction = createAppAction(GlobalUIActions.addCurrentUserAndAccounts, __assign({}, createUserRes.payload, { user: updateUserRes.payload.user }));
                        this.dispatchAction(addCurrentUserAndAccountsAction);
                        return [2 /*return*/, { ok: true }];
                }
            });
        });
    };
    VirtualClient.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createStore()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VirtualClient.prototype.createStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var roomSCI;
            return __generator(this, function (_a) {
                roomSCI = new RoomServerClientInterface();
                this.store = createClientStore({ enableReduxDevTools: false, roomSCI: roomSCI });
                return [2 /*return*/];
            });
        });
    };
    VirtualClient.prototype.getCurrentClientId = function () {
        var clientId = selectors.ui.global.getCurrentClientId(this.getAppState());
        if (!clientId) {
            throw new Error("No clientId");
        }
        return clientId;
    };
    VirtualClient.prototype.getCurrentUserId = function () {
        var userId = selectors.ui.global.getCurrentUserId(this.getAppState());
        if (!userId) {
            throw new Error("No userId");
        }
        return userId;
    };
    VirtualClient.prototype.getCurrentPlayerId = function () {
        var playerId = selectors.ui.global.getCurrentPlayerId(this.getAppState());
        if (!playerId) {
            throw new Error("No playerId");
        }
        return playerId;
    };
    VirtualClient.prototype.getCurrentPlayer = function () {
        var playerId = this.getCurrentPlayerId();
        var player = selectors.players.getPlayerById(this.getAppState(), playerId);
        if (!player) {
            throw new Error("No player");
        }
        return player;
    };
    VirtualClient.prototype.getCurrentDepositAmountInCents = function () {
        var accountId = this.getCurrentAccountId();
        var roomId = selectors.system.getRoomId(this.getAppState());
        if (roomId === undefined)
            return 0;
        var roomDeposit = selectors.roomDeposits.getRoomDepositByAccountIdAndRoomId(this.getAppState(), accountId, roomId);
        if (!roomDeposit)
            return 0;
        return roomDeposit.depositAmountInCents;
    };
    VirtualClient.prototype.getCurrentAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accountId, getAccountsByIdsRes, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountId = this.getCurrentAccountId();
                        return [4 /*yield*/, globalServerClientInterface('getAccountsByIds', {
                                secretKey: globalApiSecretKey,
                                accountIds: [accountId],
                            })];
                    case 1:
                        getAccountsByIdsRes = _a.sent();
                        if (!getAccountsByIdsRes.ok) {
                            throw new Error("Error in api request getAccountsByIds:" + getAccountsByIdsRes.err);
                        }
                        account = getAccountsByIdsRes.payload.accounts[0];
                        if (!account) {
                            throw new Error("No account returned");
                        }
                        return [2 /*return*/, account];
                }
            });
        });
    };
    VirtualClient.prototype.getCurrentUser = function () {
        var userId = this.getCurrentUserId();
        var user = selectors.users.getUserById(this.getAppState(), userId);
        if (!user) {
            throw new Error("No player");
        }
        return user;
    };
    VirtualClient.prototype.getCurrentAccountId = function () {
        var accountId = selectors.ui.global.getCurrentAccountId(this.getAppState());
        if (!accountId) {
            throw new Error("No accountId");
        }
        return accountId;
    };
    VirtualClient.prototype.getSessionId = function () {
        if (!this.sessionId) {
            throw new Error("No session id");
        }
        return this.sessionId;
    };
    VirtualClient.prototype.connectToRoomServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requestConnectToRoomAction;
            return __generator(this, function (_a) {
                requestConnectToRoomAction = createAppAction(SystemActions.requestConnectToRoom, { roomId: "s01" });
                this.dispatchAction(requestConnectToRoomAction);
                return [2 /*return*/];
            });
        });
    };
    VirtualClient.prototype.disconnectFromRoomServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var disconnectRoomAction;
            return __generator(this, function (_a) {
                disconnectRoomAction = createAppAction(SystemActions.disconnect, null);
                this.dispatchAction(disconnectRoomAction);
                return [2 /*return*/];
            });
        });
    };
    VirtualClient.prototype.loginRoomServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requestRoomLoginAction, player, life;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestRoomLoginAction = createSendClientToServerAction(PlayerActions.requestRoomLogin, {
                            sessionId: this.getSessionId(),
                            clientId: this.getCurrentClientId(),
                            accountId: this.getCurrentAccountId(),
                        });
                        this.dispatchAction(requestRoomLoginAction);
                        life = 10;
                        _a.label = 1;
                    case 1:
                        if (!(!player && life--)) return [3 /*break*/, 4];
                        player = selectors.players.getPlayerWithAccountId(this.getAppState(), this.getCurrentAccountId());
                        if (!!player) return [3 /*break*/, 3];
                        return [4 /*yield*/, ms(500)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4:
                        if (!player) {
                            throw new Error("Can't get player");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    VirtualClient.prototype.getAppState = function () {
        if (!this.store)
            throw new Error("No store");
        return this.store.getState();
    };
    ;
    VirtualClient.prototype.startGameWithPlanetId = function (planetId) {
        return __awaiter(this, void 0, void 0, function () {
            var startGameAction, planetsOwned, life;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startGameAction = createSendClientToServerAction(SystemActions.requestStartGameWith, {
                            playerId: this.getCurrentPlayerId(),
                            planetId: planetId,
                        });
                        this.dispatchAction(startGameAction);
                        planetsOwned = 0;
                        life = 10;
                        _a.label = 1;
                    case 1:
                        if (!(planetsOwned === 0 && life--)) return [3 /*break*/, 3];
                        planetsOwned = selectors.planets.getPlanetsOwnedByPlayerId(this.getAppState(), this.getCurrentPlayerId()).length;
                        return [4 /*yield*/, ms(500)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        if (planetsOwned === 0) {
                            throw new Error("Can't start the game");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    VirtualClient.prototype.sendShipAndWaitUntilArrives = function (_a) {
        var units = _a.units, toPlanetId = _a.toPlanetId, fromPlanetId = _a.fromPlanetId;
        return __awaiter(this, void 0, void 0, function () {
            var shipId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.sendShip({ units: units, toPlanetId: toPlanetId, fromPlanetId: fromPlanetId })];
                    case 1:
                        shipId = _b.sent();
                        return [4 /*yield*/, this.waitUntilShipArrived(shipId)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VirtualClient.prototype.sendShip = function (_a) {
        var units = _a.units, toPlanetId = _a.toPlanetId, fromPlanetId = _a.fromPlanetId;
        return __awaiter(this, void 0, void 0, function () {
            var shipId, requestSendShipAction, shipSent, life, ship;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        shipId = generateUniqueId();
                        requestSendShipAction = createSendClientToServerAction(ShipActions.requestSendShip, {
                            units: units,
                            toPlanetId: toPlanetId,
                            fromPlanetId: fromPlanetId,
                            ownerId: this.getCurrentPlayerId(),
                            id: shipId,
                        });
                        this.dispatchAction(requestSendShipAction);
                        shipSent = false;
                        life = 10;
                        _b.label = 1;
                    case 1:
                        if (!(!shipSent && life--)) return [3 /*break*/, 5];
                        ship = selectors.ships.getShipById(this.getAppState(), shipId);
                        if (!ship) return [3 /*break*/, 2];
                        shipSent = true;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ms(50)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, shipId];
                }
            });
        });
    };
    VirtualClient.prototype.waitUntilShipArrived = function (shipId) {
        return __awaiter(this, void 0, void 0, function () {
            var shipArrived, life, ship;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shipArrived = false;
                        life = 50;
                        _a.label = 1;
                    case 1:
                        if (!(!shipArrived && life--)) return [3 /*break*/, 5];
                        ship = selectors.ships.getShipById(this.getAppState(), shipId);
                        if (!!ship) return [3 /*break*/, 2];
                        shipArrived = true;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ms(500)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5:
                        if (!shipArrived) {
                            throw new Error("Ship didn't arrive");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return VirtualClient;
}());
export { VirtualClient };
//# sourceMappingURL=VirtualClient.js.map