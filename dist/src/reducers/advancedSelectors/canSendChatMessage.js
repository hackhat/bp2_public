import { CHAT_MAX_MESSAGE_TEXT_LENGTH } from "../../constants/constants";
export var canSendChatMessage = function (state, input) {
    var message = input.message, authenticatedPlayerId = input.authenticatedPlayerId;
    if (authenticatedPlayerId === undefined) {
        return {
            ok: false,
            err: "authenticatedPlayerId is undefined",
        };
    }
    else if (message.length > CHAT_MAX_MESSAGE_TEXT_LENGTH) {
        return {
            ok: false,
            err: "Message text too long " + message.length + ". Max is " + CHAT_MAX_MESSAGE_TEXT_LENGTH + " characters.",
        };
    }
    else if (message === '') {
        return {
            ok: false,
            err: "You can't send an empty message",
        };
    }
    return {
        ok: true,
    };
};
//# sourceMappingURL=canSendChatMessage.js.map