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
import { VirtualClient } from "../../src/networking/VirtualClient";
import { createSendClientToServerAction } from "../../src/actions";
import { SystemActions } from "../../src/actions/SystemActions";
import { roomApiSecretKey } from "../../src/server/serverSecrets";
import * as moment from "moment";
import { planets } from "./planets";
import { ms } from "../../src/utils/ms";
import { PlayerActions } from "../../src/actions/PlayerActions";
export var startFreshGame = function (props) {
    if (props === void 0) { props = {}; }
    return __awaiter(_this, void 0, void 0, function () {
        var beforeStartNewGameFn, virtualClient, cleanUpGameDataAction, gameEndDate, newGameAction, removeAllPlayers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    beforeStartNewGameFn = props.beforeStartNewGameFn;
                    virtualClient = new VirtualClient();
                    return [4 /*yield*/, virtualClient.init()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, virtualClient.createUser({ name: 'Start game player' })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, virtualClient.connectToRoomServer()];
                case 3:
                    _a.sent();
                    virtualClient.dispatchAction(createSendClientToServerAction(SystemActions.setPublicSetting, {
                        key: "cleanUpProtectedPlanetsAfterMsOfPlayerOffline",
                        value: 60 * 1000,
                    }, roomApiSecretKey));
                    virtualClient.dispatchAction(createSendClientToServerAction(SystemActions.setPublicSetting, {
                        key: "enableAddPlanetUnits",
                        value: false,
                    }, roomApiSecretKey));
                    return [4 /*yield*/, ms(100)];
                case 4:
                    _a.sent();
                    beforeStartNewGameFn && beforeStartNewGameFn(virtualClient);
                    virtualClient.dispatchAction(createSendClientToServerAction(SystemActions.setPublicSetting, {
                        key: "autoSpawnAfterRoomLogin",
                        value: false,
                    }, roomApiSecretKey));
                    cleanUpGameDataAction = createSendClientToServerAction(SystemActions.cleanUpGameData, null, roomApiSecretKey);
                    virtualClient.dispatchAction(cleanUpGameDataAction);
                    gameEndDate = moment().add(1, 'day').toDate();
                    newGameAction = createSendClientToServerAction(SystemActions.newGame, {
                        isDemo: false,
                        gameEndDate: gameEndDate,
                        planets: planets,
                    }, roomApiSecretKey);
                    virtualClient.dispatchAction(newGameAction);
                    removeAllPlayers = createSendClientToServerAction(PlayerActions.removeAllPlayers, null);
                    virtualClient.dispatchAction(removeAllPlayers);
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=startFreshGame.js.map