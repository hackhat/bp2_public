import { selectors } from "../../reducers/index";
import { getDomPositionFromGamePosition } from "../utils/getDomPositionFromGamePosition";
import { Observable } from "rxjs";
import { createAppAction } from "../../actions";
import { TutorialActions } from "../../actions/TutorialActions";
import { filter, mergeMap, takeUntil } from "rxjs/operators";
import { TutorialNames } from "../interfaces";
import { ofTypes } from "../../epics/utils/ofTypes";
var getTargetPlanet = function (state) {
    var currentPlayerId = selectors.ui.global.getCurrentPlayerId(state);
    if (!currentPlayerId)
        return null;
    var playerPlanets = selectors.planets.getPlanetsOwnedByPlayerId(state, currentPlayerId);
    var playerPlanet = playerPlanets[0];
    if (!playerPlanet)
        return null;
    var inRangePlanets = selectors.planets.getPlanetsInRangeOfPlanetId(state, playerPlanet.id);
    var inRangePlanet = inRangePlanets[0];
    return inRangePlanet;
};
export var sendFirstShipTutorial = {
    name: TutorialNames.sendFirstShip,
    getInfo: function (state) {
        var targetPlanet = getTargetPlanet(state);
        if (!targetPlanet)
            return null;
        var gameTargetPosition = {
            x: targetPlanet.x,
            y: targetPlanet.y,
        };
        var targetPosition = getDomPositionFromGamePosition(state, gameTargetPosition);
        if (!targetPosition)
            return null;
        var output = {
            text: "The bigger circle is the planet's range. Drag from your selected planet to this planet to send a ship. Send ships until you own this planet.",
            targetX: targetPosition.x,
            targetY: targetPosition.y,
        };
        return output;
    },
    checkCompletionEpic: function (action$, state$) {
        var isCurrentTutorial = function (state) {
            return sendFirstShipTutorial.name === selectors.ui.tutorial.getCurrentTutorialName(state);
        };
        var isNotCurrentTutorial = function (state) {
            return sendFirstShipTutorial.name !== selectors.ui.tutorial.getCurrentTutorialName(state);
        };
        var notCurrentTutorial$ = state$.pipe(filter(isNotCurrentTutorial));
        return action$.pipe(ofTypes(TutorialActions.start, TutorialActions.next), filter(function () { return isCurrentTutorial(state$.value); }), mergeMap(function () {
            return new Observable(function (observer) {
                var interval = setInterval(function () {
                    var targetPlanet = getTargetPlanet(state$.value);
                    if (!targetPlanet)
                        return;
                    var currentPlayerId = selectors.ui.global.getCurrentPlayerId(state$.value);
                    if (targetPlanet.ownerId === currentPlayerId) {
                        var completedAction = createAppAction(TutorialActions.completed, {
                            tutorialName: sendFirstShipTutorial.name,
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
//# sourceMappingURL=sendFirstShipTutorial.js.map