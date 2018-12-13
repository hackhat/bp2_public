import { filter } from "rxjs/operators";
import { SystemActions } from "../../actions/SystemActions";
export var getGameEnd$ = function (action$) {
    var gameEndAction$ = action$.pipe(filter(function (action) { return action.type === SystemActions.gameEnd; }));
    return gameEndAction$;
};
//# sourceMappingURL=getGameEnd$.js.map