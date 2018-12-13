import { mergeMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createServerBroadcastAction, createServerToSingleClientAction } from "../../actions";
import { selectors } from "../../reducers";
import { isTypeOfAuthorizedAction } from "../utils/isTypeOfAuthorizedAction";
import { UpgradeActions } from "../../actions/UpgradeActions";
export var requestUpgradeEpic = function (store) { return function (action$, state$) {
    var requestUpgradeEpic$ = action$.pipe(isTypeOfAuthorizedAction(UpgradeActions.requestUpgrade), mergeMap(function (authorizedAction) {
        var state = state$.value;
        var _a = authorizedAction.payload, authenticatedPlayerId = _a.authenticatedPlayerId, serverAction = _a.serverAction;
        if (!authenticatedPlayerId)
            return [];
        var res = selectors.advanced.canUpgrade(state, {
            authenticatedPlayerId: authenticatedPlayerId,
            planetId: serverAction.payload.planetId,
            upgradeDefinitionId: serverAction.payload.upgradeDefinitionId,
        });
        if (!res.ok) {
            return [
                createServerToSingleClientAction(authorizedAction.payload.clientId, UpgradeActions.upgradeError, {
                    playerId: authenticatedPlayerId,
                    planetId: serverAction.payload.planetId,
                    upgradeDefinitionId: serverAction.payload.upgradeDefinitionId,
                    error: res.err,
                }),
            ];
        }
        return [
            createServerBroadcastAction(UpgradeActions.upgrade, {
                playerId: authenticatedPlayerId,
                planetId: serverAction.payload.planetId,
                upgradeDefinitionId: serverAction.payload.upgradeDefinitionId,
            }),
        ];
    }));
    return merge(requestUpgradeEpic$);
}; };
//# sourceMappingURL=requestUpgradeEpic.js.map