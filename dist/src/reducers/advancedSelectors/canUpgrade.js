import { selectors } from "../index";
import { PlanetProperty } from "../../interfaces";
import { planetHasEnoughSpaceAround } from "../../utils/planetHasEnoughSpaceAround";
export var canUpgrade = function (state, input) {
    var authenticatedPlayerId = input.authenticatedPlayerId, planetId = input.planetId, upgradeDefinitionId = input.upgradeDefinitionId;
    if (!authenticatedPlayerId) {
        return {
            ok: false,
            err: "No authenticatedPlayerId provided.",
        };
    }
    if (!planetId) {
        return {
            ok: false,
            err: "No planetId provided.",
        };
    }
    if (!upgradeDefinitionId) {
        return {
            ok: false,
            err: "No upgradeDefinitionId provided.",
        };
    }
    var planet = selectors.planets.getPlanetById(state, planetId);
    if (!planet) {
        return {
            ok: false,
            err: "No planet found.",
        };
    }
    if (planet.ownerId !== authenticatedPlayerId) {
        return {
            ok: false,
            err: "You can't upgrade planets you don't own. Conquer this planet and try again.",
        };
    }
    var player = selectors.players.getPlayerById(state, authenticatedPlayerId);
    if (!player) {
        return {
            ok: false,
            err: "No player found.",
        };
    }
    var upgradeDefinition = selectors.upgrades.getUpgradeDefinitionById(state, upgradeDefinitionId);
    if (!upgradeDefinition) {
        return {
            ok: false,
            err: "No upgradeDefinition found.",
        };
    }
    if (player.resources < upgradeDefinition.resourcesCost) {
        return {
            ok: false,
            err: "Player has not enough resources to upgrade.",
        };
    }
    var numberOfUpgrades = planet.appliedUpgradeDefinitionIds.filter(function (id) { return id === upgradeDefinitionId; }).length;
    var MAX_UPGRADES = 15;
    if (numberOfUpgrades >= MAX_UPGRADES) {
        return {
            ok: false,
            err: "You can upgrade only " + MAX_UPGRADES + " times.",
        };
    }
    if (upgradeDefinition.property === PlanetProperty.radius) {
        var planets = Object.values(selectors.planets.getPlanetsById(state));
        if (!planetHasEnoughSpaceAround(planets, planet)) {
            return {
                ok: false,
                err: "Not enough space around the planet to increase the radius.",
            };
        }
    }
    return { ok: true };
};
//# sourceMappingURL=canUpgrade.js.map