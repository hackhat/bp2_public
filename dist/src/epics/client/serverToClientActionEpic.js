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
import { SystemActions } from "../../actions/SystemActions";
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { createAppAction, createSendClientToServerAction } from "../../actions";
import { selectors } from "../../reducers";
import { ofType } from "../utils/ofType";
import { roomMapping } from "../../config";
import { PlayerActions } from "../../actions/PlayerActions";
export var serverToClientActionEpic = function (api, store) { return function (action$, state$) {
    var disconnect$ = action$.pipe(ofType(SystemActions.disconnect));
    var serverToClientAction$ = action$.pipe(ofType(SystemActions.requestConnectToRoom), mergeMap(function (action) {
        var code = function (observer) { return __awaiter(_this, void 0, void 0, function () {
            var clientId, port, connectToRoomAction, requestLoginRoomAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clientId = selectors.ui.global.getCurrentClientId(state$.value);
                        if (!clientId)
                            throw new Error("No client id found");
                        return [4 /*yield*/, api.disconnect()];
                    case 1:
                        _a.sent();
                        api.getServerAction$().subscribe(function (actions) {
                            store.dispatch(actions);
                        });
                        port = roomMapping[action.payload.roomId];
                        if (!port) {
                            return [2 /*return*/, console.error("No port found for room id " + action.payload.roomId + ".")];
                        }
                        return [4 /*yield*/, api.connect(clientId, port, action.payload.roomId)];
                    case 2:
                        _a.sent();
                        connectToRoomAction = createAppAction(SystemActions.connectedToRoom, null);
                        observer.next(connectToRoomAction);
                        requestLoginRoomAction = createSendClientToServerAction(PlayerActions.requestRoomLogin, {
                            clientId: clientId,
                            sessionId: action.payload.sessionId,
                            accountId: action.payload.accountId,
                        });
                        observer.next(requestLoginRoomAction);
                        return [2 /*return*/];
                }
            });
        }); };
        return new Observable(function (observer) {
            code(observer).then(function () {
                // do nothing
            });
            return function () {
                return api.disconnect();
            };
        }).pipe(takeUntil(disconnect$));
    }));
    return merge(serverToClientAction$);
}; };
//# sourceMappingURL=serverToClientActionEpic.js.map