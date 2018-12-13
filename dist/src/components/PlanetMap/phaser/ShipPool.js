import { EnhancedImage } from "./EnhancedImage";
var ShipPool = /** @class */ (function () {
    function ShipPool(scene, color) {
        this.pool = [];
        this.scene = scene;
        this.color = color;
        this.createNewBatch(100);
    }
    ShipPool.prototype.getShip = function () {
        var shipImage = this.getShipImageFromPoolWithoutScene();
        if (!shipImage) {
            this.createNewBatch(50);
            shipImage = this.createShipImage();
        }
        shipImage.visible = true;
        return shipImage;
    };
    ShipPool.prototype.createNewBatch = function (i) {
        while (i--) {
            this.createShipImage();
        }
    };
    ShipPool.prototype.createShipImage = function () {
        var ship = new EnhancedImage({ scene: this.scene, key: "ship_" + this.color });
        ship.active = false;
        this.pool.push(ship);
        return ship;
    };
    ShipPool.prototype.getShipImageFromPoolWithoutScene = function () {
        return this.pool.filter(function (image) { return !image.active; })[0];
    };
    return ShipPool;
}());
export { ShipPool };
//# sourceMappingURL=ShipPool.js.map