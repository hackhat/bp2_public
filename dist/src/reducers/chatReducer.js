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
import { ChatActions } from "../actions/ChatActions";
import { SystemActions } from "../actions/SystemActions";
var MAX_CHAT_MESSAGES = 512;
var initialState = {
    messages: [],
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === SystemActions.setGameState) {
        state = setGameState(state, action.payload.gameState.chat);
    }
    else if (action.type === ChatActions.sendMessage) {
        var newMessages = state.messages.concat([
            action.payload.message,
        ]);
        if (newMessages.length > MAX_CHAT_MESSAGES) {
            newMessages = newMessages.slice(-MAX_CHAT_MESSAGES);
        }
        // @todo: sort by date
        state = __assign({}, state, { messages: newMessages });
    }
    return state;
};
export var getMessages = function (state) {
    return state.messages;
};
export var getGameState = function (state) {
    return {
        messages: state.messages,
    };
};
export var setGameState = function (state, gameState) {
    return __assign({}, state, { messages: gameState.messages });
};
//# sourceMappingURL=chatReducer.js.map