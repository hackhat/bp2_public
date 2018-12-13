import { SystemActions } from "../../actions/SystemActions";
import { filter, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createSendClientToServerAction } from "../../actions";
import { selectors } from "../../reducers";
import { PlayerActions } from "../../actions/PlayerActions";
export var loginRoomAgainOnReconnectEpic = function (api, store) { return function (action$, state$) {
    var requestGameStateOnReconnectEpic$ = action$.pipe(filter(function (action) { return action.type === SystemActions.clientSideSocketChange && action.payload.newState === 'reconnect'; }), filter(function () { return typeof localStorage !== 'undefined'; }), map(function () {
        return createSendClientToServerAction(PlayerActions.requestRoomLogin, {
            clientId: selectors.ui.global.getCurrentClientId(state$.value) || '',
            sessionId: localStorage.getItem('sessionId') || '',
            accountId: selectors.ui.global.getCurrentAccountId(state$.value) || '',
        });
    }));
    return merge(requestGameStateOnReconnectEpic$);
}; };
//# sourceMappingURL=loginRoomAgainOnReconnectEpic.js.map