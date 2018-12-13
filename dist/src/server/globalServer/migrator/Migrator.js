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
import * as _ from "lodash";
import { isNotNullOrUndefined } from "../../../utils/isNotNullOrUndefined";
var Migrator = /** @class */ (function () {
    function Migrator(props) {
        this.props = props;
    }
    Migrator.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var migrationProps, skipMigrationExecution, appMigrations, logs, successfullyAppliedMigrationIds, failedMigration, i, appMigration, error_1, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        migrationProps = this.props.getMigrationProps();
                        return [4 /*yield*/, this.props.hasPublicTables()];
                    case 1:
                        skipMigrationExecution = !(_c.sent());
                        return [4 /*yield*/, this.getPendingMigrations()];
                    case 2:
                        appMigrations = _c.sent();
                        logs = [];
                        successfullyAppliedMigrationIds = [];
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < appMigrations.length)) return [3 /*break*/, 10];
                        appMigration = appMigrations[i];
                        if (!!skipMigrationExecution) return [3 /*break*/, 7];
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, appMigration.up(migrationProps)];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _c.sent();
                        logs.push(new Date() + ("Error in migration \"" + appMigration.id + "\": " + error_1));
                        failedMigration = {
                            id: appMigration.id,
                            reason: "Error in migration \"" + appMigration.id + "\": " + error_1
                        };
                        return [3 /*break*/, 10];
                    case 7: return [4 /*yield*/, this.props.onMigrationApplied(appMigration.id)];
                    case 8:
                        _c.sent();
                        if (!skipMigrationExecution) {
                            successfullyAppliedMigrationIds.push(appMigration.id);
                        }
                        _c.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 3];
                    case 10:
                        _a = {
                            ok: !failedMigration
                        };
                        _b = {
                            skipMigrationExecution: skipMigrationExecution,
                            logs: logs,
                            successfullyAppliedMigrationIds: successfullyAppliedMigrationIds,
                            failedMigration: failedMigration
                        };
                        return [4 /*yield*/, this.getAllAppMigrationIds()];
                    case 11:
                        _b.allAppMigrationIds = _c.sent();
                        return [4 /*yield*/, this.getBeforeMigrationAppliedMigrationIds()];
                    case 12: return [2 /*return*/, (_a.data = (_b.beforeMigrationAppliedMigrationIds = _c.sent(),
                            _b),
                            _a)];
                }
            });
        });
    };
    Migrator.prototype.getAllAppMigrationIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.props.getAppMigrations().map(function (m) { return m.id; })];
            });
        });
    };
    Migrator.prototype.getBeforeMigrationAppliedMigrationIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.getAppliedMigrations()];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (m) { return m.id; })];
                }
            });
        });
    };
    Migrator.prototype.getPendingMigrationIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pendingMigrationIds, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = _).difference;
                        return [4 /*yield*/, this.getAllAppMigrationIds()];
                    case 1:
                        _c = [(_d.sent())];
                        return [4 /*yield*/, this.getBeforeMigrationAppliedMigrationIds()];
                    case 2:
                        pendingMigrationIds = _b.apply(_a, _c.concat([(_d.sent())]));
                        return [2 /*return*/, pendingMigrationIds.sort()];
                }
            });
        });
    };
    Migrator.prototype.getPendingMigrations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var appMigrations, pendingMigrationIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appMigrations = this.props.getAppMigrations();
                        return [4 /*yield*/, this.getPendingMigrationIds()];
                    case 1:
                        pendingMigrationIds = _a.sent();
                        return [2 /*return*/, pendingMigrationIds.map(function (migrationId) {
                                return _.find(appMigrations, { id: migrationId });
                            }).filter(isNotNullOrUndefined)];
                }
            });
        });
    };
    return Migrator;
}());
export { Migrator };
//# sourceMappingURL=Migrator.js.map