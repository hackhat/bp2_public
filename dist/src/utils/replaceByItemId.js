import * as _ from "lodash";
export var replaceByItemId = function (array, newItem) {
    var index = _.findIndex(array, { id: newItem.id });
    if (index === -1) {
        return array;
    }
    var arrayCopy = array.slice();
    arrayCopy[index] = newItem;
    return arrayCopy;
};
//# sourceMappingURL=replaceByItemId.js.map