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
var _this = this;
import { mergeMap } from 'rxjs/operators';
import { merge, from, of } from 'rxjs';
import { createServerBroadcastAction, createServerToSingleClientAction } from "../../actions";
import { SystemActions } from "../../actions/SystemActions";
import * as _ from "lodash";
import { selectors } from "../../reducers";
import { selectRandomFromArray } from "../../utils/selectRandomFromArray";
import { playerColorsArray } from "../../constants/playerColorsArray";
import { isTypeOfAuthorizedAction } from "../utils/isTypeOfAuthorizedAction";
import { globalServerClientInterface } from "../../networking/globalServerClientInterface";
import { globalApiSecretKey } from "../../server/serverSecrets";
import { DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME } from "../../constants/constants";
import { MoneyTransferReason } from "../../constants/MoneyTransferReason";
import { INITIAL_RESOURCES } from "../../reducers/playersReducer";
export var requestStartGameWithEpic = function (store) { return function (action$, state$) {
    var requestStartGame$ = action$.pipe(isTypeOfAuthorizedAction(SystemActions.requestStartGameWith), mergeMap(function (authorizedAction) { return __awaiter(_this, void 0, void 0, function () {
        var _a, authenticatedPlayerId, serverAction, _b, planetId, playerId, state, canStartGameWithRes, player, roomId, addDepositRes, players, usedColors, availableColors, color, outputActions, startGameWithAction;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = authorizedAction.payload, authenticatedPlayerId = _a.authenticatedPlayerId, serverAction = _a.serverAction;
                    _b = serverAction.payload, planetId = _b.planetId, playerId = _b.playerId;
                    state = state$.value;
                    canStartGameWithRes = selectors.advanced.canStartGameWith(state, {
                        authenticatedPlayerId: authenticatedPlayerId,
                        playerId: playerId,
                        planetId: planetId,
                    });
                    if (!canStartGameWithRes.ok) {
                        return [2 /*return*/, of(createServerToSingleClientAction(authorizedAction.payload.clientId, SystemActions.startGameWithError, __assign({}, serverAction.payload, { error: canStartGameWithRes.err })))];
                    }
                    player = selectors.players.getPlayerById(state, playerId);
                    if (!player)
                        throw new Error("No player found");
                    roomId = selectors.system.getRoomId(state);
                    if (!roomId)
                        throw new Error("No roomId found");
                    return [4 /*yield*/, globalServerClientInterface('addDeposit', {
                            secretKey: globalApiSecretKey,
                            accountId: player.accountId,
                            roomId: roomId,
                            depositAmountInCents: DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME,
                            notes: MoneyTransferReason.startGame,
                        })];
                case 1:
                    addDepositRes = _c.sent();
                    if (!addDepositRes.ok) {
                        return [2 /*return*/, of(createServerToSingleClientAction(authorizedAction.payload.clientId, SystemActions.startGameWithError, __assign({}, serverAction.payload, { error: "Error adding deposit: " + addDepositRes.err })))];
                    }
                    players = selectors.players.getPlayersAsList(state);
                    usedColors = players.map(function (player) { return player && player.color; }).filter(function (color) { return color !== undefined; });
                    availableColors = _.difference(playerColorsArray, usedColors);
                    if (availableColors.length === 0) {
                        availableColors = playerColorsArray;
                    }
                    color = selectRandomFromArray(availableColors);
                    if (!color) {
                        return [2 /*return*/, of(null)];
                    }
                    outputActions = [];
                    startGameWithAction = createServerBroadcastAction(SystemActions.startGameWith, __assign({}, serverAction.payload, { color: color, 
                        // Note that the deposit in this case is deposit for the room.
                        totalMoneyAmountInCents: DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME, initialResources: Math.max(selectors.advanced.getAverageResourcesGainedByCurrentlyOnlinePlayers(state), INITIAL_RESOURCES) }));
                    outputActions.push(startGameWithAction);
                    return [2 /*return*/, from(outputActions)];
            }
        });
    }); }), mergeMap(function (action$) {
        return action$;
    }));
    return merge(requestStartGame$);
}; };
//# sourceMappingURL=requestStartGameWithEpic.js.map