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
import * as _ from "lodash";
import { SystemActions } from "../actions/SystemActions";
import { RoomDepositActions } from "../actions/RoomDepositActions";
var initialState = {
    roomDepositsById: {},
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === SystemActions.setGameState) {
        state = setGameState(state, action.payload.gameState.roomDeposits);
    }
    else if (action.type === RoomDepositActions.updateRoomDeposits) {
        action.payload.roomDeposits.forEach(function (roomDeposit) {
            var _a;
            state = __assign({}, state, { roomDepositsById: __assign({}, state.roomDepositsById, (_a = {}, _a[roomDeposit.id] = roomDeposit, _a)) });
        });
    }
    else if (action.type === SystemActions.newGame) {
        // We delete all roomDeposits so they don't keep accumulating between each game
        state = __assign({}, state, { roomDepositsById: {} });
    }
    return state;
};
var addDepositToAccountIdAndRoomId = function (state, accountId, roomId, amountInCents) {
    var _a;
    var roomDeposit = getRoomDepositByAccountIdAndRoomId(state, accountId, roomId);
    if (roomDeposit) {
        roomDeposit = __assign({}, roomDeposit, { depositAmountInCents: roomDeposit.depositAmountInCents + amountInCents });
        state = __assign({}, state, { roomDepositsById: __assign({}, state.roomDepositsById, (_a = {}, _a[roomDeposit.id] = roomDeposit, _a)) });
    }
    return state;
};
export var getRoomDepositByAccountIdAndRoomId = function (state, accountId, roomId) {
    return _.find(state.roomDepositsById, { accountId: accountId, roomId: roomId });
};
export var getRoomDepositsById = function (state) {
    return state.roomDepositsById;
};
export var getGameState = function (state) {
    return {
        roomDepositsById: state.roomDepositsById,
    };
};
export var setGameState = function (state, gameState) {
    return __assign({}, state, { roomDepositsById: gameState.roomDepositsById });
};
//# sourceMappingURL=roomDepositsReducer.js.map