import { filter, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createAppAction } from "../../actions";
import { PlayerActions } from "../../actions/PlayerActions";
import { selectors } from "../../reducers";
import { SystemActions } from "../../actions/SystemActions";
import { ofType } from "../utils/ofType";
/**
 * Some actions like `onRoomLogin` are referring to any player joining the room,
 * but sometimes we just need to know if current player joined the room.
 * So this epic does exactly that, converts those global actions to
 * actions referring to the current player.
 */
export var globalActionsToCurrentPlayerActionEpic = function (api, store) { return function (action$, state$) {
    var loginRoomAction$ = action$.pipe(ofType(PlayerActions.onRoomLogin), filter(function (action) {
        return action.payload.partialPlayer.userId === selectors.ui.global.getCurrentUserId(state$.value);
    }), map(function (action) {
        return createAppAction(PlayerActions.onCurrentPlayerRoomLogin, action.payload);
    }));
    var exitRoomAction$ = action$.pipe(filter(function (action) { return action.type === PlayerActions.exitRoom; }), filter(function (action) {
        return action.payload.playerId === selectors.ui.global.getCurrentPlayerId(state$.value);
    }), map(function (action) {
        return createAppAction(PlayerActions.currentPlayerExitRoom, action.payload);
    }));
    var startGameWithAction$ = action$.pipe(ofType(SystemActions.startGameWith), filter(function (action) {
        return action.payload.playerId === selectors.ui.global.getCurrentPlayerId(state$.value);
    }), map(function (action) {
        return createAppAction(SystemActions.currentPlayerStartGameWith, action.payload);
    }));
    return merge(loginRoomAction$, exitRoomAction$, startGameWithAction$);
}; };
//# sourceMappingURL=globalActionsToCurrentPlayerActionEpic.js.map