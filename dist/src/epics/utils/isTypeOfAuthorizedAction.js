import { SystemActions } from "../../actions/SystemActions";
import { filter } from "rxjs/operators";
import { pipe } from "rxjs";
export var isTypeOfAuthorizedAction = function (type) { return (pipe(filter(function (action) { return action.type === SystemActions.authorizedClientAction; }), filter(function (action) { return action.payload.serverAction.type === type; }))); };
//# sourceMappingURL=isTypeOfAuthorizedAction.js.map