import { selectors } from "../../reducers";
import { filter, mergeMap, take } from "rxjs/operators";
import { PlayerActions } from "../../actions/PlayerActions";
import { SystemActions } from "../../actions/SystemActions";
import { LoadingStatus } from "../../interfaces";
export var onRoomDataLoaded = function (action$, state$) {
    return action$.pipe(filter(function (action) {
        return action.type === PlayerActions.onCurrentPlayerRoomLogin || action.type === SystemActions.setGameState;
    }), mergeMap(function () {
        // Wait until room data is loaded
        return state$.pipe(filter(function (state) {
            var roomDataLoaded = selectors.ui.global.getPlayerRoomLoginLoadingStatus(state) === LoadingStatus.loaded;
            return roomDataLoaded;
        }), take(1));
    }));
};
//# sourceMappingURL=onRoomDataLoaded.js.map