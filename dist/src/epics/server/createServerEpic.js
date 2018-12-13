import { combineEpics } from 'redux-observable';
import { batchPerformanceActionsEpic } from "../batchPerformanceActionsEpic";
import { requestStartGameWithEpic } from "./requestStartGameWithEpic";
import { requestShipStreamEpic } from "./requestShipStreamEpic";
import { shipStreamEpic } from "./shipStreamEpic";
import { addPlanetUnitsEpic } from "./addPlanetUnitsEpic";
import { shipArriveListenerEpic } from "./shipArriveListenerEpic";
import { botsEpic } from "./botsEpic";
import { giveawayResourcesEpic } from "./giveawayResourcesEpic";
import { requestCreatePlanetEpic } from "./requestCreatePlanetEpic";
import { requestSendShipEpic } from "./requestSendShipEpic";
import { gameLifeCycleEpic } from "./gameLifeCycleEpic";
import { requestLoginRoomEpic } from "./requestLoginRoomEpic";
import { onNewSocketClientConnectedEpic } from "./onNewSocketClientConnectedEpic";
import { unpackServerBroadcastActionsEpic } from "./unpackServerBroadcastActionsEpic";
import { requestDeleteShipStreamEpic } from "./requestDeleteShipStreamEpic";
import { authorizedExitRoomEpic } from "./authorizedExitRoomEpic";
import { requestChatSendMessageEpic } from "./requestChatSendMessageEpic";
import { cleanUpProtectedPlanetsEpic } from "./cleanUpProtectedPlanetsEpic";
import { authorizeRawClientActionsEpic } from "./authorizeRawClientActionsEpic";
import { unpackGenericAuthorizedActionsEpic } from "./unpackGenericAuthorizedActionsEpic";
import { updateRoomDepositsEpic } from "./updateRoomDepositsEpic";
import { requestUpgradeEpic } from "./requestUpgradeEpic";
import { createNewEmptyPlanetsEpic } from "./createNewEmptyPlanetsEpic";
export var createServerEpic = function (store) {
    return combineEpics(createNewEmptyPlanetsEpic(store), requestUpgradeEpic(store), updateRoomDepositsEpic(store), requestShipStreamEpic(store), requestStartGameWithEpic(store), shipStreamEpic(store), addPlanetUnitsEpic(store), shipArriveListenerEpic(store), botsEpic(store), requestChatSendMessageEpic(store), cleanUpProtectedPlanetsEpic(store), giveawayResourcesEpic(store), requestCreatePlanetEpic(store), requestLoginRoomEpic(store), requestSendShipEpic(store), gameLifeCycleEpic(store), batchPerformanceActionsEpic(), onNewSocketClientConnectedEpic(store), unpackServerBroadcastActionsEpic(store), authorizeRawClientActionsEpic(store), requestDeleteShipStreamEpic(store), unpackGenericAuthorizedActionsEpic(store), authorizedExitRoomEpic(store));
};
//# sourceMappingURL=createServerEpic.js.map