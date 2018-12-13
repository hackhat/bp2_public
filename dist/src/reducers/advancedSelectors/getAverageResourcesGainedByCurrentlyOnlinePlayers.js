import { selectors } from "../index";
/**
 * Total resources gained average by user.
 * @param state
 */
export var getAverageResourcesGainedByCurrentlyOnlinePlayers = function (state) {
    var playersById = selectors.players.getPlayersById(state);
    var sum = 0;
    var players = 0;
    Object.values(playersById).forEach(function (player) {
        if (!player)
            return;
        if (!player.online)
            return;
        if (player.resources + player.resourcesUsed === 0)
            return;
        players++;
        sum += player.resources + player.resourcesUsed;
    });
    if (players === 0)
        return 0;
    return Math.round(sum / players);
};
//# sourceMappingURL=getAverageResourcesGainedByCurrentlyOnlinePlayers.js.map