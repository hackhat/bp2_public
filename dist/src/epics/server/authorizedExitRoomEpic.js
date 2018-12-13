import { map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createServerBroadcastAction } from "../../actions";
import { PlayerActions } from "../../actions/PlayerActions";
import { isTypeOfAuthorizedAction } from "../utils/isTypeOfAuthorizedAction";
export var authorizedExitRoomEpic = function (store) { return function (action$, state$) {
    var authorizedExitRoom$ = action$.pipe(isTypeOfAuthorizedAction(PlayerActions.exitRoom), map(function (action) {
        var serverAction = action.payload.serverAction;
        return createServerBroadcastAction(serverAction.type, serverAction.payload);
    }));
    return merge(authorizedExitRoom$);
}; };
//# sourceMappingURL=authorizedExitRoomEpic.js.map