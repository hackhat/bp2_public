import { createUser } from "./createUser";
import { updateUser } from "./updateUser";
import { login } from "./login";
import { getUserFromSessionId } from "./getUserFromSessionId";
import { getAccountsByIds } from "./getAccountsByIds";
import { registerRoomServer } from "./registerRoomServer";
import { roomServerPingUpdate } from "./roomServerPingUpdate";
import { addDeposit } from "./addDeposit";
import { getDeposit } from "./getDeposit";
import { releaseDepositsFromOldRoomServersTask } from "./releaseDepositsFromOldRoomServersTask";
import { getRoomDeposits } from "./getRoomDeposits";
import { processGameEnd } from "./processGameEnd";
import { increasePlayMoney } from "./increasePlayMoney";
export var globalServices = {
    registerRoomServer: registerRoomServer,
    createUser: createUser,
    roomServerPingUpdate: roomServerPingUpdate,
    updateUser: updateUser,
    login: login,
    getAccountsByIds: getAccountsByIds,
    getUserFromSessionId: getUserFromSessionId,
    getRoomDeposits: getRoomDeposits,
    getDeposit: getDeposit,
    addDeposit: addDeposit,
    releaseDepositsFromOldRoomServersTask: releaseDepositsFromOldRoomServersTask,
    processGameEnd: processGameEnd,
    increasePlayMoney: increasePlayMoney,
};
//# sourceMappingURL=_index.js.map