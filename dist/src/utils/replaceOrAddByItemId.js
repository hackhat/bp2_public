import * as _ from "lodash";
import { replaceByItemId } from "./replaceByItemId";
export var replaceOrAddByItemId = function (array, newItem) {
    var index = _.findIndex(array, { id: newItem.id });
    if (index !== -1) {
        return replaceByItemId(array, newItem);
    }
    return array.concat([newItem]);
};
//# sourceMappingURL=replaceOrAddByItemId.js.map