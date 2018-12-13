import { SystemActions } from "../../actions/SystemActions";
import { filter, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createAppAction } from "../../actions";
export var dateSyncEpic = function (api, store) { return function (action$, state$) {
    var dateSync$ = action$.pipe(filter(function (action) { return action.type === SystemActions.setServerDate; }), map(function (action) {
        var offsetInMs = +(new Date) - +action.payload.date;
        return offsetInMs;
    }), 
    // Don't ignore huge offsets because maybe the player has 1 or 2 hours clock error
    map(function (offsetInMs) {
        return createAppAction(SystemActions.setServerDateOffset, { offsetInMs: offsetInMs });
    }));
    return merge(dateSync$);
}; };
//# sourceMappingURL=dateSyncEpic.js.map