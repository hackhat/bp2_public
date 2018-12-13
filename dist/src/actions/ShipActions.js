export var ShipActions;
(function (ShipActions) {
    // @todo: rename to request send ship
    // @todo: validate from and to is different, is in range, has units from, owns from planet
    ShipActions.send = 'ship.send';
    ShipActions.requestSendShip = 'ship.requestSendShip';
    ShipActions.requestSendShipError = 'ship.requestSendShipError';
    ShipActions.arrive = 'ship.arrive';
    ShipActions.createStream = 'ship.createStream';
    ShipActions.requestCreateStream = 'ship.requestCreateStream';
    ShipActions.createStreamError = 'ship.createStreamError';
    ShipActions.deleteStream = 'ship.deleteStream';
    ShipActions.requestDeleteStream = 'ship.requestDeleteStream';
    ShipActions.deleteStreamError = 'ship.deleteStreamError';
})(ShipActions || (ShipActions = {}));
//# sourceMappingURL=ShipActions.js.map