import { map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { SystemActions } from "../../actions/SystemActions";
import { ofType } from "../utils/ofType";
/**
 * Broadcasts the action to the clients
 */
export var unpackServerBroadcastActionsEpic = function (store) { return function (action$, state$) {
    var actions$ = action$.pipe(ofType(SystemActions.serverBroadcastAction), map(function (action) {
        return action.payload.serverAction;
    }));
    return merge(actions$);
}; };
//# sourceMappingURL=unpackServerBroadcastActionsEpic.js.map