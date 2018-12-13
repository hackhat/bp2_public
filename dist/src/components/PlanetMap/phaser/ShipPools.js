import { shipColorsArray } from "../../../constants/playerColorsArray";
import { ShipPool } from "./ShipPool";
export var removeGameObjectFromScene = function (scene, gameObject) {
    scene.sys.displayList.remove(gameObject);
    scene.sys.updateList.remove(gameObject);
    gameObject.active = false;
    gameObject.visible = false;
};
export var addGameObjectToScene = function (scene, gameObject) {
    scene.sys.displayList.add(gameObject);
    gameObject.active = true;
    gameObject.visible = true;
};
var ShipPools = /** @class */ (function () {
    function ShipPools(scene) {
        var _this = this;
        this.pools = {};
        this.scene = scene;
        shipColorsArray.forEach(function (color) {
            _this.pools[color] = new ShipPool(_this.scene, color);
        });
    }
    ShipPools.prototype.getShipByColor = function (color) {
        return this.pools[color].getShip();
    };
    return ShipPools;
}());
export { ShipPools };
//# sourceMappingURL=ShipPools.js.map