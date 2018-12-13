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
import * as Sequelize from 'sequelize';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { createServices } from "./createServices";
import { GLOBAL_SERVER_PORT } from "../../config";
import { isProduction } from "../../utils/isProduction";
import { SequelizeMigrator } from "./migrator/SequelizeMigrator";
import { createModels } from "./createModels";
import { globalServerClientInterface } from "../../networking/globalServerClientInterface";
import { getAppVersion } from "../../utils/getAppVersion";
var databaseConfigs = {
    local: {
        host: 'localhost',
        name: 'bitplanets_dev7',
        username: 'bitplanets_app_dev',
        password: 'asd2rf4f2e23f23f23f',
        port: 5432,
    },
    dev: {
        host: 'bitplanets.c2xqrg2kyde6.eu-west-2.rds.amazonaws.com',
        name: 'bitplanets',
        username: 'bitplanets',
        password: 'asdjk23o12AKJK2j1l31',
        port: 5432,
    }
};
var databaseConfigName = isProduction ? 'dev' : 'local';
var GlobalServer = /** @class */ (function () {
    function GlobalServer() {
    }
    GlobalServer.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var migrationRes, sequelize, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Starting GlobalServer");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.initDatabaseConnection()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.resolveMigrations()];
                    case 3:
                        migrationRes = _b.sent();
                        if (!migrationRes.ok) {
                            throw new Error("Error during migration");
                        }
                        sequelize = this.sequelize;
                        if (!sequelize) {
                            throw new Error("sequelize not defined");
                        }
                        _a = this;
                        return [4 /*yield*/, createModels({ sequelize: sequelize })];
                    case 4:
                        _a.models = _b.sent();
                        return [4 /*yield*/, this.initServer()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.initTasks()];
                    case 6:
                        _b.sent();
                        console.log("GlobalServer started");
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _b.sent();
                        console.error("Can't init GlobalServer", e_1);
                        throw new Error("Error starting");
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    GlobalServer.prototype.kill = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = new Promise(function (resolve) {
                            if (_this.server) {
                                _this.server.close(function () {
                                    console.log("Closing server");
                                    resolve();
                                });
                                _this.server = undefined;
                            }
                            else {
                                resolve();
                            }
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalServer.prototype.initTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, globalServerClientInterface('releaseDepositsFromOldRoomServersTask', {})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalServer.prototype.initDatabaseConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var retriesLeft, databaseConfig, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        retriesLeft = 10000;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 6]);
                        console.log("Trying to connect to the database...");
                        databaseConfig = databaseConfigs[databaseConfigName];
                        this.sequelize = new Sequelize(databaseConfig.name, databaseConfig.username, databaseConfig.password, {
                            host: databaseConfig.host,
                            port: databaseConfig.port,
                            dialect: 'postgres',
                            operatorsAliases: false,
                            pool: {
                                max: 50,
                                min: 0,
                                acquire: 30000,
                                idle: 10000
                            },
                            logging: false,
                        });
                        return [4 /*yield*/, this.sequelize.authenticate()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error trying to connect to the database", error_1);
                        retriesLeft--;
                        if (!(retriesLeft > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.initDatabaseConnection()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    GlobalServer.prototype.resolveMigrations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var props, migrator, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Running migrations...");
                        if (!this.sequelize) {
                            throw new Error("Sequelize is required");
                        }
                        props = {
                            sequelize: this.sequelize,
                        };
                        migrator = new SequelizeMigrator(props);
                        return [4 /*yield*/, migrator.run()];
                    case 1:
                        res = _a.sent();
                        console.log("Migration result", res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    GlobalServer.prototype.initServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Starting web server interface...");
                        promise = new Promise(function (resolve, reject) {
                            try {
                                if (!_this.models) {
                                    throw new Error("Models are not ready yet.");
                                }
                                if (!_this.sequelize) {
                                    throw new Error("sequelize are not ready yet.");
                                }
                                var app = express();
                                _this.app = app;
                                app.enable('trust proxy');
                                app.use(function (req, res, next) {
                                    // Website you wish to allow to requestConnectToRoom
                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                    // Request methods you wish to allow
                                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                                    // Request headers you wish to allow
                                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                                    next();
                                });
                                app.get('/', function (req, res) {
                                    res.setHeader('Content-Type', 'application/json');
                                    var info = {
                                        serverType: 'GlobalServer',
                                        version: getAppVersion(),
                                        isProductionBuild: isProduction,
                                    };
                                    res.send(JSON.stringify(info, null, '  '));
                                });
                                app.get('/info.json', function (req, res) {
                                    res.json({ ok: true });
                                }); // for parsing application/json
                                app.use(bodyParser.json()); // for parsing application/json
                                app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
                                createServices(app, _this.models, _this.sequelize);
                                _this.server = app.listen(GLOBAL_SERVER_PORT, function () {
                                    console.log("Global Server: Web server interface started on port " + GLOBAL_SERVER_PORT);
                                    resolve();
                                });
                            }
                            catch (e) {
                                console.log("Web server interface failed", e);
                                reject("Can't start server" + e);
                            }
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return GlobalServer;
}());
export { GlobalServer };
//# sourceMappingURL=GlobalServer.js.map