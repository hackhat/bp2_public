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
import { GlobalUIActions } from "../actions/GlobalUIActions";
var initialState = {
    accountsById: {},
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === GlobalUIActions.addCurrentUserAndAccounts) {
        state = addAccounts(state, action.payload.accounts);
    }
    return state;
};
var addAccounts = function (state, accounts) {
    var accountsByIdCopy = __assign({}, state.accountsById);
    accounts.forEach(function (account) {
        accountsByIdCopy[account.id] = account;
    });
    return __assign({}, state, { accountsById: accountsByIdCopy });
};
export var getAccountById = function (state, accountId) {
    return state.accountsById[accountId];
};
export var getGameState = function (state) {
    return {
        accountsById: state.accountsById,
    };
};
export var setGameState = function (state, gameState) {
    return __assign({}, state, { accountsById: gameState.accountsById });
};
//# sourceMappingURL=accountsReducer.js.map