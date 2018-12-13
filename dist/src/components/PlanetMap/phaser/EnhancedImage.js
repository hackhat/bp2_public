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
import Phaser from 'phaser';
var Image = Phaser.GameObjects.Image;
/**
 * A way to avoid setting the same property again and killing performance.
 * For example if you set the opacity to 1 twice, then it should only actually
 * call the GPU once, that's what this class is doing.
 */
var EnhancedImage = /** @class */ (function (_super) {
    __extends(EnhancedImage, _super);
    function EnhancedImage(props) {
        var _this = this;
        var _a = __assign({ x: 0, y: 0, key: '' }, props), scene = _a.scene, x = _a.x, y = _a.y, key = _a.key, frame = _a.frame;
        _this = _super.call(this, scene, x, y, key, frame) || this;
        return _this;
    }
    EnhancedImage.prototype.setPerfAlpha = function (value) {
        // @ts-ignore
        if (this._alpha !== value) {
            this.alpha = value;
        }
    };
    EnhancedImage.prototype.setTexture = function (key, frame) {
        if (!this.texture || this.texture.key !== key) {
            return _super.prototype.setTexture.call(this, key, frame);
        }
        return this;
    };
    return EnhancedImage;
}(Image));
export { EnhancedImage };
EnhancedImage.prototype = Object.assign(EnhancedImage.prototype);
//# sourceMappingURL=EnhancedImage.js.map