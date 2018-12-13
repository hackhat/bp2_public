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
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { from, merge, } from 'rxjs';
import { createAppAction, createSendClientToServerAction } from "../../actions";
import { AttackMode, LoadingStatus } from "../../interfaces";
import { PlanetMapUIActions } from "./PlanetMapUIActions";
import { selectors } from "../../reducers";
import { ShipActions } from "../../actions/ShipActions";
import generateUniqueId from "../../utils/generateUniqueId";
import { ToastActions } from "../../actions/ToastActions";
import { PlanetActions } from "../../actions/PlanetActions";
import { ofType } from "../../epics/utils/ofType";
import { SystemActions } from "../../actions/SystemActions";
import { isNotNullOrUndefined } from "../../utils/isNotNullOrUndefined";
import { createPlanet } from "../../utils/createPlanet";
import { createPlanetDefaults } from "../../constants/constants";
var DISABLE_SHIP_SENDING = true;
export var planetMapUIEpic = function (api, store) { return function (action$, state$) {
    var requestCreateGameAction$ = action$.pipe(ofType(SystemActions.connectedToRoom), map(function () {
        var ui = selectors.ui.planetMap.getUI(state$.value);
        if (ui.phaserGameLoadingStatus === LoadingStatus.none) {
            var requestCreatePhaserGameAction = createAppAction(PlanetMapUIActions.requestCreatePhaserGame, null);
            return requestCreatePhaserGameAction;
        }
        return null;
    }), filter(isNotNullOrUndefined));
    var createGameAction$ = action$.pipe(ofType(PlanetMapUIActions.requestCreatePhaserGame), tap(function () {
        var ui = selectors.ui.planetMap.getUI(state$.value);
        ui.createGame && ui.createGame();
    }), filter(function () { return false; }));
    var onUnmountAction$ = action$.pipe(ofType(PlanetMapUIActions.onUnmount), map(function () {
        var destroyPhaserGameAction = createAppAction(PlanetMapUIActions.destroyPhaserGame, null);
        return destroyPhaserGameAction;
    }));
    var destroyGameAction$ = action$.pipe(ofType(PlanetMapUIActions.destroyPhaserGame), tap(function () {
        var ui = selectors.ui.planetMap.getUI(state$.value);
        ui.destroyGame && ui.destroyGame();
    }), filter(function () { return false; }));
    var createPlanetAction$ = action$.pipe(filter(function (action) { return action.type === PlanetMapUIActions.onBackgroundClick; }), map(function (action) {
        var state = state$.value;
        var ui = selectors.ui.planetMap.getUI(state);
        if (ui.createPlanetMode) {
            var _a = action.payload.point, x = _a.x, y = _a.y;
            var currentPlayerId = selectors.ui.global.getCurrentPlayerId(state);
            if (currentPlayerId === undefined) {
                return null;
            }
            var requestCreateOnePayload = {
                id: generateUniqueId(),
                x: x,
                y: y,
                playerId: currentPlayerId,
            };
            var planet = createPlanet(__assign({}, createPlanetDefaults, { id: requestCreateOnePayload.id, x: requestCreateOnePayload.x, y: requestCreateOnePayload.y }));
            var canCreatePlanetInput = {
                planet: planet,
                playerId: currentPlayerId,
                authenticatedPlayerId: currentPlayerId,
            };
            var canPlayerCreatePlanetRes = selectors.advanced.canPlayerCreatePlanet(state$.value, canCreatePlanetInput);
            if (canPlayerCreatePlanetRes.ok) {
                return createSendClientToServerAction(PlanetActions.requestCreateOne, requestCreateOnePayload);
            }
            else {
                return createAppAction(PlanetActions.createOneError, __assign({}, requestCreateOnePayload, { error: canPlayerCreatePlanetRes.err }));
            }
        }
        return null;
    }), filter(function (action) { return action !== null; }));
    var startGameAction$ = action$.pipe(filter(function (action) { return action.type === PlanetMapUIActions.onPlanetIdClick; }), map(function (action) {
        var state = state$.value;
        var currentPlayerCanRespawn = selectors.advanced.currentPlayerCanRespawn(state, {});
        if (!currentPlayerCanRespawn.ok)
            return null;
        var currentPlayerId = selectors.ui.global.getCurrentPlayerId(state$.value);
        if (currentPlayerId === undefined)
            return null;
        return createSendClientToServerAction(SystemActions.requestStartGameWith, {
            planetId: action.payload.planetId,
            playerId: currentPlayerId,
        });
    }), filter(function (action) { return action !== null; }));
    var sendShipOrStream$ = action$.pipe(filter(function (action) { return action.type === PlanetMapUIActions.onPlanetIdClick; }), map(function (action) {
        var state = state$.value;
        var ui = selectors.ui.planetMap.getUI(state);
        var currentlySelectedPlanetId = ui.selectedPlanetId, attackMode = ui.attackMode;
        var planetsById = selectors.planets.getPlanetsById(state);
        var currentSelectedPlanet = currentlySelectedPlanetId ? planetsById[currentlySelectedPlanetId] : undefined;
        var clickedPlanet = planetsById[action.payload.planetId];
        if (!clickedPlanet) {
            return [null];
        }
        var selectPlanetAction = createAppAction(PlanetMapUIActions.onPlanetIdSelected, {
            planetId: clickedPlanet.id,
        });
        var currentPlayer = selectors.ui.global.getCurrentPlayer(state);
        var fromPlanet = currentSelectedPlanet;
        var toPlanet = clickedPlanet;
        if (!DISABLE_SHIP_SENDING && currentPlayer && currentPlayer.color && currentlySelectedPlanetId && fromPlanet) {
            var units = selectors.planets.getEstimatedUnitsToSendByShipFromPlanet(state, fromPlanet.id);
            var shipDataRequest = {
                ownerId: currentPlayer.id,
                fromPlanetId: fromPlanet.id,
                toPlanetId: toPlanet.id,
                authenticatedPlayerId: currentPlayer.id,
                units: units,
            };
            if (attackMode === AttackMode.ship) {
                var canCreateShip = selectors.advanced.canCreateShip(state, shipDataRequest);
                if (canCreateShip.ok) {
                    return [createSendClientToServerAction(ShipActions.requestSendShip, {
                            units: units,
                            fromPlanetId: shipDataRequest.fromPlanetId,
                            toPlanetId: shipDataRequest.toPlanetId,
                            id: generateUniqueId(),
                            ownerId: currentPlayer.id,
                        })];
                }
                else {
                    var toastAction = createAppAction(ToastActions.addToast, {
                        toast: { id: generateUniqueId(), text: canCreateShip.err, autoClose: true, variant: 'error' },
                    });
                    return [toastAction, selectPlanetAction];
                }
            }
            else if (attackMode === AttackMode.shipStream) {
                var canCreateShipStream = selectors.advanced.canCreateShipStream(state, shipDataRequest);
                if (canCreateShipStream.ok) {
                    var shipStream = {
                        id: generateUniqueId(),
                        temporary: true,
                        fromPlanetId: shipDataRequest.fromPlanetId,
                        toPlanetId: shipDataRequest.toPlanetId,
                    };
                    return [createSendClientToServerAction(ShipActions.requestCreateStream, {
                            shipStream: shipStream,
                        })];
                }
                else {
                    var toastAction = createAppAction(ToastActions.addToast, {
                        toast: { id: generateUniqueId(), text: canCreateShipStream.err, autoClose: true, variant: 'error' },
                    });
                    return [toastAction, selectPlanetAction];
                }
            }
        }
        return [createAppAction(PlanetMapUIActions.onPlanetIdSelected, {
                planetId: clickedPlanet.id,
            })];
    }), mergeMap(function (actions) {
        var nonNullActions = actions.filter(function (action) { return action !== null; });
        return from(nonNullActions);
    }));
    return merge(startGameAction$, requestCreateGameAction$, createGameAction$, destroyGameAction$, onUnmountAction$, createPlanetAction$, sendShipOrStream$);
}; };
//# sourceMappingURL=planetMapUIEpic.js.map