var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { ShipActions } from "../actions/ShipActions";
import { SystemActions } from "../actions/SystemActions";
import arrayToObjectById from "../utils/arrayToObjectById";
var initialState = {
    shipsById: {},
    shipStreamsById: {},
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var _a, _b, _c;
    if (action.type === SystemActions.setGameState) {
        state = setGameState(state, action.payload.gameState.ships);
    }
    else if (action.type === SystemActions.cleanUpGameData) {
        state = __assign({}, state, { shipsById: {}, shipStreamsById: {} });
    }
    else if (action.type === SystemActions.newGame) {
        state = __assign({}, state, { shipsById: {}, shipStreamsById: {} });
    }
    else if (action.type === ShipActions.requestSendShip) {
        state = __assign({}, state, { shipsById: __assign({}, state.shipsById, (_a = {}, _a[action.payload.id] = __assign({}, action.payload, { 
                // So the ship will not be moving while is temporary
                temporary: true, dateSent: new Date(Infinity), arrived: false, color: 'white', attack: 1 }), _a)) });
    }
    else if (action.type === ShipActions.requestSendShipError) {
        state = __assign({}, state, { shipsById: __assign({}, state.shipsById) });
        delete state.shipsById[action.payload.id];
    }
    else if (action.type === SystemActions.batchPerformance && action.payload.type === ShipActions.send) {
        var actions = action.payload.actions;
        var copyOfShipsById_1 = __assign({}, state.shipsById);
        actions.forEach(function (subAction) {
            var ship = subAction.payload.ship;
            copyOfShipsById_1[ship.id] = __assign({}, ship, { temporary: false });
        });
        state = __assign({}, state, { shipsById: copyOfShipsById_1 });
    }
    else if (action.type === SystemActions.batchPerformance && action.payload.type === ShipActions.arrive) {
        var actions = action.payload.actions;
        var copyOfShipsById_2 = __assign({}, state.shipsById);
        actions.forEach(function (subAction) {
            delete copyOfShipsById_2[subAction.payload.shipId];
        });
        state = __assign({}, state, { shipsById: copyOfShipsById_2 });
    }
    else if (action.type === ShipActions.createStream) {
        state = __assign({}, state, { shipStreamsById: __assign({}, state.shipStreamsById, (_b = {}, _b[action.payload.shipStream.id] = __assign({}, action.payload.shipStream, { temporary: false }), _b)) });
    }
    else if (action.type === ShipActions.requestCreateStream) {
        state = __assign({}, state, { shipStreamsById: __assign({}, state.shipStreamsById, (_c = {}, _c[action.payload.shipStream.id] = __assign({}, action.payload.shipStream), _c)) });
    }
    else if (action.type === ShipActions.deleteStream) {
        var shipStreamId = action.payload.shipStreamId;
        var shipStreamsByIdCopy = __assign({}, state.shipStreamsById);
        delete shipStreamsByIdCopy[shipStreamId];
        state = __assign({}, state, { shipStreamsById: shipStreamsByIdCopy });
    }
    else if (action.type === SystemActions.disconnect) {
        state = __assign({}, state, { shipsById: {}, shipStreamsById: {} });
    }
    else if (action.type === ShipActions.createStreamError) {
        var id = action.payload.shipStream.id;
        var shipStreamsByIdCopy = __assign({}, state.shipStreamsById);
        delete shipStreamsByIdCopy[id];
        state = __assign({}, state, { shipStreamsById: shipStreamsByIdCopy });
    }
    return state;
};
export var getShips = function (state) {
    return state.shipsById;
};
export var getShipById = function (state, shipId) {
    return state.shipsById[shipId];
};
var defaultGetShipStreamsOptions = {
    includeTemporary: false,
};
export var getShipStreams = function (state, _a) {
    var includeTemporary = _a.includeTemporary;
    if (includeTemporary) {
        return state.shipStreamsById;
    }
    var filteredShipStream = Object.values(state.shipStreamsById)
        .filter(function (s) { return s && !s.temporary; });
    return arrayToObjectById(filteredShipStream);
};
export var getGameState = function (state) {
    return {
        shipsById: state.shipsById,
        shipStreamsById: state.shipStreamsById,
    };
};
export var setGameState = function (state, gameState) {
    return __assign({}, state, { shipsById: gameState.shipsById, shipStreamsById: gameState.shipStreamsById });
};
export default reducer;
//# sourceMappingURL=shipsReducer.js.map