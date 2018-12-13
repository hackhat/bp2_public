import { SystemActions } from "../../actions/SystemActions";
import { filter } from "rxjs/operators";
import { pipe } from "rxjs";
export var isTypeOfAuthorizedActions = function () {
    var types = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        types[_i] = arguments[_i];
    }
    return (pipe(filter(function (action) { return action.type === SystemActions.authorizedClientAction; }), filter(function (action) { return types.includes(action.payload.serverAction.type); })));
};
//# sourceMappingURL=isTypeOfAuthorizedActions.js.map