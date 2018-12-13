import { ShipActions } from "../../actions/ShipActions";
import { createServerBroadcastAction } from "../../actions";
export var createOnShipArriveAction = function (state, ship) {
    var shipArriveAction = createServerBroadcastAction(ShipActions.arrive, {
        shipId: ship.id,
        shipArrivalDate: new Date(),
    });
    return shipArriveAction;
};
//# sourceMappingURL=createOnShipArriveAction.js.map