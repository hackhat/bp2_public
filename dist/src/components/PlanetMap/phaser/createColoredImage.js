var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import * as chroma from "chroma-js";
import { canvasToImage } from "./canvasToImage";
var forEachPixel = function (outputPixelArray, fn) {
    for (var p = 0; p < outputPixelArray.length / 4; p++) {
        var index = 4 * p;
        var rIndex = index;
        var gIndex = ++index;
        var bIndex = ++index;
        var alphaIndex = ++index;
        fn({ r: rIndex, g: gIndex, b: bIndex, alpha: alphaIndex });
    }
};
export var createColoredImage = function (baseSourceImage, maskColor1SourceImage, color) { return __awaiter(_this, void 0, void 0, function () {
    var width, height, chromaColor, outputCanvas, outputContext, outputImageData, outputPixelArray, maskCanvas, maskContext, maskImageData, maskPixelArray, p, index, rIndex, gIndex, bIndex, alphaIndex, colorPercent, alphaPercent, pixelAlpha, outputImageElement, DEBUG_CANVAS;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                width = baseSourceImage.width;
                height = baseSourceImage.height;
                chromaColor = chroma(color);
                outputCanvas = document.createElement('canvas');
                outputCanvas.width = width;
                outputCanvas.height = height;
                outputContext = outputCanvas.getContext("2d");
                if (!outputContext) {
                    return [2 /*return*/];
                }
                outputContext.save();
                outputContext.drawImage(baseSourceImage, 0, 0);
                outputImageData = outputContext.getImageData(0, 0, width, height);
                outputPixelArray = outputImageData.data;
                maskCanvas = document.createElement('canvas');
                maskCanvas.width = width;
                maskCanvas.height = height;
                maskContext = maskCanvas.getContext("2d");
                if (!maskContext) {
                    return [2 /*return*/];
                }
                maskContext.save();
                maskContext.drawImage(maskColor1SourceImage, 0, 0);
                maskImageData = maskContext.getImageData(0, 0, width, height);
                maskPixelArray = maskImageData.data;
                for (p = 0; p < outputPixelArray.length / 4; p++) {
                    index = 4 * p;
                    rIndex = index;
                    gIndex = ++index;
                    bIndex = ++index;
                    alphaIndex = ++index;
                    colorPercent = (maskPixelArray[rIndex] + maskPixelArray[gIndex] + maskPixelArray[gIndex]) / 3 / 255;
                    alphaPercent = maskPixelArray[alphaIndex] / 255;
                    pixelAlpha = (1 - colorPercent) * alphaPercent;
                    maskPixelArray[rIndex] = chromaColor.get('rgb.r');
                    maskPixelArray[gIndex] = chromaColor.get('rgb.g');
                    maskPixelArray[bIndex] = chromaColor.get('rgb.b');
                    maskPixelArray[alphaIndex] = pixelAlpha * 255;
                }
                maskContext.putImageData(maskImageData, 0, 0);
                outputContext.globalCompositeOperation = 'multiply';
                outputContext.save();
                outputContext.drawImage(maskCanvas, 0, 0);
                return [4 /*yield*/, canvasToImage(outputCanvas)];
            case 1:
                outputImageElement = _a.sent();
                DEBUG_CANVAS = false;
                if (DEBUG_CANVAS) {
                    outputCanvas.title = 'outputCanvas';
                    maskCanvas.title = 'maskCanvas';
                    outputImageElement.title = 'outputImageElement';
                    document.body.appendChild(outputCanvas);
                    document.body.appendChild(maskCanvas);
                    document.body.appendChild(outputImageElement);
                }
                return [2 /*return*/, outputImageElement];
        }
    });
}); };
//# sourceMappingURL=createColoredImage.js.map