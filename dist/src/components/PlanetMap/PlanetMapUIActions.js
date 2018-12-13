export var PlanetMapUIActions;
(function (PlanetMapUIActions) {
    PlanetMapUIActions.focusOnPlanet = 'ui.planetMap.focusOnPlanet';
    PlanetMapUIActions.requestFocusOnMyPlanets = 'ui.planetMap.requestFocusOnMyPlanets';
    PlanetMapUIActions.removePlanetFocus = 'ui.planetMap.removePlanetFocus';
    PlanetMapUIActions.setAttackMode = 'ui.planetMap.setAttackMode';
    PlanetMapUIActions.setCreatePlanetMode = 'ui.planetMap.setCreatePlanetMode';
    PlanetMapUIActions.onPlanetIdClick = 'ui.planetMap.onPlanetIdClick';
    PlanetMapUIActions.onPlanetIdSelected = 'ui.planetMap.onPlanetIdSelected';
    PlanetMapUIActions.onBackgroundClick = 'ui.planetMap.onBackgroundClick';
    PlanetMapUIActions.requestCreatePhaserGame = 'ui.planetMap.requestCreatePhaserGame';
    PlanetMapUIActions.destroyPhaserGame = 'ui.planetMap.destroyPhaserGame';
    /**
     * Called by the ui when is mounted
     */
    PlanetMapUIActions.onMount = 'ui.planetMap.onMount';
    PlanetMapUIActions.onUnmount = 'ui.planetMap.onUnmount';
    PlanetMapUIActions.setIsGamePaused = 'ui.planetMap.setIsGamePaused';
    /**
     * Called by the ui to tell the reducer when the phaser game started.
     */
    PlanetMapUIActions.onPhaserGameCreated = 'ui.planetMap.onPhaserGameCreated';
})(PlanetMapUIActions || (PlanetMapUIActions = {}));
//# sourceMappingURL=PlanetMapUIActions.js.map