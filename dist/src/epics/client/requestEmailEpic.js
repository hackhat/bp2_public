import { SystemActions } from "../../actions/SystemActions";
import { filter, mergeMap, map, takeUntil } from 'rxjs/operators';
import { merge, timer } from 'rxjs';
import { createAppAction } from "../../actions";
import { selectors } from "../../reducers";
import { REQUEST_EMAIL_AT_MINUTES } from "../../constants/constants";
import { ofType } from "../utils/ofType";
import { UserActions } from "../../actions/UserActions";
export var requestEmailEpic = function (api, store) { return function (action$, state$) {
    var requestEmail$ = action$.pipe(ofType(UserActions.addCurrentUser), mergeMap(function () {
        var timers = REQUEST_EMAIL_AT_MINUTES.map(function (minutes) {
            return timer(Math.round(minutes * 60 * 1000));
        });
        return merge.apply(void 0, timers).pipe(filter(function () {
            var state = state$.value;
            var currentUser = selectors.ui.global.getCurrentUser(state);
            if (currentUser && !currentUser.email) {
                return true;
            }
            return false;
        }), map(function () {
            var action = createAppAction(SystemActions.setRequestEmailDialogVisibility, {
                isVisible: true,
            });
            return action;
        }));
    }), takeUntil(action$.pipe(ofType(UserActions.setNoCurrentUser))));
    return merge(requestEmail$);
}; };
//# sourceMappingURL=requestEmailEpic.js.map