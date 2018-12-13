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
import { selectors } from "../reducers";
import { createServerAction } from "../actions";
import { PlayerActions } from "../actions/PlayerActions";
import { SystemActions } from "../actions/SystemActions";
import { planetsUtils } from "../utils/planetsUtils";
import generateUniqueId from "../utils/generateUniqueId";
import { ShipActions } from "../actions/ShipActions";
import { selectRandomFromArray } from "../utils/selectRandomFromArray";
import * as _ from 'lodash';
import { PlanetActions } from "../actions/PlanetActions";
import { isProduction } from "../utils/isProduction";
import { globalServerClientInterface } from "../networking/globalServerClientInterface";
import { ms } from "../utils/ms";
import { getFirstAccountIdWithTypeFromList } from "../utils/getFirstAccountIdWithTypeFromList";
import planetToPoint from "../utils/planetToPoint";
import { getRandomPointOnCircumferenceWithError } from "../maps/utils/getRandomPointOnCircumferenceWithError";
import { UpgradeActions } from "../actions/UpgradeActions";
var debug = isProduction ? false : false;
var Bot = /** @class */ (function () {
    function Bot(props) {
        var _this = this;
        this.botState = undefined;
        this.life = 100000000;
        this.threatLevelByPlanetId = {};
        this.minTickInterval = Math.random() * 1000 + 100;
        this.tickInterval = Math.random() * 1000 + 1000;
        this.canPauseOrDie = Math.random() > 0.45;
        // Bot will slow down after this number of planets is reached. Will speed up if is under.
        this.slowDownAfterPlanets = Math.round(Math.random() * 50 + 10);
        this.isPaused = true;
        this.isDestroyed = false;
        this.failures = 0;
        // The key format is `${fromPlanetId},${toPlanetId}`
        this.shipRoutes = {};
        this.willRegisterWithEmail = Math.random() < 0.15;
        this.tick = function () { return __awaiter(_this, void 0, void 0, function () {
            var planetIdsToThreatLevel, updateThreatLevelsAction, state, players, botPlayer, player, planetsOwned, startGameWithPlanet, startGameAction, planets_1, myPlanets, tryCreateShipStream, shipRoute, shipStream, requestCreateStreamAction, actionsPerCycleLeft_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout = setTimeout(this.tick, this.tickInterval * Math.random() + 1000);
                        if (this.failures > 10000) {
                            console.log("More than 10000 failures, pausing");
                            this.pause();
                            return [2 /*return*/];
                        }
                        if (!this.canPauseOrDie) return [3 /*break*/, 2];
                        if (Math.random() > 0.99) {
                            this.destroy();
                        }
                        if (!(Math.random() > 0.99)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pauseAndResumeLater()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.sessionId === undefined) {
                            return [2 /*return*/];
                        }
                        if (this.isPaused) {
                            return [2 /*return*/];
                        }
                        if (debug && this.playerId) {
                            planetIdsToThreatLevel = this.getPlanetIdsToThreatLevelMap();
                            updateThreatLevelsAction = createServerAction(PlanetActions.debugSetThreatLevelsForBot, {
                                botId: this.playerId,
                                planetIdsToThreatLevel: planetIdsToThreatLevel,
                            });
                            this.dispatchServerAction(updateThreatLevelsAction);
                        }
                        state = this.getAppState();
                        players = selectors.players.getPlayersById(state);
                        botPlayer = this.playerId ? players[this.playerId] : undefined;
                        if (this.botState === undefined) {
                            if (this.isOnline()) {
                                this.botState = 'new';
                            }
                            else {
                                this.failures++;
                                if (this.accountId === undefined)
                                    return [2 /*return*/];
                                player = selectors.players.getPlayerWithAccountId(state, this.accountId);
                                this.playerId = player ? player.id : undefined;
                                this.loginRoom();
                            }
                        }
                        else if (this.botState === 'new') {
                            if (!this.playerId) {
                                return [2 /*return*/];
                            }
                            planetsOwned = selectors.planets.getPlanetsOwnedByPlayerId(state, this.playerId);
                            if (planetsOwned.length > 0) {
                                this.botState = 'playing';
                            }
                            else {
                                this.failures++;
                                startGameWithPlanet = selectors.planets.getRandomSpawnablePlanet(state);
                                if (startGameWithPlanet) {
                                    startGameAction = createServerAction(SystemActions.requestStartGameWith, {
                                        playerId: this.playerId,
                                        planetId: startGameWithPlanet.id,
                                    });
                                    this.dispatchServerAction(startGameAction);
                                }
                            }
                        }
                        else if (this.botState === 'playing') {
                            if (!this.playerId) {
                                return [2 /*return*/];
                            }
                            this.life--;
                            if (this.life < 0) {
                                return [2 /*return*/];
                            }
                            planets_1 = Object.values(selectors.planets.getPlanetsById(state))
                                .filter(function (planet) { return planet !== undefined; });
                            myPlanets = planets_1.filter(planetsUtils.isOwnedBy(this.playerId));
                            if (myPlanets.length === 0) {
                                this.botState = 'new';
                            }
                            if (myPlanets.length > this.slowDownAfterPlanets) {
                                this.tickInterval = this.tickInterval * 1.01;
                            }
                            else {
                                this.tickInterval = Math.max(this.tickInterval / 1.01, this.minTickInterval);
                            }
                            this.cleanThreatPlanetsNotOwned(myPlanets);
                            tryCreateShipStream = Math.random() > 0.95;
                            if (tryCreateShipStream) {
                                shipRoute = this.getBestShipStreamToCreateRoute();
                                if (shipRoute) {
                                    shipStream = {
                                        id: generateUniqueId(),
                                        fromPlanetId: shipRoute.fromPlanetId,
                                        toPlanetId: shipRoute.toPlanetId,
                                        temporary: true,
                                    };
                                    requestCreateStreamAction = createServerAction(ShipActions.requestCreateStream, {
                                        shipStream: shipStream
                                    });
                                    this.dispatchServerAction(requestCreateStreamAction);
                                }
                            }
                            actionsPerCycleLeft_1 = 3;
                            myPlanets.forEach(function (myPlanet) {
                                if (_this.playerId === undefined)
                                    return;
                                if (!myPlanet)
                                    return;
                                if (actionsPerCycleLeft_1 <= 0)
                                    return;
                                // Decrease threat level
                                _this.multiplyThreatToPlanet(myPlanet.id, 0.95);
                                var probabilityToUpgrade = myPlanet.unitsPerCycle <= 10 ? 0.95 : 0.1;
                                if (probabilityToUpgrade < Math.random()) {
                                    var upgradeAction = createServerAction(UpgradeActions.requestUpgrade, {
                                        planetId: myPlanet.id,
                                        upgradeDefinitionId: 'UPC001',
                                    });
                                    _this.dispatchServerAction(upgradeAction);
                                    actionsPerCycleLeft_1--;
                                }
                                var planetsInRange = planetsUtils.getPlanetsInRange(myPlanet, planets_1);
                                var enemyPlanets = planetsInRange.filter(planetsUtils.isNotOwnedBy(_this.playerId));
                                var minUnitsToKeep = Math.ceil(myPlanet.capacity * (0.3 + Math.random() * 0.6));
                                if (enemyPlanets.length > 0) {
                                    _this.addThreatToPlanet(myPlanet.id, 2);
                                }
                                var createPlanetProbability = enemyPlanets.length === 0 ? 0.1 : 0.01;
                                var shouldCreatePlanet = Math.random() < createPlanetProbability;
                                if (shouldCreatePlanet) {
                                    var newPlanetPosition = getRandomPointOnCircumferenceWithError(planetToPoint(myPlanet), myPlanet.range * 1.2, 0.2);
                                    var requestCreateOneAction = createServerAction(PlanetActions.requestCreateOne, {
                                        id: generateUniqueId(),
                                        playerId: _this.playerId,
                                        x: newPlanetPosition.x,
                                        y: newPlanetPosition.y,
                                    });
                                    _this.dispatchServerAction(requestCreateOneAction);
                                    actionsPerCycleLeft_1--;
                                    return;
                                }
                                var attackPlanet = _.sortBy(enemyPlanets, 'units')[0];
                                var sendToPlanet = attackPlanet;
                                var shouldAttack = Math.random() < 0.33;
                                if (attackPlanet && !shouldAttack || !attackPlanet) {
                                    // If nobody to attack, then check for support
                                    var percentFill = planetsUtils.getPercentageFilled(myPlanet);
                                    if (percentFill < 0.7) {
                                        return;
                                    }
                                    var shouldSupport = Math.random() < 0.45;
                                    // Sometimes send support
                                    if (shouldSupport) {
                                        var mostThreatenedPlanet = _this.getMostThreatenedPlanetInRange(myPlanet);
                                        if (!mostThreatenedPlanet) {
                                            // decrease threat
                                            _this.multiplyThreatToPlanet(myPlanet.id, 0.5);
                                            return;
                                        }
                                        sendToPlanet = mostThreatenedPlanet;
                                        var toPlanetThreatLevel = _this.getPlanetThreat(mostThreatenedPlanet.id);
                                        var myPlanetThreatLevel = _this.getPlanetThreat(myPlanet.id);
                                        if (toPlanetThreatLevel > myPlanetThreatLevel) {
                                            _this.addThreatToPlanet(myPlanet.id, 1);
                                        }
                                    }
                                    else {
                                        // Other times send to new territory
                                        var emptyPlanetsInRange = planetsInRange.filter(function (planet) { return !planet.ownerId; });
                                        sendToPlanet = selectRandomFromArray(emptyPlanetsInRange);
                                    }
                                }
                                if (!sendToPlanet) {
                                    return;
                                }
                                var unitsToSend = Math.round(myPlanet.units / 2);
                                if (myPlanet.units < minUnitsToKeep) {
                                    return;
                                }
                                if (unitsToSend < 1) {
                                    return;
                                }
                                if (myPlanet.units - unitsToSend < minUnitsToKeep) {
                                    return;
                                }
                                if (!botPlayer || !botPlayer.color) {
                                    return;
                                }
                                var requestSendPayload = {
                                    units: unitsToSend,
                                    toPlanetId: sendToPlanet.id,
                                    fromPlanetId: myPlanet.id,
                                    id: generateUniqueId(),
                                    ownerId: _this.playerId,
                                };
                                var canCreateShipInput = __assign({}, requestSendPayload, { ownerId: _this.playerId, authenticatedPlayerId: _this.playerId });
                                var canSendShip = selectors.advanced.canCreateShip(state, canCreateShipInput);
                                if (canSendShip.ok) {
                                    _this.addShipRoute({ fromPlanetId: requestSendPayload.fromPlanetId, toPlanetId: requestSendPayload.toPlanetId });
                                    var requestSendShipAction = createServerAction(ShipActions.requestSendShip, requestSendPayload);
                                    _this.dispatchServerAction(requestSendShipAction);
                                    actionsPerCycleLeft_1--;
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.clientId = generateUniqueId();
        this.email = props.email;
        this.password = props.password;
        this.botName = props.botName;
        this.getAppState = props.getStoreState;
        this.dispatchServerAction = function (action) {
            if (_this.clientId) {
                props.dispatchServerAction(action, _this.clientId);
            }
        };
    }
    Bot.prototype.getUserId = function () {
        return this.userId;
    };
    Bot.prototype.getPlayerId = function () {
        return this.playerId;
    };
    Bot.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 8]);
                        if (!this.willRegisterWithEmail) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loginOrRegisterWithEmail()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.createUserWithNameOnly()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        e_1 = _a.sent();
                        console.error("Error initializing bot, will try again soon:", e_1);
                        return [4 /*yield*/, ms(10000)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.init()];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.loginOrRegisterWithEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginRes, fakeMoneyAccountId, createUserRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, globalServerClientInterface('login', {
                            email: this.email,
                            password: this.password,
                        })];
                    case 1:
                        loginRes = _a.sent();
                        if (!loginRes.ok) return [3 /*break*/, 2];
                        this.sessionId = loginRes.payload.session.id;
                        this.userId = loginRes.payload.user.id;
                        fakeMoneyAccountId = getFirstAccountIdWithTypeFromList(loginRes.payload.accounts, 'fakeMoney');
                        this.accountId = fakeMoneyAccountId;
                        this.botName = loginRes.payload.user.name;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.createUser({
                            name: this.botName,
                            email: this.email,
                            password: this.password,
                        })];
                    case 3:
                        createUserRes = _a.sent();
                        if (!createUserRes.ok) {
                            throw new Error("Can't create user: " + createUserRes.reason);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.createUserWithNameOnly = function () {
        return __awaiter(this, void 0, void 0, function () {
            var createUserRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createUser({ name: this.botName })];
                    case 1:
                        createUserRes = _a.sent();
                        return [2 /*return*/, createUserRes];
                }
            });
        });
    };
    Bot.prototype.createUser = function (updateUser) {
        return __awaiter(this, void 0, void 0, function () {
            var createUserRes, updateUserRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, globalServerClientInterface('createUser', { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36" })];
                    case 1:
                        createUserRes = _a.sent();
                        if (!createUserRes.ok) {
                            return [2 /*return*/, createUserRes];
                        }
                        this.sessionId = createUserRes.payload.session.id;
                        this.accountId = getFirstAccountIdWithTypeFromList(createUserRes.payload.accounts, 'fakeMoney');
                        if (!this.sessionId) {
                            return [2 /*return*/, { err: 'no session id' }];
                        }
                        if (!this.accountId) {
                            return [2 /*return*/, { err: 'no account id' }];
                        }
                        this.userId = createUserRes.payload.user.id;
                        return [4 /*yield*/, globalServerClientInterface('updateUser', {
                                sessionId: this.sessionId,
                                updateUser: updateUser,
                            })];
                    case 2:
                        updateUserRes = _a.sent();
                        return [2 /*return*/, updateUserRes];
                }
            });
        });
    };
    Bot.prototype.isActive = function () {
        return !this.isPaused;
    };
    Bot.prototype.pause = function () {
        if (this.isDestroyed)
            return;
        if (this.isPaused)
            return;
        this.isPaused = true;
        this.botState = undefined;
        this.exitRoom();
        clearTimeout(this.timeout);
    };
    Bot.prototype.pauseAndResumeLater = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pause();
                        return [4 /*yield*/, ms(Math.random() * 60 * 3 * 1000)];
                    case 1:
                        _a.sent();
                        this.resume();
                        return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.resume = function () {
        if (this.isDestroyed)
            return;
        if (!this.isPaused)
            return;
        this.isPaused = false;
        this.botState = undefined;
        this.failures = 0;
        this.loginRoom();
        this.tick();
    };
    Bot.prototype.getIsDestroyed = function () {
        return this.isDestroyed;
    };
    Bot.prototype.getIsPaused = function () {
        return this.isPaused;
    };
    Bot.prototype.destroy = function () {
        if (this.isDestroyed)
            return;
        clearTimeout(this.timeout);
        this.exitRoom();
        this.isDestroyed = true;
        this.isPaused = true;
        console.log("Bot destroyed");
    };
    Bot.prototype.exitRoom = function () {
        if (!this.playerId) {
            return;
        }
        var exitRoomAction = createServerAction(PlayerActions.exitRoom, {
            playerId: this.playerId,
        });
        this.dispatchServerAction(exitRoomAction);
    };
    Bot.prototype.loginRoom = function () {
        if (!this.sessionId || !this.clientId || !this.accountId) {
            return;
        }
        var loginRoomAction = createServerAction(PlayerActions.requestRoomLogin, {
            sessionId: this.sessionId,
            clientId: this.clientId,
            accountId: this.accountId,
        });
        this.dispatchServerAction(loginRoomAction);
    };
    Bot.prototype.addThreatToPlanet = function (planetId, threatDelta) {
        this.setThreatToPlanet(planetId, this.getPlanetThreat(planetId) + threatDelta);
    };
    Bot.prototype.multiplyThreatToPlanet = function (planetId, threatMultiplier) {
        this.setThreatToPlanet(planetId, this.getPlanetThreat(planetId) * threatMultiplier);
    };
    Bot.prototype.setThreatToPlanet = function (planetId, threatLevel) {
        this.threatLevelByPlanetId[planetId] = Math.round(threatLevel * 10000) / 10000;
        if (this.threatLevelByPlanetId[planetId] < 0.01) {
            this.threatLevelByPlanetId[planetId] = 0;
        }
    };
    /**
     * Remove threat level from planets not owned,
     * @param myPlanets
     */
    Bot.prototype.cleanThreatPlanetsNotOwned = function (myPlanets) {
        var _this = this;
        Object.keys(this.threatLevelByPlanetId).forEach(function (planetId) {
            var isStillAlive = _.find(myPlanets, { id: planetId });
            if (!isStillAlive) {
                delete _this.threatLevelByPlanetId[planetId];
            }
        });
    };
    Bot.prototype.getPlanetThreat = function (planetId) {
        return this.threatLevelByPlanetId[planetId] || 0;
    };
    Bot.prototype.getPlanetIdsToThreatLevelMap = function () {
        var _this = this;
        var planetsById = this.getPlanetsById();
        var planets = Object.values(planetsById).filter(function (planet) { return planet !== undefined; });
        var planetsIdWithThreat = {};
        planets.forEach(function (planet) {
            planetsIdWithThreat[planet.id] = _this.getPlanetThreat(planet.id);
        });
        return planetsIdWithThreat;
    };
    Bot.prototype.getMostThreatenedPlanetInRange = function (planet) {
        var _this = this;
        if (this.playerId === undefined) {
            return;
        }
        var planetsById = this.getPlanetsById();
        var planets = Object.values(planetsById).filter(function (planet) { return planet !== undefined; });
        var planetsInRange = planetsUtils.getPlanetsInRange(planet, planets);
        var myPlanetsInRange = planetsInRange.filter(planetsUtils.isOwnedBy(this.playerId));
        var hasThreat = function (_a) {
            var threatLevel = _a.threatLevel;
            return threatLevel > 0;
        };
        var planetsIdWithThreat = myPlanetsInRange.map(function (planet) {
            return {
                threatLevel: _this.getPlanetThreat(planet.id),
                planetId: planet.id,
            };
        }).filter(hasThreat);
        var sortedPlanetsIdWithThreat = _.sortBy(planetsIdWithThreat, 'threatLevel').reverse();
        if (sortedPlanetsIdWithThreat[0]) {
            return planetsById[sortedPlanetsIdWithThreat[0].planetId];
        }
        return undefined;
    };
    Bot.prototype.getPlanetsById = function () {
        var state = this.getAppState();
        var planetsById = selectors.planets.getPlanetsById(state);
        return planetsById;
    };
    Bot.prototype.isOnline = function () {
        if (this.playerId === undefined)
            return false;
        return selectors.players.isPlayerIdOnline(this.getAppState(), this.playerId);
    };
    Bot.prototype.addShipRoute = function (shipRoute) {
        var id = shipRoute.fromPlanetId + "," + shipRoute.toPlanetId;
        if (!this.shipRoutes[id]) {
            this.shipRoutes[id] = 0;
        }
        this.shipRoutes[id]++;
    };
    Bot.prototype.getBestShipStreamToCreateRoute = function () {
        var _this = this;
        var shipStreams = Object.values(selectors.ships.getShipStreams(this.getAppState(), { includeTemporary: true }));
        var planetsById = this.getPlanetsById();
        var possibleShipStreams = [];
        Object.keys(this.shipRoutes).forEach(function (key) {
            var timesUsed = _this.shipRoutes[key];
            if (timesUsed < 5)
                return;
            var _a = key.split(","), fromPlanetId = _a[0], toPlanetId = _a[1];
            var fromPlanet = planetsById[fromPlanetId];
            if (!fromPlanet)
                return;
            if (fromPlanet.ownerId !== _this.playerId)
                return;
            var shipStreamsForTheRoute = shipStreams.filter(function (shipStream) {
                return shipStream && shipStream.fromPlanetId === fromPlanetId && shipStream.toPlanetId === toPlanetId;
            });
            if (shipStreamsForTheRoute.length > 0)
                return;
            possibleShipStreams.push({ fromPlanetId: fromPlanetId, toPlanetId: toPlanetId });
        });
        return selectRandomFromArray(possibleShipStreams);
    };
    return Bot;
}());
export { Bot };
//# sourceMappingURL=Bot.js.map