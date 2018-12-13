import { selectors } from "../../reducers/index";
import { getDomPositionFromGamePosition } from "../utils/getDomPositionFromGamePosition";
import { Observable } from "rxjs";
import { createAppAction } from "../../actions";
import { TutorialActions } from "../../actions/TutorialActions";
import { filter, mergeMap, takeUntil } from "rxjs/operators";
import { TutorialNames } from "../interfaces";
import { ofTypes } from "../../epics/utils/ofTypes";
export var welcomeTutorial = {
    name: TutorialNames.welcome,
    getInfo: function (state) {
        var currentPlayerId = selectors.ui.global.getCurrentPlayerId(state);
        if (!currentPlayerId)
            return null;
        var playerPlanets = selectors.planets.getPlanetsOwnedByPlayerId(state, currentPlayerId);
        var playerPlanet = playerPlanets[0];
        if (!playerPlanet)
            return null;
        var gameTargetPosition = {
            x: playerPlanet.x,
            y: playerPlanet.y,
        };
        var targetPosition = getDomPositionFromGamePosition(state, gameTargetPosition);
        if (!targetPosition)
            return null;
        var output = {
            text: 'Welcome to BitPlanets! You start with this planet, is yours! Click or tap on it to select it.',
            targetX: targetPosition.x,
            targetY: targetPosition.y,
        };
        return output;
    },
    checkCompletionEpic: function (action$, state$) {
        var isCurrentTutorial = function (state) {
            return welcomeTutorial.name === selectors.ui.tutorial.getCurrentTutorialName(state);
        };
        var isNotCurrentTutorial = function (state) {
            return welcomeTutorial.name !== selectors.ui.tutorial.getCurrentTutorialName(state);
        };
        var notCurrentTutorial$ = state$.pipe(filter(isNotCurrentTutorial));
        return action$.pipe(ofTypes(TutorialActions.start, TutorialActions.next), filter(function () { return isCurrentTutorial(state$.value); }), mergeMap(function () {
            return new Observable(function (observer) {
                var interval = setInterval(function () {
                    var selectedPlanetId = selectors.ui.planetMap.getUI(state$.value).selectedPlanetId;
                    if (selectedPlanetId) {
                        var completedAction = createAppAction(TutorialActions.completed, {
                            tutorialName: welcomeTutorial.name,
                        });
                        observer.next(completedAction);
                    }
                }, 200);
                return function () {
                    clearInterval(interval);
                };
            }).pipe(takeUntil(notCurrentTutorial$));
        }));
    },
};
//# sourceMappingURL=welcomeTutorial.js.map