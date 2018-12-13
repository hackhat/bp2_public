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
import { delay, filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { merge, interval, of } from 'rxjs';
import { createServerBroadcastAction } from "../../actions";
import { SystemActions } from "../../actions/SystemActions";
import { selectors } from "../../reducers";
import * as moment from "moment";
import { createSeparateClusterPlanetsMap } from "../../maps/createSeparateClusterPlanetsMap";
import { getGameEnd$ } from "../utils/getGameEnd$";
import { ofType } from "../utils/ofType";
import { isProduction } from "../../utils/isProduction";
import { globalServerClientInterface } from "../../networking/globalServerClientInterface";
import { globalApiSecretKey } from "../../server/serverSecrets";
var GAME_DURATION = [isProduction ? 30 : 30, 'minutes'];
var NEW_GAME_DELAY_IN_SECONDS = 10;
var createRequestNewGameAction = function () {
    var _a;
    var gameEndDate = (_a = moment()).add.apply(_a, GAME_DURATION).toDate();
    var requestNewGameAction = createServerBroadcastAction(SystemActions.requestNewGame, {
        isDemo: false,
        gameEndDate: gameEndDate,
        planets: createSeparateClusterPlanetsMap(),
    });
    return requestNewGameAction;
};
var createNewGameAction = function (payload) {
    var newGameAction = createServerBroadcastAction(SystemActions.newGame, payload);
    return newGameAction;
};
var createCleanUpDataAction = function () {
    var cleanUpGameData = createServerBroadcastAction(SystemActions.cleanUpGameData, null);
    return cleanUpGameData;
};
var checkIfGameEnded = function (state$) { return function () {
    var gameEndDate = selectors.system.getGameEndDate(state$.value);
    if (gameEndDate === undefined) {
        return false;
    }
    var now = new Date();
    if (+now > +gameEndDate) {
        console.log("Game ended");
        return true;
    }
    return false;
}; };
var createGameEndAction = function () {
    return createServerBroadcastAction(SystemActions.gameEnd, null);
};
/**
 * Redesigned flow:
 *
 * - Server starts
 * - Request new game
 * - Start new game
 * - Wait for game end
 * - Game end
 * - Wait X time
 * - Clean game
 * - Go back to 1st "Request new game"
 *
 */
export var gameLifeCycleEpic = function (store) { return function (action$, state$) {
    var init$ = action$.pipe(ofType(SystemActions.serverStart), map(createRequestNewGameAction));
    var newGame$ = action$.pipe(ofType(SystemActions.requestNewGame), map(function (requestNewGameAction) {
        return createNewGameAction(requestNewGameAction.payload);
    }), tap(function () {
        console.log("A new game started.");
    }));
    var onNewGame$ = action$.pipe(ofType(SystemActions.newGame), mergeMap(function () {
        return interval(1000).pipe(filter(checkIfGameEnded(state$)), take(1), map(function () { return createGameEndAction(); }));
    }));
    var processGameEnd = function () { return __awaiter(_this, void 0, void 0, function () {
        var roomId, processGameEndRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    roomId = selectors.system.getRoomId(state$.value);
                    if (!roomId) {
                        return [2 /*return*/, processGameEnd()];
                    }
                    return [4 /*yield*/, globalServerClientInterface('processGameEnd', {
                            secretKey: globalApiSecretKey,
                            roomId: roomId,
                            players: selectors.players.getPlayersAsList(state$.value),
                        })];
                case 1:
                    processGameEndRes = _a.sent();
                    if (processGameEndRes.ok) {
                        return [2 /*return*/, { ok: true }];
                    }
                    return [2 /*return*/, processGameEnd()];
            }
        });
    }); };
    var restartOnGameEnd$ = getGameEnd$(action$).pipe(tap(function () {
        console.log("Game ended.");
    }), mergeMap(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, processGameEnd()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, null];
            }
        });
    }); }), delay(Math.round(NEW_GAME_DELAY_IN_SECONDS * 1000)), mergeMap(function () {
        return of(createCleanUpDataAction(), createRequestNewGameAction());
    }));
    return merge(newGame$, onNewGame$, init$, restartOnGameEnd$);
}; };
//# sourceMappingURL=gameLifeCycleEpic.js.map