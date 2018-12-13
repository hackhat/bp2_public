import { selectors } from "../index";
import * as _ from "lodash";
export var getScoreBoardData = function (state) {
    var playersById = selectors.players.getPlayersById(state);
    var planetsById = selectors.planets.getPlanetsById(state);
    var players = Object.values(playersById);
    var playerToPlanets = {};
    var planets = Object.values(planetsById);
    planets.forEach(function (planet) {
        if (planet.ownerId === null) {
            return;
        }
        if (playerToPlanets[planet.ownerId] === undefined) {
            playerToPlanets[planet.ownerId] = 0;
        }
        playerToPlanets[planet.ownerId]++;
    });
    var unsortedScoreBoard = players.map(function (player) {
        return {
            playerId: player.id,
            name: player.name,
            color: player.color,
            resources: player.resources,
            availableMoneyAmountInCents: player.availableMoneyAmountInCents,
            depositAmountInCents: player.depositAmountInCents,
            kills: player.kills,
            countryCode: player.countryCode,
            planetsOwned: playerToPlanets[player.id] || 0,
            totalPlanets: planets.length,
            online: player.online,
            hasEmail: player.hasEmail,
            percentDominated: !playerToPlanets[player.id] ? 0 : playerToPlanets[player.id] / planets.length,
        };
    });
    var sortedScoreBoard = _.sortBy(unsortedScoreBoard, 'percentDominated').reverse();
    return sortedScoreBoard;
};
//# sourceMappingURL=getScoreBoardData.js.map