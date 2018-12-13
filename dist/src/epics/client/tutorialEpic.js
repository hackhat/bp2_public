import { map, mergeMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { createAppAction } from "../../actions";
import { tutorialList } from "../../tutorials/list";
import { TutorialActions } from "../../actions/TutorialActions";
import { ofType } from "../utils/ofType";
import { SystemActions } from "../../actions/SystemActions";
export var tutorialEpic = function (api, store) { return function (action$, state$) {
    var listOfEpics = Object.keys(tutorialList).map(function (key) {
        return tutorialList[key].checkCompletionEpic(action$, state$);
    });
    var afterTutorialCompleted$ = action$.pipe(ofType(TutorialActions.completed), map(function () {
        return createAppAction(TutorialActions.next, null);
    }));
    var start$ = action$.pipe(ofType(SystemActions.appStart), mergeMap(function () {
        return [createAppAction(TutorialActions.start, null)];
    }));
    return merge.apply(void 0, [start$, afterTutorialCompleted$].concat(listOfEpics));
}; };
//# sourceMappingURL=tutorialEpic.js.map