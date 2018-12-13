export var PlayerActions;
(function (PlayerActions) {
    PlayerActions.setCurrentPlayerId = 'player.setCurrentPlayerId';
    PlayerActions.addMany = 'player.addMany';
    PlayerActions.addResources = 'player.addResources';
    // @todo: rename to request join room, update toastepic
    PlayerActions.requestRoomLogin = 'player.requestRoomLogin';
    PlayerActions.requestRoomLoginError = 'player.requestRoomLoginError';
    PlayerActions.onRoomLogin = 'player.onRoomLogin';
    PlayerActions.exitRoom = 'player.exitRoom';
    PlayerActions.onCurrentPlayerRoomLogin = 'player.onCurrentPlayerRoomLogin';
    PlayerActions.currentPlayerExitRoom = 'player.currentPlayerExitRoom';
    PlayerActions.setName = 'player.setName';
    PlayerActions.planetKilled = 'player.planetKilled';
    PlayerActions.addResourcesToMany = 'player.addResourcesToMany';
    PlayerActions.removeAllPlayers = 'player.removeAllPlayers';
    PlayerActions.loggingInPlayer = 'player.loggingInPlayer';
    PlayerActions.depositsReleased = 'player.depositsReleased';
})(PlayerActions || (PlayerActions = {}));
//# sourceMappingURL=PlayerActions.js.map