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
import generateUniqueId from "../utils/generateUniqueId";
import { ToastActions } from "../actions/ToastActions";
import { SystemActions } from "../actions/SystemActions";
var initialState = {
    lastToast: undefined,
    lastError: null,
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === ToastActions.addTextToast) {
        state = __assign({}, state, { lastToast: {
                id: generateUniqueId(),
                text: action.payload.text,
                autoClose: action.payload.autoClose,
                variant: 'info',
            } });
    }
    else if (action.type === ToastActions.addToast) {
        state = __assign({}, state, { lastToast: __assign({}, action.payload.toast), lastError: action.payload.toast.variant === 'error' ? action.payload.toast.text : state.lastError });
    }
    else if (action.type === ToastActions.removeLastToast) {
        state = __assign({}, state, { lastToast: undefined });
    }
    else if (action.type === SystemActions.cleanUpGameData) {
        state = __assign({}, state, { lastToast: undefined });
    }
    else if (action.type === ToastActions.removeLastError) {
        state = __assign({}, state, { lastError: null });
    }
    else if (action.type === ToastActions.addError) {
        state = __assign({}, state, { lastError: action.payload.error });
    }
    return state;
};
export var getLastToast = function (state) {
    return state.lastToast;
};
export var getLastError = function (state) {
    return state.lastError;
};
export default reducer;
//# sourceMappingURL=toastsReducer.js.map