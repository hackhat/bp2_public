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
import { mergeMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createServerBroadcastAction, createServerToSingleClientAction } from "../../actions";
import { selectors } from "../../reducers";
import { isTypeOfAuthorizedAction } from "../utils/isTypeOfAuthorizedAction";
import { ChatActions } from "../../actions/ChatActions";
import generateUniqueId from "../../utils/generateUniqueId";
export var requestChatSendMessageEpic = function (store) { return function (action$, state$) {
    var requestDeleteShipStreamAction$ = action$.pipe(isTypeOfAuthorizedAction(ChatActions.requestSendMessage), mergeMap(function (authorizedAction) {
        var state = state$.value;
        var _a = authorizedAction.payload, authenticatedPlayerId = _a.authenticatedPlayerId, serverAction = _a.serverAction;
        var res = selectors.advanced.canSendChatMessage(state, {
            message: serverAction.payload.message,
            authenticatedPlayerId: authenticatedPlayerId
        });
        if (!res.ok) {
            return [
                createServerToSingleClientAction(authorizedAction.payload.clientId, ChatActions.sendMessageError, __assign({}, serverAction.payload, { error: res.err })),
            ];
        }
        // Just for typescript
        if (!authenticatedPlayerId) {
            return [];
        }
        var player = selectors.players.getPlayerById(state, authenticatedPlayerId);
        if (!player) {
            return [];
        }
        var message = {
            text: serverAction.payload.message,
            id: generateUniqueId(),
            playerId: authenticatedPlayerId,
            date: new Date(),
            color: player.color || 'white',
            ownerName: player.name || 'Unnamed',
        };
        return [
            createServerBroadcastAction(ChatActions.sendMessage, {
                message: message,
            }),
        ];
    }));
    return merge(requestDeleteShipStreamAction$);
}; };
//# sourceMappingURL=requestChatSendMessageEpic.js.map