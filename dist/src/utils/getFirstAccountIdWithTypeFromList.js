export var getFirstAccountIdWithTypeFromList = function (accounts, accountType) {
    return accounts.filter(function (account) { return account.accountType === accountType; }).map(function (_) { return _.id; })[0];
};
//# sourceMappingURL=getFirstAccountIdWithTypeFromList.js.map