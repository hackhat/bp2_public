import { bufferTime, filter, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createServerAction } from "../actions";
import { SystemActions } from "../actions/SystemActions";
import { ofType } from "./utils/ofType";
import { ShipActions } from "../actions/ShipActions";
/**
 * Some actions like `onRoomLogin` are referring to any player joining the room,
 * but sometimes we just need to know if current player joined the room.
 * So this epic does exactly that, converts those global actions to
 * actions referring to the current player.
 */
export var batchPerformanceActionsEpic = function () { return function (action$, state$) {
    var shipSendAction$ = action$.pipe(ofType(ShipActions.send), bufferTime(50, undefined, 1000), filter(function (actions) { return actions.length !== 0; }), map(function (actions) {
        return createServerAction(SystemActions.batchPerformance, {
            type: ShipActions.send,
            actions: actions,
        });
    }));
    return merge(shipSendAction$);
}; };
//# sourceMappingURL=batchPerformanceActionsEpic.js.map