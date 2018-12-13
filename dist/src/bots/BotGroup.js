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
import { Bot } from "./Bot";
import { selectRandomFromArray } from "../utils/selectRandomFromArray";
import * as crypto from 'crypto';
import { botNameList } from "./botNameList";
import { isProduction } from "../utils/isProduction";
var RANDOM = isProduction ? true : false;
var getXRandomNames = function (x) {
    var outputNames = [];
    var life = 1000;
    while (life > 0 && outputNames.length < x) {
        life--;
        var botName = selectRandomFromArray(botNameList);
        if (botName === undefined) {
            continue;
        }
        if (!outputNames.includes(botName)) {
            outputNames.push(botName);
        }
    }
    return outputNames;
};
var BotGroup = /** @class */ (function () {
    function BotGroup(props) {
        var _this = this;
        this.bots = [];
        this.isActive = false;
        this.tick = function () { return __awaiter(_this, void 0, void 0, function () {
            var randomAliveBot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!RANDOM)
                            return [2 /*return*/];
                        if (!this.isActive)
                            return [2 /*return*/];
                        if (!(Math.random() > 0.8 && this.getAliveBots().length < this.maxBots)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.addBots(1)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (Math.random() > 0.75) {
                            randomAliveBot = selectRandomFromArray(this.getAliveBots());
                            if (randomAliveBot) {
                                randomAliveBot.resume();
                            }
                        }
                        this.timeout = setTimeout(this.tick, Math.random() * 5 * 1000);
                        return [2 /*return*/];
                }
            });
        }); };
        this.maxBots = props.maxBots;
        this.defaultBotProps = props.defaultBotProps;
    }
    BotGroup.prototype.addBots = function (numberOfBots) {
        return __awaiter(this, void 0, void 0, function () {
            var botNames, botsInitializations;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        botNames = getXRandomNames(numberOfBots);
                        console.log("Adding bots", botNames);
                        botsInitializations = botNames.map(function (botName) { return __awaiter(_this, void 0, void 0, function () {
                            var bot;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        bot = new Bot(__assign({}, this.defaultBotProps, { botName: botName, email: crypto.createHash('md5').update(botName + '-email').digest('hex'), password: crypto.createHash('md5').update(botName + '-password').digest('hex') }));
                                        return [4 /*yield*/, bot.init()];
                                    case 1:
                                        _a.sent();
                                        this.bots.push(bot);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(botsInitializations)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BotGroup.prototype.pause = function () {
        if (!this.isActive) {
            return;
        }
        this.isActive = false;
        this.getAliveBots().forEach(function (bot) { return bot.pause(); });
        this.timeout !== undefined && clearTimeout(this.timeout);
    };
    BotGroup.prototype.getAliveBots = function () {
        return this.bots.filter(function (bot) { return !bot.getIsDestroyed(); });
    };
    BotGroup.prototype.resume = function () {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        if (RANDOM) {
            this.resumeSomeBots();
        }
        else {
            this.resumeAllBots();
        }
        this.tick();
    };
    BotGroup.prototype.resumeSomeBots = function () {
        this.isActive = true;
        this.getAliveBots().forEach(function (bot) {
            if (Math.random() > 0.5) {
                console.log(">bot resume", bot.getUserId());
                bot.resume();
            }
        });
    };
    BotGroup.prototype.resumeAllBots = function () {
        this.isActive = true;
        this.getAliveBots().forEach(function (bot) {
            console.log(">bot resume", bot.getUserId());
            bot.resume();
        });
    };
    BotGroup.prototype.destroy = function () {
        this.bots.forEach(function (bot) { return bot.destroy(); });
        this.bots = [];
        if (this.timeout !== undefined) {
            clearTimeout(this.timeout);
        }
    };
    BotGroup.prototype.getPlayerIds = function () {
        return this.bots.map(function (bot) { return bot.getPlayerId(); });
    };
    return BotGroup;
}());
export { BotGroup };
//# sourceMappingURL=BotGroup.js.map