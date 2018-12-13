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
import { SystemActions } from "../src/actions/SystemActions";
import { createSendClientToServerAction } from "../src/actions";
import { DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME, INITIAL_MONEY_IN_CENTS_FOR_FAKE_MONEY_ACCOUNTS, PLANET_MONEY_VALUE, } from "../src/constants/constants";
import { VirtualClient } from "../src/networking/VirtualClient";
import { roomApiSecretKey } from "../src/server/serverSecrets";
import { namedPlanets } from "./utils/planets";
import { expectPlayerDepositToBe } from "./utils/expectPlayerDepositToBe";
import { expectPlayerMoneyToBe } from "./utils/expectPlayerMoneyToBe";
import { startFreshGame } from "./utils/startFreshGame";
import { expectPlanetIdToContain } from "./utils/expectPlanetIdToContain";
import { expectAccountMoneyToBe } from "./utils/expectAccountMoneyToBe";
import { expectAccountDepositToBe } from "./utils/expectAccountDepositToBe";
/**
 * What it tests:
 *
 *  - Deposit is charged on starting game
 *  - Deposit is charged when you own a new planet
 *  - Deposit is released if you lose your planet to another player
 *  - Deposit is released on game end in the database and in the redux state
 */
test('Attack planet and conquer', function () { return __awaiter(_this, void 0, void 0, function () {
    var bigBoss, startGameWithPlanet, smallGuy, gameEndAction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jest.setTimeout(5 * 60 * 1000);
                return [4 /*yield*/, startFreshGame()];
            case 1:
                _a.sent();
                bigBoss = new VirtualClient();
                return [4 /*yield*/, bigBoss.init()];
            case 2:
                _a.sent();
                return [4 /*yield*/, bigBoss.createUser({ name: 'Big Boss' })];
            case 3:
                _a.sent();
                return [4 /*yield*/, expectAccountMoneyToBe(bigBoss, INITIAL_MONEY_IN_CENTS_FOR_FAKE_MONEY_ACCOUNTS)];
            case 4:
                _a.sent();
                return [4 /*yield*/, expectAccountDepositToBe(bigBoss, 0)];
            case 5:
                _a.sent();
                return [4 /*yield*/, bigBoss.connectToRoomServer()];
            case 6:
                _a.sent();
                startGameWithPlanet = namedPlanets.big;
                return [4 /*yield*/, bigBoss.loginRoomServer()];
            case 7:
                _a.sent();
                return [4 /*yield*/, expectPlayerMoneyToBe(bigBoss, 0)];
            case 8:
                _a.sent();
                return [4 /*yield*/, expectPlayerDepositToBe(bigBoss, 0)];
            case 9:
                _a.sent();
                // Start new game
                return [4 /*yield*/, bigBoss.startGameWithPlanetId(startGameWithPlanet.id)];
            case 10:
                // Start new game
                _a.sent();
                return [4 /*yield*/, expectPlayerMoneyToBe(bigBoss, DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME)];
            case 11:
                _a.sent();
                return [4 /*yield*/, expectPlayerDepositToBe(bigBoss, PLANET_MONEY_VALUE)];
            case 12:
                _a.sent();
                return [4 /*yield*/, expectPlanetIdToContain(bigBoss, startGameWithPlanet.id, {
                        units: startGameWithPlanet.capacity,
                        ownerId: bigBoss.getCurrentPlayerId(),
                        color: bigBoss.getCurrentPlayer().color,
                    })];
            case 13:
                _a.sent();
                return [4 /*yield*/, expectAccountMoneyToBe(bigBoss, INITIAL_MONEY_IN_CENTS_FOR_FAKE_MONEY_ACCOUNTS)];
            case 14:
                _a.sent();
                return [4 /*yield*/, expectAccountDepositToBe(bigBoss, DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME)];
            case 15:
                _a.sent();
                // Attack #1 against non player planet
                return [4 /*yield*/, bigBoss.sendShipAndWaitUntilArrives({
                        fromPlanetId: startGameWithPlanet.id,
                        toPlanetId: namedPlanets.smallRight.id,
                        units: 40,
                    })];
            case 16:
                // Attack #1 against non player planet
                _a.sent();
                return [4 /*yield*/, expectPlayerMoneyToBe(bigBoss, DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME)];
            case 17:
                _a.sent();
                return [4 /*yield*/, expectPlayerDepositToBe(bigBoss, PLANET_MONEY_VALUE * 2)];
            case 18:
                _a.sent();
                return [4 /*yield*/, expectPlanetIdToContain(bigBoss, namedPlanets.big.id, {
                        units: namedPlanets.big.capacity - 40,
                    })];
            case 19:
                _a.sent();
                return [4 /*yield*/, expectPlanetIdToContain(bigBoss, namedPlanets.smallRight.id, {
                        units: 20,
                        ownerId: bigBoss.getCurrentPlayerId(),
                        color: bigBoss.getCurrentPlayer().color,
                    })];
            case 20:
                _a.sent();
                // Attack #2 against non player planet
                // Needed to check that deposits are not duplicated per room/account
                return [4 /*yield*/, bigBoss.sendShipAndWaitUntilArrives({
                        fromPlanetId: startGameWithPlanet.id,
                        toPlanetId: namedPlanets.smallBottom.id,
                        units: 40,
                    })];
            case 21:
                // Attack #2 against non player planet
                // Needed to check that deposits are not duplicated per room/account
                _a.sent();
                return [4 /*yield*/, expectPlayerDepositToBe(bigBoss, PLANET_MONEY_VALUE * 3)];
            case 22:
                _a.sent();
                smallGuy = new VirtualClient();
                return [4 /*yield*/, smallGuy.init()];
            case 23:
                _a.sent();
                return [4 /*yield*/, smallGuy.createUser({ name: 'Small guy' })];
            case 24:
                _a.sent();
                return [4 /*yield*/, smallGuy.connectToRoomServer()];
            case 25:
                _a.sent();
                return [4 /*yield*/, smallGuy.loginRoomServer()];
            case 26:
                _a.sent();
                return [4 /*yield*/, smallGuy.startGameWithPlanetId(namedPlanets.smallLeft.id)];
            case 27:
                _a.sent();
                return [4 /*yield*/, expectPlayerMoneyToBe(smallGuy, DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME)];
            case 28:
                _a.sent();
                return [4 /*yield*/, expectPlayerDepositToBe(smallGuy, PLANET_MONEY_VALUE)];
            case 29:
                _a.sent();
                // Attack #3: To another player and kill his planet
                return [4 /*yield*/, bigBoss.sendShipAndWaitUntilArrives({
                        fromPlanetId: startGameWithPlanet.id,
                        toPlanetId: namedPlanets.smallLeft.id,
                        units: 40,
                    })];
            case 30:
                // Attack #3: To another player and kill his planet
                _a.sent();
                return [4 /*yield*/, expectPlayerMoneyToBe(bigBoss, DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME + PLANET_MONEY_VALUE)];
            case 31:
                _a.sent();
                return [4 /*yield*/, expectPlayerDepositToBe(bigBoss, PLANET_MONEY_VALUE * 4)];
            case 32:
                _a.sent();
                return [4 /*yield*/, expectPlayerMoneyToBe(smallGuy, DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME - PLANET_MONEY_VALUE)];
            case 33:
                _a.sent();
                return [4 /*yield*/, expectPlayerDepositToBe(smallGuy, 0)];
            case 34:
                _a.sent();
                gameEndAction = createSendClientToServerAction(SystemActions.gameEnd, null, roomApiSecretKey);
                bigBoss.dispatchAction(gameEndAction);
                return [4 /*yield*/, expectPlayerDepositToBe(bigBoss, 0)];
            case 35:
                _a.sent();
                return [4 /*yield*/, expectPlayerDepositToBe(smallGuy, 0)];
            case 36:
                _a.sent();
                return [4 /*yield*/, expectPlayerMoneyToBe(bigBoss, 0)];
            case 37:
                _a.sent();
                return [4 /*yield*/, expectPlayerMoneyToBe(smallGuy, 0)];
            case 38:
                _a.sent();
                return [4 /*yield*/, expectAccountMoneyToBe(bigBoss, INITIAL_MONEY_IN_CENTS_FOR_FAKE_MONEY_ACCOUNTS + PLANET_MONEY_VALUE)];
            case 39:
                _a.sent();
                return [4 /*yield*/, expectAccountDepositToBe(bigBoss, 0)];
            case 40:
                _a.sent();
                return [4 /*yield*/, expectAccountMoneyToBe(smallGuy, INITIAL_MONEY_IN_CENTS_FOR_FAKE_MONEY_ACCOUNTS - PLANET_MONEY_VALUE)];
            case 41:
                _a.sent();
                return [4 /*yield*/, expectAccountDepositToBe(smallGuy, 0)];
            case 42:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=attackPlanetAndConquer.test.js.map