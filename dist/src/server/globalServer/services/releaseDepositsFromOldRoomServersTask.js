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
import { ms } from "../../../utils/ms";
import * as moment from "moment";
import { ROOM_SERVER_IS_CONSIDERED_DOWN_AFTER_X_MINUTES } from "../../../constants/constants";
import { Op } from "sequelize";
import * as Sequelize from "sequelize";
export var releaseDepositsFromOldRoomServersTask = function (_a) {
    var sequelize = _a.sequelize, models = _a.models, req = _a.req;
    return function (input) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, oldRoomServers, _loop_1, _i, oldRoomServers_1, oldRoomServer, error_1;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!true) return [3 /*break*/, 10];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 8, , 9]);
                            return [4 /*yield*/, models.RoomServer.findAll({
                                    where: {
                                        lastPing: (_a = {}, _a[Op.lte] = moment().subtract(ROOM_SERVER_IS_CONSIDERED_DOWN_AFTER_X_MINUTES, 'minutes').toDate(), _a),
                                    },
                                    limit: 10,
                                })];
                        case 2:
                            oldRoomServers = _b.sent();
                            _loop_1 = function (oldRoomServer) {
                                var _a, roomDeposits;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, models.RoomDeposit.findAll({
                                                where: {
                                                    roomId: oldRoomServer.id,
                                                    depositAmountInCents: (_a = {},
                                                        _a[Op.gt] = 0,
                                                        _a)
                                                },
                                            })];
                                        case 1:
                                            roomDeposits = _b.sent();
                                            return [4 /*yield*/, sequelize.transaction(function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                                                    var _i, roomDeposits_1, roomDeposit;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, models.RoomServer.destroy({
                                                                    where: { id: oldRoomServer.id },
                                                                    transaction: transaction,
                                                                })];
                                                            case 1:
                                                                _a.sent();
                                                                _i = 0, roomDeposits_1 = roomDeposits;
                                                                _a.label = 2;
                                                            case 2:
                                                                if (!(_i < roomDeposits_1.length)) return [3 /*break*/, 6];
                                                                roomDeposit = roomDeposits_1[_i];
                                                                // @ts-ignore
                                                                return [4 /*yield*/, models.Account.update({
                                                                        // @ts-ignore
                                                                        availableMoneyAmountInCents: Sequelize.literal("\"availableMoneyAmountInCents\" + " + roomDeposit.depositAmountInCents),
                                                                        // @ts-ignore
                                                                        depositAmountInCents: Sequelize.literal("\"depositAmountInCents\" - " + roomDeposit.depositAmountInCents)
                                                                    }, {
                                                                        where: { id: roomDeposit.accountId },
                                                                        transaction: transaction,
                                                                    })];
                                                            case 3:
                                                                // @ts-ignore
                                                                _a.sent();
                                                                return [4 /*yield*/, models.RoomDeposit.destroy({
                                                                        where: { id: roomDeposit.id },
                                                                        transaction: transaction,
                                                                    })];
                                                            case 4:
                                                                _a.sent();
                                                                _a.label = 5;
                                                            case 5:
                                                                _i++;
                                                                return [3 /*break*/, 2];
                                                            case 6: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 2:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            _i = 0, oldRoomServers_1 = oldRoomServers;
                            _b.label = 3;
                        case 3:
                            if (!(_i < oldRoomServers_1.length)) return [3 /*break*/, 6];
                            oldRoomServer = oldRoomServers_1[_i];
                            return [5 /*yield**/, _loop_1(oldRoomServer)];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [4 /*yield*/, ms(30 * 1000)];
                        case 7:
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            error_1 = _b.sent();
                            console.log("Error in releaseDepositsFromOldRoomServersTask,", error_1);
                            return [3 /*break*/, 9];
                        case 9: return [3 /*break*/, 0];
                        case 10: return [2 /*return*/];
                    }
                });
            }); }, 1);
            return [2 /*return*/, {
                    ok: true,
                    payload: null
                }];
        });
    }); };
};
//# sourceMappingURL=releaseDepositsFromOldRoomServersTask.js.map