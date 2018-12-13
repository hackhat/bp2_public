export var SystemActions;
(function (SystemActions) {
    SystemActions.serverStart = 'system.serverStart';
    SystemActions.batchPerformance = 'system.batchPerformance';
    SystemActions.appStart = 'system.appStart';
    // Client side
    SystemActions.requestConnectToRoom = 'system.requestConnectToRoom';
    // Client side
    SystemActions.connectedToRoom = 'system.connectedToRoom';
    SystemActions.disconnect = 'system.disconnect';
    SystemActions.setAverageFps = 'system.setAverageFps';
    SystemActions.newGame = 'system.newGame';
    // Server side: It will try to start a game until all preconditions are valid.
    SystemActions.requestNewGame = 'system.requestNewGame';
    // Sent just before the game is about to be restarted, after the game end
    SystemActions.cleanUpGameData = 'system.cleanUpGameData';
    SystemActions.gameEnd = 'system.gameEnd';
    SystemActions.sendClientToServerAction = 'system.sendClientToServerAction';
    SystemActions.rawClientAction = 'system.rawClientAction';
    SystemActions.setServerDateOffset = 'system.setServerDateOffset';
    SystemActions.setServerDate = 'system.setServerDate';
    SystemActions.requestStartGameWith = 'system.requestStartGameWith';
    SystemActions.startGameWithError = 'system.startGameWithError';
    SystemActions.startGameWith = 'system.startGameWith';
    SystemActions.serverBroadcastAction = 'system.serverBroadcastAction';
    SystemActions.serverToSingleClientAction = 'system.serverToSingleClientAction';
    SystemActions.setGameState = 'system.setGameState';
    SystemActions.clientSideSocketChange = 'system.clientSideSocketChange';
    SystemActions.onNewSocketClientConnected = 'system.onNewSocketClientConnected';
    SystemActions.authorizedClientAction = 'system.authorizedClientAction';
    SystemActions.clientDisconnected = 'system.clientDisconnected';
    SystemActions.startDemoGame = 'system.startDemoGame';
    SystemActions.currentPlayerStartGameWith = 'system.currentPlayerStartGameWith';
    SystemActions.setRequestEmailDialogVisibility = 'system.setRequestEmailDialogVisibility';
    SystemActions.stopGameLifeCycle = 'system.stopGameLifeCycle';
    SystemActions.setPublicSetting = 'system.setPublicSetting';
})(SystemActions || (SystemActions = {}));
//# sourceMappingURL=SystemActions.js.map