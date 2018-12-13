import { selectors } from "../../reducers";
/**
 * Is a bit hacky as it depends on the game to be in the store.
 * The reason is that is too much work to pass all args.
 */
export var getDomPositionFromGamePosition = function (state, gamePosition) {
    var _a = selectors.ui.planetMap.getUI(state), getGame = _a.getGame, getCanvasElement = _a.getCanvasElement;
    if (!getGame)
        return null;
    var game = getGame();
    if (!getCanvasElement)
        return null;
    var canvasElement = getCanvasElement();
    var scene = game.scene.getAt(0);
    if (!scene)
        throw new Error("No scene");
    var camera = scene.cameras.main;
    var bbox = canvasElement.getBoundingClientRect();
    var domPosition = {
        x: bbox.width / 2 + bbox.x - (camera.midPoint.x - gamePosition.x) * camera.zoom,
        y: bbox.height / 2 + bbox.y - (camera.midPoint.y - gamePosition.y) * camera.zoom,
    };
    return domPosition;
};
//# sourceMappingURL=getDomPositionFromGamePosition.js.map