import { SystemActions } from "../../actions/SystemActions";
import { filter, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
export var clientToServerActionEpic = function (api, store) { return function (action$, state$) {
    var clientToServerAction$ = action$.pipe(filter(function (action) { return action.type === SystemActions.sendClientToServerAction; }), tap(function (action) {
        api.sendActionToServer(action);
    }), filter(function () { return false; }));
    return merge(clientToServerAction$);
}; };
//# sourceMappingURL=clientToServerActionEpic.js.map