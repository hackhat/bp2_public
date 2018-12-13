import { filter, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { SystemActions } from "../../actions/SystemActions";
import { ShipActions } from "../../actions/ShipActions";
import { PlayerActions } from "../../actions/PlayerActions";
import { PlanetActions } from "../../actions/PlanetActions";
/**
 * Broadcasts the action to the clients
 */
export var dispatchClientToServerActionsEpic = function (api, store) { return function (action$, state$) {
    var dispatchClientToServerActions$ = action$.pipe(filter(function (action) { return action.type === SystemActions.sendClientToServerAction; }), map(function (action) {
        return action.payload.serverAction;
    }), 
    // We don't want to dispatch these actions because they will be
    // returned by the server when they are validated.
    // We only want to dispatch some of the actions as they can be useful.
    filter(function (action) {
        return [
            ShipActions.requestCreateStream,
            ShipActions.requestSendShip,
            SystemActions.requestStartGameWith,
            PlanetActions.requestCreateOne,
            PlayerActions.requestRoomLogin,
        ].indexOf(action.type) > -1;
    }));
    return merge(dispatchClientToServerActions$);
}; };
//# sourceMappingURL=dispatchClientToServerActionsEpic.js.map