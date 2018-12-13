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
import { TutorialActions } from "../actions/TutorialActions";
import { TutorialNames } from "../tutorials/interfaces";
var initialState = {
    tutorialList: [
        TutorialNames.welcome,
        TutorialNames.sendFirstShip,
    ],
    currentTutorialIndex: 0,
};
export var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === TutorialActions.next) {
        state = __assign({}, state, { currentTutorialIndex: state.currentTutorialIndex + 1 });
    }
    else if (action.type === TutorialActions.close) {
        state = __assign({}, state, { currentTutorialIndex: state.tutorialList.length });
    }
    return state;
};
export var getTutorialList = function (state) {
    return state.tutorialList;
};
export var getCurrentTutorialName = function (state) {
    return state.tutorialList[state.currentTutorialIndex] || null;
};
//# sourceMappingURL=tutorialReducer.js.map