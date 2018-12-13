export var PlanetActions;
(function (PlanetActions) {
    PlanetActions.addMany = 'planet.addMany';
    PlanetActions.createOne = 'planet.createOne';
    PlanetActions.createOneError = 'planet.createOneError';
    PlanetActions.requestCreateOne = 'planet.requestCreateOne';
    PlanetActions.addUnits = 'planet.addUnits';
    PlanetActions.addUnitsToMany = 'planet.addUnitsToMany';
    PlanetActions.addPlanetsUpdatesById = 'planet.addPlanetsUpdatesById';
    PlanetActions.debugSetThreatLevelsForBot = 'planet.debugSetThreatLevelsForBot';
    PlanetActions.disownMany = 'planet.disownMany';
    // Called on each unit cycle. When this happens the planets should add units.
    PlanetActions.unitCycleTick = 'planet.unitCycleTick';
})(PlanetActions || (PlanetActions = {}));
//# sourceMappingURL=PlanetActions.js.map