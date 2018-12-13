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
import generateUniqueId from "../../../utils/generateUniqueId";
import { globalApiSecretKey } from "../../serverSecrets";
import { Account_availableMoneyAmountInCents_gte0 } from "../databaseConstraints";
import { formatMoney } from "../../../utils/formatMoney";
/**
 * Moves money from available balance to the deposit balance for a certain game room.
 */
export var addDeposit = function (_a) {
    var sequelize = _a.sequelize, models = _a.models, req = _a.req;
    return function (input) { return __awaiter(_this, void 0, void 0, function () {
        var accountId, roomId, depositAmountInCents, notes, transactionSucceeded, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (input.secretKey !== globalApiSecretKey) {
                        return [2 /*return*/, { ok: false, err: "Secret key invalid" }];
                    }
                    accountId = input.accountId, roomId = input.roomId, depositAmountInCents = input.depositAmountInCents, notes = input.notes;
                    transactionSucceeded = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sequelize.transaction(function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                            var roomDeposit;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, models.MoneyTransaction.create({
                                            id: generateUniqueId(),
                                            amountInCents: depositAmountInCents,
                                            completed: true,
                                            createdAt: new Date(),
                                            updatedAt: new Date(),
                                            fromAccountId: accountId,
                                            toAccountId: accountId,
                                            direction: 'toRoom',
                                            roomId: roomId,
                                            notes: notes,
                                        }, { transaction: transaction })];
                                    case 1:
                                        _a.sent();
                                        // @ts-ignore
                                        return [4 /*yield*/, models.Account.update({
                                                // @ts-ignore
                                                availableMoneyAmountInCents: sequelize.literal("\"availableMoneyAmountInCents\" - " + depositAmountInCents),
                                                // @ts-ignore
                                                depositAmountInCents: sequelize.literal("\"depositAmountInCents\" + " + depositAmountInCents),
                                            }, { where: { id: accountId }, transaction: transaction })];
                                    case 2:
                                        // @ts-ignore
                                        _a.sent();
                                        return [4 /*yield*/, models.RoomDeposit.findOne({
                                                where: { accountId: accountId, roomId: roomId },
                                                transaction: transaction,
                                            })];
                                    case 3:
                                        roomDeposit = _a.sent();
                                        if (!roomDeposit) return [3 /*break*/, 5];
                                        return [4 /*yield*/, roomDeposit.update({
                                                depositAmountInCents: sequelize.literal("\"depositAmountInCents\" + " + depositAmountInCents),
                                                updatedAt: new Date(),
                                            }, { transaction: transaction })];
                                    case 4:
                                        _a.sent();
                                        return [3 /*break*/, 7];
                                    case 5: return [4 /*yield*/, models.RoomDeposit.create({
                                            id: generateUniqueId(),
                                            accountId: accountId,
                                            roomId: roomId,
                                            depositAmountInCents: depositAmountInCents,
                                            createdAt: new Date(),
                                            updatedAt: new Date(),
                                        }, { transaction: transaction })];
                                    case 6:
                                        _a.sent();
                                        _a.label = 7;
                                    case 7:
                                        transactionSucceeded = true;
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1.name === "SequelizeDatabaseError" && error_1.parent.constraint === Account_availableMoneyAmountInCents_gte0) {
                        return [2 /*return*/, {
                                ok: false,
                                err: "Not enough money in your account. You need to have at least " + formatMoney(depositAmountInCents, true) + ".",
                            }];
                    }
                    return [3 /*break*/, 4];
                case 4:
                    if (!transactionSucceeded) {
                        return [2 /*return*/, { ok: false, err: 'Unknown error while adding a deposit.' }];
                    }
                    return [2 /*return*/, { ok: true }];
            }
        });
    }); };
};
//# sourceMappingURL=addDeposit.js.map