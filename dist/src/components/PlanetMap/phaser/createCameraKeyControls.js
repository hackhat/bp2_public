import Phaser from "phaser";
export var createCameraKeyControls = function (scene, mainCamera) {
    var keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    var keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    var keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    var keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    var keyQ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    var keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    var controlConfig = {
        camera: mainCamera,
        left: keyA,
        right: keyD,
        up: keyW,
        down: keyS,
        zoomIn: keyQ,
        zoomOut: keyE,
        speed: 1,
        zoomSpeed: 0.01,
    };
    return new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
};
//# sourceMappingURL=createCameraKeyControls.js.map