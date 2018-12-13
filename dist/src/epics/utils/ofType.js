import { filter } from "rxjs/operators";
export var ofType = function (type) { return (filter(function (action) { return action.type === type; })); };
//# sourceMappingURL=ofType.js.map