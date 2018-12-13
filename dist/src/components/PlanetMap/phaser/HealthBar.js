var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Phaser from "phaser";
var Graphics = Phaser.GameObjects.Graphics;
import * as chroma from 'chroma-js';
var Container = Phaser.GameObjects.Container;
var HealthBar = /** @class */ (function (_super) {
    __extends(HealthBar, _super);
    function HealthBar(scene, planet) {
        var _this = _super.call(this, scene) || this;
        _this.isDirty = true;
        _this.setPlanet(planet);
        _this.graphics = new Graphics(scene);
        _this.add(_this.graphics);
        return _this;
    }
    HealthBar.prototype.destroy = function () {
        this.graphics.destroy();
        _super.prototype.destroy.call(this);
    };
    HealthBar.prototype.setPlanet = function (planet) {
        if (!this.isDirty) {
            this.isDirty = this.planet !== planet;
        }
        this.planet = planet;
    };
    HealthBar.prototype.update = function () {
        if (!this.isDirty || !this.planet) {
            return;
        }
        this.isDirty = false;
        this.graphics.clear();
        var _a = this.planet, radius = _a.radius, x = _a.x, y = _a.y, color = _a.color, units = _a.units, capacity = _a.capacity;
        var healthBarPercentSize = 0.6;
        var backgroundColor = Phaser.Display.Color.HexStringToColor(chroma(color).darken(1.6).hex()).color;
        var foregroundColor = Phaser.Display.Color.HexStringToColor(chroma(color).hex()).color;
        // Background
        this.graphics.fillStyle(backgroundColor);
        var backgroundWidth = radius * 2 * healthBarPercentSize;
        var backgroundRectProps = {
            x: -backgroundWidth / 2,
            y: radius + 5,
            width: backgroundWidth,
            height: 5,
        };
        var backgroundRect = new Phaser.Geom.Rectangle(backgroundRectProps.x, backgroundRectProps.y, backgroundRectProps.width, backgroundRectProps.height);
        this.graphics.fillRectShape(backgroundRect);
        // Fill
        this.graphics.fillStyle(foregroundColor);
        var fillRectProps = __assign({}, backgroundRectProps, { width: units / capacity * backgroundRectProps.width });
        var fillRect = new Phaser.Geom.Rectangle(fillRectProps.x, fillRectProps.y, fillRectProps.width, fillRectProps.height);
        this.graphics.fillRectShape(fillRect);
        this.graphics.x = x;
        this.graphics.y = y;
    };
    return HealthBar;
}(Container));
export { HealthBar };
//# sourceMappingURL=HealthBar.js.map