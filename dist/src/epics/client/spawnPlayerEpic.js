import { SystemActions } from "../../actions/SystemActions";
import { filter, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createAppAction } from "../../actions";
import { PlayerActions } from "../../actions/PlayerActions";
import { selectors } from "../../reducers";
import { ofTypes } from "../utils/ofTypes";
import { ToastActions } from "../../actions/ToastActions";
export var spawnPlayerEpic = function (api, store) { return function (action$, state$) {
    var spawnPlayerEpic$ = action$.pipe(ofTypes(SystemActions.newGame, PlayerActions.onCurrentPlayerRoomLogin), filter(function () { return !!selectors.system.getPublicSetting(state$.value, 'autoSpawnAfterRoomLogin'); }), map(function () {
        var currentPlayerCanRespawn = selectors.advanced.currentPlayerCanRespawn(state$.value, {});
        if (!currentPlayerCanRespawn.ok)
            return null;
        return createAppAction(ToastActions.addError, {
            error: "You didn't join the game yet. Please zoom in the map and click on a planet to join the game."
        });
    }), filter(function (action) { return action !== null; }));
    return merge(spawnPlayerEpic$);
}; };
//# sourceMappingURL=spawnPlayerEpic.js.map