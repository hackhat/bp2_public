import * as _ from "lodash";
export var selectRandomFromArray = function (array) {
    return array[_.random(0, array.length - 1, false)];
};
//# sourceMappingURL=selectRandomFromArray.js.map