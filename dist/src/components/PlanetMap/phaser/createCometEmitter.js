import Phaser from "phaser";
var RandomZone = Phaser.GameObjects.Particles.Zones.RandomZone;
var Point = Phaser.Geom.Point;
var DeathZone = Phaser.GameObjects.Particles.Zones.DeathZone;
export var createCometEmitter = function (scene) {
    var inclination = 150;
    var emitterRect = new Phaser.Geom.Rectangle(-5000, -5000, 10000, 10000);
    var emitter = scene.add.particles('particle1').createEmitter({
        name: 'particle1',
        x: 0,
        y: 0,
        lifespan: 30000,
        gravityX: 0,
        gravityY: 0,
        // Angle of emission
        angle: inclination,
        frequency: 500,
        maxParticles: 500,
        collideBottom: false,
        collideLeft: false,
        collideRight: false,
        collideTop: false,
        speed: { min: 50, max: 550 },
        scaleY: { min: 0.2, max: 1 },
        scaleX: { min: 0.8, max: 1 },
        alpha: { min: 0.2, max: 1, start: 1, end: 0 },
        blendMode: Phaser.BlendModes.NORMAL,
        // Particle image rotation
        rotate: inclination,
        emitZone: new RandomZone(emitterRect),
    });
    // Kill particles reaching the death zone
    var thickness = 1000;
    // const deathRect = new Phaser.Geom.Rectangle(emitterRect.x - offset, emitterRect.y + emitterRect.height, emitterRect.width + offset * 2, emitterRect.height);
    var deathRect = new Phaser.Geom.Polygon([
        // Start with bottom right for U shape
        new Point(emitterRect.right + thickness, emitterRect.bottom + thickness),
        new Point(emitterRect.left - thickness, emitterRect.bottom + thickness),
        new Point(emitterRect.left - thickness, emitterRect.top - thickness),
        new Point(emitterRect.left, emitterRect.top - thickness),
        new Point(emitterRect.left, emitterRect.bottom),
        new Point(emitterRect.left + emitterRect.width, emitterRect.bottom),
        new Point(emitterRect.left + emitterRect.width, emitterRect.top - thickness),
        new Point(emitterRect.right + thickness, emitterRect.top - thickness),
    ]);
    emitter.deathZone = new DeathZone(deathRect, true);
    var DEBUG_DEATH_ZONE = false;
    if (DEBUG_DEATH_ZONE) {
        var graphics = scene.add.graphics({ x: 0, y: 0 });
        graphics.fillStyle(0xFF33ff);
        graphics.fillPoints(deathRect.points);
    }
    return emitter;
};
//# sourceMappingURL=createCometEmitter.js.map