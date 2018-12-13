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
import * as Sequelize from "sequelize";
import { Account_availableMoneyAmountInCents_gte0 } from "./databaseConstraints";
/**
 * These models should be the fresh ones.
 */
export var createModels = function (_a) {
    var sequelize = _a.sequelize;
    return __awaiter(_this, void 0, void 0, function () {
        var _b, _c, UserModel, SessionModel, AccountModel, AccountToUserModel, MoneyTransactionModel, RoomServerModel, RoomDepositModel, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("Creating models...");
                    UserModel = sequelize.define('user', {
                        id: {
                            type: Sequelize.STRING,
                            primaryKey: true,
                        },
                        name: {
                            type: Sequelize.STRING,
                        },
                        email: {
                            type: Sequelize.STRING,
                            unique: true,
                        },
                        hashedPassword: {
                            type: Sequelize.STRING,
                        },
                        createdFromIpAddress: {
                            type: Sequelize.STRING,
                        },
                        countryCode: {
                            type: Sequelize.STRING,
                        },
                        createdAt: {
                            type: Sequelize.DATE,
                        },
                        updatedAt: {
                            type: Sequelize.DATE,
                        },
                    });
                    SessionModel = sequelize.define('session', {
                        id: {
                            type: Sequelize.STRING,
                            primaryKey: true,
                        },
                        userId: {
                            type: Sequelize.STRING,
                        },
                        ipAddress: {
                            type: Sequelize.STRING,
                        },
                        userAgent: {
                            type: Sequelize.STRING,
                        },
                        createdAt: {
                            type: Sequelize.DATE,
                        },
                        updatedAt: {
                            type: Sequelize.DATE,
                        },
                    });
                    AccountModel = sequelize.define('account', {
                        id: {
                            type: Sequelize.STRING,
                            primaryKey: true,
                        },
                        availableMoneyAmountInCents: {
                            type: Sequelize.INTEGER,
                        },
                        depositAmountInCents: {
                            type: Sequelize.INTEGER,
                        },
                        accountType: {
                            type: Sequelize.ENUM('realMoney', 'fakeMoney'),
                        },
                        createdAt: {
                            type: Sequelize.DATE,
                        },
                        updatedAt: {
                            type: Sequelize.DATE,
                        },
                    });
                    AccountToUserModel = sequelize.define('accountToUser', {
                        accountId: {
                            type: Sequelize.STRING,
                        },
                        userId: {
                            type: Sequelize.STRING,
                        },
                    });
                    UserModel.belongsToMany(AccountModel, {
                        through: AccountToUserModel,
                        as: 'Accounts',
                        foreignKey: 'userId'
                    });
                    AccountModel.belongsToMany(UserModel, {
                        through: AccountToUserModel,
                        as: 'Users',
                        foreignKey: 'accountId'
                    });
                    MoneyTransactionModel = sequelize.define('moneyTransaction', {
                        id: {
                            type: Sequelize.STRING,
                            primaryKey: true,
                        },
                        amountInCents: {
                            type: Sequelize.INTEGER,
                        },
                        completed: {
                            type: Sequelize.BOOLEAN,
                        },
                        fromAccountId: {
                            type: Sequelize.STRING,
                        },
                        toAccountId: {
                            type: Sequelize.STRING,
                        },
                        roomId: {
                            type: Sequelize.STRING,
                        },
                        direction: {
                            type: Sequelize.STRING,
                        },
                        notes: {
                            type: Sequelize.STRING,
                        },
                        createdAt: {
                            type: Sequelize.DATE,
                        },
                        updatedAt: {
                            type: Sequelize.DATE,
                        },
                    });
                    RoomServerModel = sequelize.define('roomServer', {
                        id: {
                            type: Sequelize.STRING,
                            primaryKey: true,
                        },
                        roomType: {
                            type: Sequelize.ENUM('realMoney', 'fakeMoney'),
                        },
                        lastPing: {
                            type: Sequelize.DATE,
                        },
                        createdAt: {
                            type: Sequelize.DATE,
                        },
                        updatedAt: {
                            type: Sequelize.DATE,
                        },
                    });
                    RoomDepositModel = sequelize.define('roomDeposit', {
                        id: {
                            type: Sequelize.STRING,
                            primaryKey: true,
                        },
                        accountId: {
                            type: Sequelize.STRING,
                        },
                        roomId: {
                            type: Sequelize.STRING,
                        },
                        depositAmountInCents: {
                            type: Sequelize.INTEGER,
                        },
                        createdAt: {
                            type: Sequelize.DATE,
                        },
                        updatedAt: {
                            type: Sequelize.DATE,
                        },
                    });
                    return [4 /*yield*/, sequelize.sync()];
                case 1:
                    _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, sequelize.getQueryInterface().addConstraint('public.accounts', ['availableMoneyAmountInCents'], {
                            type: 'check',
                            name: Account_availableMoneyAmountInCents_gte0,
                            where: {
                                availableMoneyAmountInCents: (_b = {},
                                    _b[Sequelize.Op.gte] = 0,
                                    _b),
                            }
                        })];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, sequelize.getQueryInterface().addConstraint('public.accounts', ['depositAmountInCents'], {
                            type: 'check',
                            name: 'Account_depositAmountInCents_gte0',
                            where: {
                                depositAmountInCents: (_c = {},
                                    _c[Sequelize.Op.gte] = 0,
                                    _c),
                            }
                        })];
                case 4:
                    _d.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _d.sent();
                    return [3 /*break*/, 6];
                case 6:
                    console.log("Models created.");
                    return [2 /*return*/, {
                            User: UserModel,
                            Session: SessionModel,
                            MoneyTransaction: MoneyTransactionModel,
                            Account: AccountModel,
                            AccountToUser: AccountToUserModel,
                            RoomServer: RoomServerModel,
                            RoomDeposit: RoomDepositModel,
                        }];
            }
        });
    });
};
//# sourceMappingURL=createModels.js.map