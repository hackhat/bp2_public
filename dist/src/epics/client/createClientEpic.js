import { combineEpics } from 'redux-observable';
import { batchPerformanceActionsEpic } from "../batchPerformanceActionsEpic";
import { planetMapUIEpic } from "../../components/PlanetMap/planetMapUIEpic";
import { dateSyncEpic } from "./dateSyncEpic";
import { autoLoginEpic } from "./autoLoginEpic";
import { dispatchClientToServerActionsEpic } from "./dispatchClientToServerActionsEpic";
import { serverToClientActionEpic } from "./serverToClientActionEpic";
import { clientToServerActionEpic } from "./clientToServerActionEpic";
import { toastEpic } from "./toastEpic";
import { spawnPlayerEpic } from "./spawnPlayerEpic";
import { focusOnPlanetEpic } from "./focusOnPlanetEpic";
import { tutorialEpic } from "./tutorialEpic";
import { loginRoomAgainOnReconnectEpic } from "./loginRoomAgainOnReconnectEpic";
import { globalActionsToCurrentPlayerActionEpic } from "./globalActionsToCurrentPlayerActionEpic";
import { requestEmailEpic } from "./requestEmailEpic";
import { addMoreMoneyEpic } from "./addMoreMoneyEpic";
export var createClientEpic = function (api, store) {
    return combineEpics(dateSyncEpic(api, store), autoLoginEpic(api, store), addMoreMoneyEpic(api, store), serverToClientActionEpic(api, store), clientToServerActionEpic(api, store), dispatchClientToServerActionsEpic(api, store), toastEpic(api, store), batchPerformanceActionsEpic(), spawnPlayerEpic(api, store), focusOnPlanetEpic(api, store), requestEmailEpic(api, store), loginRoomAgainOnReconnectEpic(api, store), tutorialEpic(api, store), globalActionsToCurrentPlayerActionEpic(api, store), planetMapUIEpic(api, store));
};
//# sourceMappingURL=createClientEpic.js.map