import { SystemActions } from "../../actions/SystemActions";
import { filter, mergeMap } from 'rxjs/operators';
import { merge, interval } from 'rxjs';
import { createAppAction } from "../../actions";
import { selectors } from "../../reducers";
import { GlobalUIActions } from "../../actions/GlobalUIActions";
import { DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME } from "../../constants/constants";
export var addMoreMoneyEpic = function (api, store) { return function (action$, state$) {
    var addMoreMoney$ = action$.pipe(filter(function (action) { return action.type === SystemActions.appStart; }), mergeMap(function () {
        return interval(10 * 100);
    }), mergeMap(function () {
        var account = selectors.ui.global.getCurrentAccount(state$.value);
        if (account) {
            var addMoreMoneyPanelState = selectors.ui.global.getAddMoreMoneyPanelState(state$.value);
            var hasEnoughMoneyToPlay = account.availableMoneyAmountInCents >= DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME;
            if (!hasEnoughMoneyToPlay && !addMoreMoneyPanelState.isVisible) {
                return [
                    createAppAction(GlobalUIActions.setVisibilityForAddMoreMoneyPanel, {
                        isVisible: true,
                    })
                ];
            }
        }
        return [];
    }));
    return merge(addMoreMoney$);
}; };
//# sourceMappingURL=addMoreMoneyEpic.js.map