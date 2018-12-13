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
import { mergeMap } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { createAppAction, createServerBroadcastAction, createServerToSingleClientAction } from "../../actions";
import { selectors } from "../../reducers";
import { PlayerActions } from "../../actions/PlayerActions";
import { globalServerClientInterface } from "../../networking/globalServerClientInterface";
import { isTypeOfAuthorizedAction } from "../utils/isTypeOfAuthorizedAction";
import * as _ from "lodash";
import generateUniqueId from "../../utils/generateUniqueId";
import { globalApiSecretKey } from "../../server/serverSecrets";
export var requestLoginRoomEpic = function (store) { return function (action$, state$) {
    var loginObservable = function (authorizedAction) {
        return new Observable(function (observer) {
            var start = function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, sessionId, clientId, accountId, loggingInPlayerAction, isAccountLoggingIn, res, requestRoomLoginErrorAction, _b, user, accounts, account, roomId, getDepositRes, player, partialPlayer, onRoomLoginAction, error_1, requestRoomLoginErrorAction;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = authorizedAction.payload.serverAction.payload, sessionId = _a.sessionId, clientId = _a.clientId, accountId = _a.accountId;
                            loggingInPlayerAction = createAppAction(PlayerActions.loggingInPlayer, {
                                accountId: accountId,
                            });
                            observer.next(loggingInPlayerAction);
                            isAccountLoggingIn = selectors.players.isAccountLoggingIn(state$.value, accountId);
                            // Don't start the process of logging in twice as it should not broadcast that the same
                            // player logged in twice.
                            if (isAccountLoggingIn)
                                return [2 /*return*/, null];
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, globalServerClientInterface('getUserFromSessionId', { sessionId: sessionId })];
                        case 2:
                            res = _c.sent();
                            if (!res.ok) {
                                console.error("Error:", res.err);
                                requestRoomLoginErrorAction = createServerToSingleClientAction(authorizedAction.payload.clientId, PlayerActions.requestRoomLoginError, {
                                    accountId: accountId,
                                    clientId: clientId,
                                    error: "Error in getUserFromSessionId" + res.err,
                                });
                                return [2 /*return*/, observer.next(requestRoomLoginErrorAction)];
                            }
                            _b = res.payload, user = _b.user, accounts = _b.accounts;
                            if (!user.name) {
                                throw new Error("User should have a name");
                            }
                            account = _.find(accounts, { id: accountId });
                            if (!account) {
                                throw new Error("Account should be present");
                            }
                            roomId = selectors.system.getRoomId(state$.value);
                            if (!roomId)
                                throw new Error("No roomId found");
                            return [4 /*yield*/, globalServerClientInterface('getDeposit', {
                                    secretKey: globalApiSecretKey,
                                    accountId: account.id,
                                    roomId: roomId,
                                })];
                        case 3:
                            getDepositRes = _c.sent();
                            if (!getDepositRes.ok)
                                console.error("Cant get deposit of account");
                            player = selectors.players.getPlayerWithAccountId(state$.value, accountId);
                            partialPlayer = {
                                userId: user.id,
                                clientId: clientId,
                                accountId: accountId,
                                playerId: player ? player.id : generateUniqueId(),
                                name: user.name,
                                hasEmail: !!user.email,
                                countryCode: user.countryCode,
                            };
                            onRoomLoginAction = createServerBroadcastAction(PlayerActions.onRoomLogin, {
                                partialPlayer: partialPlayer,
                            });
                            observer.next(onRoomLoginAction);
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _c.sent();
                            console.log("Error:", error_1);
                            requestRoomLoginErrorAction = createServerToSingleClientAction(authorizedAction.payload.clientId, PlayerActions.requestRoomLoginError, {
                                clientId: clientId,
                                accountId: accountId,
                                error: "Error: " + error_1,
                            });
                            observer.next(requestRoomLoginErrorAction);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
            start().then(function () {
                // noop
            });
        });
    };
    var requestJoinRoom$ = action$.pipe(isTypeOfAuthorizedAction(PlayerActions.requestRoomLogin), mergeMap(loginObservable));
    return merge(requestJoinRoom$);
}; };
//# sourceMappingURL=requestLoginRoomEpic.js.map