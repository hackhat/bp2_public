import { filter } from "rxjs/operators";
export var ofTypes = function () {
    var types = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        types[_i] = arguments[_i];
    }
    return (filter(function (action) { return types.includes(action.type); }));
};
//# sourceMappingURL=ofTypes.js.map