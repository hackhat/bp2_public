import { filter, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createServerBroadcastAction } from "../../actions";
import { SystemActions } from "../../actions/SystemActions";
import { isTypeOfAuthorizedActions } from "../utils/isTypeOfAuthorizedActions";
import { isProduction } from "../../utils/isProduction";
import { PlayerActions } from "../../actions/PlayerActions";
/**
 * Those actions are directly pushed from outside clients like test
 * and are broadcasted again to all people.
 * Will not work in production.
 */
export var unpackGenericAuthorizedActionsEpic = function (store) { return function (action$, state$) {
    var unpackGenericAuthorizedActionsEpic$ = action$.pipe(filter(function () { return !isProduction; }), isTypeOfAuthorizedActions(SystemActions.stopGameLifeCycle, SystemActions.cleanUpGameData, SystemActions.newGame, SystemActions.gameEnd, SystemActions.setPublicSetting, PlayerActions.removeAllPlayers), map(function (authorizedAction) {
        var innerAction = authorizedAction.payload.serverAction;
        var action = createServerBroadcastAction(innerAction.type, innerAction.payload);
        return action;
    }));
    return merge(unpackGenericAuthorizedActionsEpic$);
}; };
//# sourceMappingURL=unpackGenericAuthorizedActionsEpic.js.map