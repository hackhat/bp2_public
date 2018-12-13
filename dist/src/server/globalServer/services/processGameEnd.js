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
import { globalApiSecretKey } from "../../serverSecrets";
import * as Sequelize from "sequelize";
export var processGameEnd = function (_a) {
    var models = _a.models, req = _a.req, sequelize = _a.sequelize;
    return function (input) { return __awaiter(_this, void 0, void 0, function () {
        var roomId, players, totalDepositsRemoved_1, totalAvailableMoneyAdded_1, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (input.secretKey !== globalApiSecretKey) {
                        return [2 /*return*/, { ok: false, err: "Secret key invalid" }];
                    }
                    roomId = input.roomId, players = input.players;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    totalDepositsRemoved_1 = 0;
                    totalAvailableMoneyAdded_1 = 0;
                    // We need a transaction for all players because if the server goes down in the middle of this process
                    // might get inconsistent.
                    return [4 /*yield*/, sequelize.transaction(function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, players_1, player, roomDeposit, totalMoney;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _i = 0, players_1 = players;
                                        _a.label = 1;
                                    case 1:
                                        if (!(_i < players_1.length)) return [3 /*break*/, 6];
                                        player = players_1[_i];
                                        return [4 /*yield*/, models.RoomDeposit.findOne({
                                                where: {
                                                    roomId: roomId,
                                                    accountId: player.accountId,
                                                },
                                            })];
                                    case 2:
                                        roomDeposit = _a.sent();
                                        totalMoney = player.availableMoneyAmountInCents + player.depositAmountInCents;
                                        totalDepositsRemoved_1 += roomDeposit ? roomDeposit.depositAmountInCents : 0;
                                        totalAvailableMoneyAdded_1 += totalMoney;
                                        // @ts-ignore
                                        return [4 /*yield*/, models.Account.update({
                                                // @ts-ignore
                                                depositAmountInCents: Sequelize.literal("\"depositAmountInCents\" - " + (roomDeposit ? roomDeposit.depositAmountInCents : 0)),
                                                // @ts-ignore
                                                availableMoneyAmountInCents: Sequelize.literal("\"availableMoneyAmountInCents\" + " + totalMoney),
                                            }, { where: { id: player.accountId } })];
                                    case 3:
                                        // @ts-ignore
                                        _a.sent();
                                        return [4 /*yield*/, models.RoomDeposit.destroy({
                                                where: { accountId: player.accountId, roomId: roomId },
                                                transaction: transaction,
                                            })];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    // We need a transaction for all players because if the server goes down in the middle of this process
                    // might get inconsistent.
                    _a.sent();
                    console.log("processGameEnd");
                    console.log("totalDepositsRemoved", totalDepositsRemoved_1);
                    console.log("totalAvailableMoneyAdded", totalAvailableMoneyAdded_1);
                    console.log("totalMoneyDiff", totalAvailableMoneyAdded_1 + totalDepositsRemoved_1);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Processing game end had an error", error_1);
                    return [2 /*return*/, { ok: false, err: "Can't process game end: " + error_1 }];
                case 4: return [2 /*return*/, { ok: true }];
            }
        });
    }); };
};
//# sourceMappingURL=processGameEnd.js.map