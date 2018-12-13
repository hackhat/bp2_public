import { GlobalUIActions } from "../actions/GlobalUIActions";
var initialState = {
    accountsToUsers: [],
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === GlobalUIActions.addCurrentUserAndAccounts) {
        var accountsToUsers = action.payload.accountsToUsers;
        state = {
            accountsToUsers: state.accountsToUsers.concat(accountsToUsers)
        };
    }
    return state;
};
export default reducer;
//# sourceMappingURL=accountsToUsersReducer.js.map