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
import * as ipCountry from 'ip-country';
import { convertUserForClientSidePrivate } from "../utils/convertUserForClientSidePrivate";
import { INITIAL_MONEY_IN_CENTS_FOR_FAKE_MONEY_ACCOUNTS } from "../../../constants/constants";
export var createUser = function (_a) {
    var models = _a.models, req = _a.req;
    return function (input) { return __awaiter(_this, void 0, void 0, function () {
        var userAgent, ipAddress, countryCode, user, session, fakeMoneyAccount, accountsToUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userAgent = input.userAgent;
                    ipAddress = req.connection.remoteAddress;
                    countryCode = ipCountry.country(ipAddress);
                    return [4 /*yield*/, models.User.create({
                            id: generateUniqueId(),
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            createdFromIpAddress: ipAddress,
                            countryCode: countryCode,
                        })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, models.Session.create({
                            id: generateUniqueId(),
                            userId: user.id,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            ipAddress: ipAddress,
                            userAgent: userAgent,
                        })];
                case 2:
                    session = _a.sent();
                    return [4 /*yield*/, models.Account.create({
                            id: generateUniqueId(),
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            availableMoneyAmountInCents: INITIAL_MONEY_IN_CENTS_FOR_FAKE_MONEY_ACCOUNTS,
                            depositAmountInCents: 0,
                            accountType: 'fakeMoney',
                        })];
                case 3:
                    fakeMoneyAccount = _a.sent();
                    return [4 /*yield*/, user.addAccounts([fakeMoneyAccount.id])];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, models.AccountToUser.find({
                            where: {
                                userId: user.id,
                                accountId: fakeMoneyAccount.id,
                            }
                        })];
                case 5:
                    accountsToUsers = _a.sent();
                    return [2 /*return*/, {
                            ok: true,
                            payload: {
                                user: convertUserForClientSidePrivate(user),
                                accounts: [fakeMoneyAccount],
                                accountsToUsers: accountsToUsers,
                                session: session,
                            }
                        }];
            }
        });
    }); };
};
//# sourceMappingURL=createUser.js.map