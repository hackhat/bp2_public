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
import { UserActions } from "../actions/UserActions";
import { GlobalUIActions } from "../actions/GlobalUIActions";
var initialState = {
    usersById: {},
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var _a, _b;
    if (action.type === GlobalUIActions.addCurrentUserAndAccounts) {
        var user = action.payload.user;
        state = __assign({}, state, { usersById: __assign({}, state.usersById, (_a = {}, _a[user.id] = user, _a)) });
    }
    else if (action.type === UserActions.addCurrentUser) {
        var user = action.payload.user;
        state = __assign({}, state, { usersById: __assign({}, state.usersById, (_b = {}, _b[user.id] = user, _b)) });
    }
    return state;
};
export var getUserById = function (state, userId) {
    return state.usersById[userId];
};
//# sourceMappingURL=usersReducer.js.map