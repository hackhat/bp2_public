import { filter, tap, mergeMap } from 'rxjs/operators';
import { Observable, merge, interval, from } from 'rxjs';
import { createAppAction } from "../../actions";
import { selectors } from "../../reducers";
import { SystemActions } from "../../actions/SystemActions";
import { BotGroup } from "../../bots/BotGroup";
import { getGameEnd$ } from "../utils/getGameEnd$";
import { isProduction } from "../../utils/isProduction";
import { PlayerActions } from "../../actions/PlayerActions";
import { ofTypes } from "../utils/ofTypes";
import { ofType } from "../utils/ofType";
var maxBots = isProduction ? 10 : 15;
export var botsEpic = function (store) { return function (action$, state$) {
    var botGroup;
    var getBotAction$ = function () {
        if (botGroup) {
            return from([]);
        }
        return new Observable(function (observer) {
            var defaultBotProps = {
                getStoreState: function () { return state$.value; },
                dispatchServerAction: function (serverAction, clientId) {
                    var rawClientAction = createAppAction(SystemActions.rawClientAction, {
                        serverAction: serverAction,
                        clientId: clientId,
                    });
                    observer.next(rawClientAction);
                }
            };
            botGroup = new BotGroup({ defaultBotProps: defaultBotProps, maxBots: maxBots });
            botGroup.addBots(maxBots);
            console.log("Started new " + maxBots + " bots!");
            return function () {
                botGroup && botGroup.destroy();
                botGroup = undefined;
            };
        });
    };
    var startBots$ = action$.pipe(ofType(SystemActions.serverStart), mergeMap(getBotAction$));
    var pauseAndResumeBots$ = merge(action$.pipe(ofTypes(SystemActions.startGameWith, SystemActions.newGame, PlayerActions.onRoomLogin, PlayerActions.exitRoom, SystemActions.clientDisconnected)), interval(2500)).pipe(tap(function () {
        if (botGroup === undefined) {
            return;
        }
        var onlinePlayers = selectors.players.getOnlinePlayers(state$.value);
        var nonBotOnlinePlayers = onlinePlayers.filter(function (player) { return botGroup && !botGroup.getPlayerIds().includes(player.id); }).map(function (p) { return p.id; });
        if (0 < nonBotOnlinePlayers.length) {
            console.log("Bots resumed");
            botGroup && botGroup.resume();
        }
        else {
            console.log("Bots paused");
            botGroup && botGroup.pause();
        }
    }), filter(function () { return false; }));
    var killBots$ = getGameEnd$(action$).pipe(tap(function () {
        console.log("Dead bots killed");
    }), filter(function () { return false; }));
    return merge(startBots$, killBots$, pauseAndResumeBots$);
}; };
//# sourceMappingURL=botsEpic.js.map