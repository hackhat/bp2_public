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
import { DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME, PLANET_MONEY_VALUE, PLANET_WITHOUT_OWNER_COLOR } from "../src/constants/constants";
import { VirtualClient } from "../src/networking/VirtualClient";
import { namedPlanets } from "./utils/planets";
import { expectPlayerDepositToBe } from "./utils/expectPlayerDepositToBe";
import { expectPlayerMoneyToBe } from "./utils/expectPlayerMoneyToBe";
import { startFreshGame } from "./utils/startFreshGame";
import { ms } from "../src/utils/ms";
import { bigBossAuth } from "./utils/bigBossAuth";
import { createSendClientToServerAction } from "../src/actions";
import { SystemActions } from "../src/actions/SystemActions";
import { roomApiSecretKey } from "../src/server/serverSecrets";
import { expectPlanetIdToContain } from "./utils/expectPlanetIdToContain";
/**
 * There was a bug where
 *
 *  - Player starts a game
 *  - Owns a protected planet
 *  - Disconnects
 *  - Planet is disowned
 *  - Available money is 100
 *  - Player joins game again
 *  - Now the available money is 90. But should be 190 because the previous 100 is already there.
 */
test("releaseMoneyOnCleanUpProtectedPlanetsAndStartAgain", function () { return __awaiter(_this, void 0, void 0, function () {
    var bigBoss;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jest.setTimeout(5 * 60 * 1000);
                console.time("startFreshGame");
                return [4 /*yield*/, startFreshGame({
                        beforeStartNewGameFn: function (virtualClient) {
                            virtualClient.dispatchAction(createSendClientToServerAction(SystemActions.setPublicSetting, {
                                key: "cleanUpProtectedPlanetsAfterMsOfPlayerOffline",
                                value: 5 * 1000,
                            }, roomApiSecretKey));
                        }
                    })];
            case 1:
                _a.sent();
                console.timeEnd("startFreshGame");
                console.time("virtualClientBigBoss");
                bigBoss = new VirtualClient();
                return [4 /*yield*/, bigBoss.init()];
            case 2:
                _a.sent();
                return [4 /*yield*/, bigBoss.createUser(__assign({ name: 'Big Boss' }, bigBossAuth))];
            case 3:
                _a.sent();
                return [4 /*yield*/, bigBoss.connectToRoomServer()];
            case 4:
                _a.sent();
                console.timeEnd("virtualClientBigBoss");
                console.time("loginRoomServer");
                // Login room and start game and send ship
                return [4 /*yield*/, bigBoss.loginRoomServer()];
            case 5:
                // Login room and start game and send ship
                _a.sent();
                return [4 /*yield*/, bigBoss.startGameWithPlanetId(namedPlanets.big.id)];
            case 6:
                _a.sent();
                return [4 /*yield*/, expectPlayerMoneyToBe(bigBoss, DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME)];
            case 7:
                _a.sent();
                return [4 /*yield*/, expectPlayerDepositToBe(bigBoss, PLANET_MONEY_VALUE)];
            case 8:
                _a.sent();
                console.timeEnd("loginRoomServer");
                // Disconnect
                return [4 /*yield*/, bigBoss.disconnectFromRoomServer()];
            case 9:
                // Disconnect
                _a.sent();
                return [4 /*yield*/, ms(15 * 1000)];
            case 10:
                _a.sent();
                // Connect again
                console.time("virtualClientBigBoss2");
                bigBoss = new VirtualClient();
                return [4 /*yield*/, bigBoss.init()];
            case 11:
                _a.sent();
                return [4 /*yield*/, bigBoss.loginUser(bigBossAuth)];
            case 12:
                _a.sent();
                return [4 /*yield*/, bigBoss.connectToRoomServer()];
            case 13:
                _a.sent();
                return [4 /*yield*/, bigBoss.loginRoomServer()];
            case 14:
                _a.sent();
                console.timeEnd("virtualClientBigBoss2");
                console.time("checkDepositForAccountId2");
                return [4 /*yield*/, expectPlayerMoneyToBe(bigBoss, DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME)];
            case 15:
                _a.sent();
                return [4 /*yield*/, expectPlayerDepositToBe(bigBoss, 0)];
            case 16:
                _a.sent();
                return [4 /*yield*/, expectPlanetIdToContain(bigBoss, namedPlanets.big.id, {
                        ownerId: null,
                        color: PLANET_WITHOUT_OWNER_COLOR,
                    })];
            case 17:
                _a.sent();
                return [4 /*yield*/, bigBoss.startGameWithPlanetId(namedPlanets.big.id)];
            case 18:
                _a.sent();
                return [4 /*yield*/, expectPlayerMoneyToBe(bigBoss, DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME * 2)];
            case 19:
                _a.sent();
                return [4 /*yield*/, expectPlayerDepositToBe(bigBoss, PLANET_MONEY_VALUE)];
            case 20:
                _a.sent();
                return [4 /*yield*/, expectPlanetIdToContain(bigBoss, namedPlanets.big.id, {
                        ownerId: bigBoss.getCurrentPlayer().id,
                        color: bigBoss.getCurrentPlayer().color,
                    })];
            case 21:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=releaseMoneyOnCleanUpProtectedPlanetsAndStartAgain.test.js.map