var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import * as React from 'react';
import { connect } from 'react-redux';
import { createAppAction, createSendClientToServerAction } from '../../../actions';
import { selectors } from '../../../reducers';
import { AttackMode, PlanetType } from '../../../interfaces';
import { css } from 'emotion';
import Phaser from 'phaser';
import planetSelectionImageUrl from '../../../icons/Planets_planetSelection.png';
import shipImageUrl from '../../../icons/Planets_ship.png';
import shipMaskColor1ImageUrl from '../../../icons/Planets_shipMaskColor1.png';
import pipeImageUrl from '../../../icons/Planets_pipe.png';
import type1ColorImageUrl from '../../../icons/Planets_type1Color.png';
import type1Mask1ImageUrl from '../../../icons/Planets_type1Mask1.png';
import type2ColorImageUrl from '../../../icons/Planets_type2Color.png';
import type2Mask1ImageUrl from '../../../icons/Planets_type2Mask1.png';
import particle1ImageUrl from '../../../icons/Planets_particle1.png';
import { getDateFromClientSideOffset } from '../../../utils/getDateFromClientSideOffset';
import calculateShipLocation from '../../../utils/calculateShipLocation';
import { PlanetMapUIActions } from '../PlanetMapUIActions';
import { HealthBar } from './HealthBar';
import * as Hammer from 'hammerjs';
import planetToPoint from "../../../utils/planetToPoint";
import { calculateAngleInRadBetween2Points } from "../../../utils/calculateAngleInRadBetween2Points";
import { ShipActions } from "../../../actions/ShipActions";
import { createCometEmitter } from "./createCometEmitter";
import { createShipColoredImages } from "./createShipColoredImages";
import { createPlanetColoredImages } from "./createPlanetColoredImages";
import * as chroma from 'chroma-js';
import { SHIP_STREAM_RESOURCE_COST } from "../../../epics/server/requestShipStreamEpic";
import * as moment from "moment";
import { calculateShipPath } from "../../../utils/calculateShipPath";
import { StoreConsumer } from "../../contexts/Store";
import { SystemActions } from "../../../actions/SystemActions";
import styled from "react-emotion";
import { FPSCounter } from "../../../utils/FPSCounter";
import { addGameObjectToScene, removeGameObjectFromScene, ShipPools } from "./ShipPools";
import { EnhancedImage } from "./EnhancedImage";
import { isProduction } from "../../../utils/isProduction";
import { getRandomPointInCircle } from "../../../maps/utils/getRandomPointInCircle";
import { selectRandomFromArray } from "../../../utils/selectRandomFromArray";
import { createColoredDots } from "./createColoredDots";
import { wrapPhaserGameObjectForReduxDevTools } from "../../../utils/wrapPhaserGameObjectForReduxDevTools";
import generateUniqueId from "../../../utils/generateUniqueId";
import { formatResources } from "../../../utils/formatResources";
import { ToastActions } from "../../../actions/ToastActions";
var SHIP_FIX_ROTATION = Phaser.Math.DegToRad(90);
var Root = styled("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n"], ["\n  width: 100%;\n  height: 100%;\n"])));
var rootClassName = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  transform-origin: top left;\n  background: black;\n"], ["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  transform-origin: top left;\n  background: black;\n"])));
var ENABLE_DYNAMIC_BACKGROUND = false;
var PlanetsPhaser = /** @class */ (function (_super) {
    __extends(PlanetsPhaser, _super);
    function PlanetsPhaser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.planetsGO = {};
        _this.shipsGO = {};
        _this.shipStreamsGO = {};
        _this.loaded = false;
        _this.backgroundZonePointerDown = false;
        _this.FPSCounter = new FPSCounter();
        _this.previousSelectedPlanet = null;
        _this.pointerDownPlanetId = null;
        _this.sendingShipToPlanetId = null;
        _this.onRoot = function (root) {
            _this.rootElement = root;
        };
        _this.onCanvas = function (canvas) {
            _this.canvasElement = canvas;
        };
        _this.preload = function () {
            var scene = _this.getScene();
            if (!scene)
                return;
            scene.load.image('planetSelection', planetSelectionImageUrl);
            scene.load.image('ship', shipImageUrl);
            scene.load.image('shipMaskColor1', shipMaskColor1ImageUrl);
            scene.load.image('pipe', pipeImageUrl);
            scene.load.image('planetType1Color', type1ColorImageUrl);
            scene.load.image('planetType1Mask1', type1Mask1ImageUrl);
            scene.load.image('planetType2Color', type2ColorImageUrl);
            scene.load.image('planetType2Mask1', type2Mask1ImageUrl);
            scene.load.image('particle1', particle1ImageUrl);
        };
        _this.create = function () { return __awaiter(_this, void 0, void 0, function () {
            var scene, pinch, pan, initialZoom, mainCamera, canvasElement;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.canvasElement)
                            return [2 /*return*/];
                        scene = this.getScene();
                        if (!scene)
                            return [2 /*return*/];
                        this.containers = {
                            backgroundZone: scene.add.container(0, 0),
                            planetSelection: scene.add.container(0, 0),
                            shipStreams: scene.add.container(0, 0),
                            planets: scene.add.container(0, 0),
                            ships: scene.add.container(0, 0),
                            planetsHealth: scene.add.container(0, 0),
                            planetNames: scene.add.container(0, 0),
                            dynamicBackground: scene.add.container(0, 0),
                            ui: scene.add.container(0, 0),
                        };
                        // set container order
                        [
                            this.containers.backgroundZone,
                            this.containers.planetSelection,
                            this.containers.shipStreams,
                            this.containers.dynamicBackground,
                            this.containers.planets,
                            this.containers.planetsHealth,
                            this.containers.planetNames,
                            this.containers.ships,
                            this.containers.ui,
                        ].forEach(function (container, index) {
                            container.depth = index;
                        });
                        if (!ENABLE_DYNAMIC_BACKGROUND) return [3 /*break*/, 2];
                        // Waiting for this bug to be fixed: https://github.com/photonstorm/phaser/issues/3958
                        // Needs to be scaled as well once fixed.
                        // This breaks the rest of the game and you can't click.
                        // @ts-ignore
                        scene.game.config.width = 15000;
                        // @ts-ignore
                        scene.game.config.height = 15000;
                        this.renderTextureBackground = scene.add.renderTexture(0, 0, 15000, 15000);
                        this.renderTextureBackground.setOrigin(0.5, 0.5);
                        // @ts-ignore
                        this.renderTextureBackground.draw('ship', 0, 0);
                        // @ts-ignore
                        this.renderTextureBackground.draw('ship', 100, 100);
                        // @ts-ignore
                        this.renderTextureBackground.draw('ship', 0, 14000);
                        // @ts-ignore
                        this.renderTextureBackground.draw('ship', 14000, 0);
                        // @ts-ignore
                        this.renderTextureBackground.draw('ship', 14000, 14000);
                        this.containers.dynamicBackground.add(this.renderTextureBackground);
                        return [4 /*yield*/, createColoredDots(scene)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.hammer = new Hammer.Manager(this.canvasElement);
                        pinch = new Hammer.Pinch();
                        pan = new Hammer.Pan({
                            threshold: 5,
                        });
                        this.hammer.add([pinch, pan]);
                        initialZoom = 1;
                        this.hammer.on('pinchstart', function (event) {
                            initialZoom = mainCamera.zoom;
                        });
                        this.hammer.on('pinchmove', function (event) {
                            _this.backgroundZonePointerDown = false;
                            mainCamera.zoom = initialZoom * event.scale;
                        });
                        this.hammer.on('pinchend', function (event) {
                            initialZoom = 1;
                        });
                        this.hammer.on('panmove', function (event) {
                            var panningMap = _this.pointerDownPlanetId === null;
                            if (panningMap) {
                                _this.backgroundZonePointerDown = false;
                                var resolution = _this.getGameSettings().resolution;
                                _this.pan = { x: event.deltaX * resolution, y: event.deltaY * resolution };
                                if (_this.previousPan) {
                                    mainCamera.scrollX += (_this.previousPan.x - _this.pan.x) / mainCamera.zoom;
                                    mainCamera.scrollY += (_this.previousPan.y - _this.pan.y) / mainCamera.zoom;
                                }
                                _this.previousPan = __assign({}, _this.pan);
                            }
                        });
                        this.hammer.on('panend', function () {
                            var currentPlayerId = selectors.ui.global.getCurrentPlayerId(_this.getAppState());
                            if (_this.pointerDownPlanetId && _this.sendingShipToPlanetId && currentPlayerId) {
                                var units = selectors.planets.getEstimatedUnitsToSendByShipFromPlanet(_this.getAppState(), _this.pointerDownPlanetId);
                                var shipDataRequest = {
                                    units: units,
                                    fromPlanetId: _this.pointerDownPlanetId,
                                    toPlanetId: _this.sendingShipToPlanetId,
                                    ownerId: currentPlayerId,
                                };
                                var attackMode = selectors.ui.planetMap.getUI(_this.getAppState()).attackMode;
                                if (attackMode === AttackMode.ship) {
                                    var canCreateShipRes = selectors.advanced.canCreateShip(_this.getAppState(), __assign({}, shipDataRequest, { authenticatedPlayerId: currentPlayerId }));
                                    if (canCreateShipRes.ok) {
                                        _this.props.requestSendShip(shipDataRequest);
                                    }
                                    else {
                                        _this.props.addError(canCreateShipRes.err);
                                    }
                                }
                                else if (attackMode === AttackMode.shipStream) {
                                    var canCreateShipStream = selectors.advanced.canCreateShipStream(_this.getAppState(), {
                                        fromPlanetId: shipDataRequest.fromPlanetId,
                                        toPlanetId: shipDataRequest.toPlanetId,
                                        authenticatedPlayerId: currentPlayerId,
                                    });
                                    if (canCreateShipStream.ok) {
                                        _this.props.requestSendShipStream(shipDataRequest);
                                    }
                                    else {
                                        _this.props.addError(canCreateShipStream.err);
                                    }
                                }
                            }
                            _this.pointerDownPlanetId = null;
                            _this.backgroundZonePointerDown = false;
                            _this.pan = undefined;
                            _this.previousPan = undefined;
                        });
                        mainCamera = scene.cameras.main;
                        mainCamera.centerOn(0, 0);
                        mainCamera.zoom = 0.05;
                        this.canvasElement.addEventListener('wheel', function (e) {
                            if (e.deltaY < 0) {
                                mainCamera.zoomTo(mainCamera.zoom * 1.2, 10);
                            }
                            else {
                                mainCamera.zoomTo(mainCamera.zoom * 0.8, 10);
                            }
                            e.preventDefault();
                        });
                        this.planetSelectionSprite = new EnhancedImage({ scene: scene, key: 'planetSelection' });
                        scene.add.existing(this.planetSelectionSprite);
                        this.containers.planetSelection.add(this.planetSelectionSprite);
                        this.planetSelectionSprite.setPerfAlpha(0);
                        this.backgroundZone = scene.add.zone(0, 0, 100000, 100000);
                        this.containers.backgroundZone.add(this.backgroundZone);
                        this.backgroundZone.setInteractive();
                        this.backgroundZone.on('pointerdown', function (e) {
                            _this.backgroundZonePointerDown = true;
                        });
                        this.backgroundZone.on('pointerup', function (e) {
                            if (!_this.backgroundZonePointerDown) {
                                return;
                            }
                            _this.backgroundZonePointerDown = false;
                            _this.props.onBackgroundClick({
                                x: scene.input.activePointer.worldX,
                                y: scene.input.activePointer.worldY,
                            });
                        });
                        this.countdown = scene.add.text(0, -3500, '-');
                        this.countdown.setFontSize(72);
                        this.countdown.setOrigin(0.5, 0.5);
                        this.cometEmitter = createCometEmitter(scene);
                        this.cometEmitter.stop();
                        this.cometEmitter.active = false;
                        return [4 /*yield*/, createShipColoredImages(scene)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, createPlanetColoredImages(scene)];
                    case 4:
                        _a.sent();
                        this.shipPools = new ShipPools(scene);
                        this.loaded = true;
                        canvasElement = this.canvasElement;
                        if (canvasElement && this.game) {
                            this.props.onPhaserInit(function () { return canvasElement; }, wrapPhaserGameObjectForReduxDevTools(this.game));
                        }
                        else {
                            throw new Error("this.canvasElement should not be undefined");
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.updatePlanets = function (time, delta) {
            var scene = _this.getScene();
            if (!scene)
                return;
            var planetsGO = _this.planetsGO;
            var state = _this.getAppState();
            var planetsById = selectors.planets.getPlanetsById(state);
            var playersById = selectors.players.getPlayersById(state);
            Object.values(planetsById).forEach(function (planet) {
                if (!planet)
                    return;
                if (planetsGO[planet.id] && planetsGO[planet.id].planet === planet)
                    return;
                // Create
                var owner = planet.ownerId === null ? null : playersById[planet.ownerId];
                var ownerColor = owner && owner.color;
                var textureId = "planetType1Color";
                if (planet.type === PlanetType.generic) {
                    if (ownerColor) {
                        textureId = "planetType1_" + ownerColor;
                    }
                    else {
                        textureId = "planetType1Color";
                    }
                }
                else if (planet.type === PlanetType.resource) {
                    if (ownerColor) {
                        textureId = "planetType2_" + ownerColor;
                    }
                    else {
                        textureId = "planetType2Color";
                    }
                }
                if (!isProduction && scene.textures.get(textureId).key === '__MISSING') {
                    throw new Error("Texture is missing " + textureId);
                }
                if (!planetsGO[planet.id]) {
                    // planetImage
                    var planetImage = new EnhancedImage({ scene: scene, key: textureId });
                    planetImage.setData('planetId', planet.id);
                    scene.add.existing(planetImage);
                    planetImage.x = planet.x;
                    planetImage.y = planet.y;
                    planetImage.setInteractive({ cursor: 'pointer' });
                    var pointerDown_1 = false;
                    planetImage.on('pointerdown', function () {
                        pointerDown_1 = true;
                        _this.pointerDownPlanetId = planet.id;
                    });
                    planetImage.on('pointerup', function () {
                        if (!pointerDown_1) {
                            return;
                        }
                        pointerDown_1 = false;
                        _this.props.onPlanetIdClick(planet.id);
                        _this.pointerDownPlanetId = null;
                    });
                    // name
                    var planetName = scene.add.text(planet.x, planet.y + planet.radius + 20, '');
                    planetName.setColor("white");
                    planetName.setOrigin(0.5, 0.5);
                    planetName.style.fontFamily = 'serif;';
                    // healthBar
                    var planetHealthBar = new HealthBar(scene, planet);
                    // Add to containers
                    _this.containers.planets.add(planetImage);
                    _this.containers.planetsHealth.add(planetHealthBar);
                    _this.containers.planetNames.add(planetName);
                    // Add to planetsGO
                    planetsGO[planet.id] = {
                        planetImage: planetImage,
                        healthBar: planetHealthBar,
                        name: planetName,
                        planet: undefined,
                    };
                }
                // Update
                if (planetsGO[planet.id].planet !== planet) {
                    planetsGO[planet.id].planet = planet;
                    planetsGO[planet.id].planetImage.setTexture(textureId);
                    planetsGO[planet.id].planetImage.displayWidth = planet.radius * 2;
                    planetsGO[planet.id].planetImage.displayHeight = planet.radius * 2;
                    planetsGO[planet.id].healthBar.setPlanet(planet);
                    planetsGO[planet.id].healthBar.update();
                    planetsGO[planet.id].name.setText(owner && owner.name ? owner.name : '');
                }
                if (ENABLE_DYNAMIC_BACKGROUND && Math.random() > 0.99) {
                    var radius = planet.radius + planet.range;
                    var randomOffset = getRandomPointInCircle(radius);
                    var dotSize = selectRandomFromArray([1, 2, 3, 4, 5, 10, 20, 50, 100, 200, 500, 1000, 1500]) || 1;
                    var texture = scene.textures.get("dot_" + dotSize).get();
                    var alpha = 4 / dotSize;
                    var color = Phaser.Display.Color.HexStringToColor(chroma(planet.color).hex()).color;
                    var dotX = planet.x + randomOffset.x - dotSize / 2 + 7500;
                    var dotY = planet.y + randomOffset.y - dotSize / 2 + 7500;
                    // @ts-ignore
                    _this.renderTextureBackground.draw(texture, dotX, dotY, alpha, color);
                }
            });
            // Delete
            Object.keys(planetsGO).forEach(function (planetId) {
                if (!planetsById[planetId]) {
                    var planetGOGroup = planetsGO[planetId];
                    planetGOGroup.planetImage.destroy();
                    planetGOGroup.healthBar.destroy();
                    planetGOGroup.name.destroy();
                    _this.containers.planets.remove(planetGOGroup.planetImage);
                    _this.containers.planetsHealth.remove(planetGOGroup.healthBar);
                    _this.containers.planetNames.remove(planetGOGroup.name);
                    delete planetsGO[planetId];
                }
            });
            var ui = selectors.ui.planetMap.getUI(_this.getAppState());
            var currentSelectedPlanetIdFromState = ui.selectedPlanetId !== undefined ? selectors.planets.getPlanetById(state, ui.selectedPlanetId) : null;
            if (_this.planetSelectionSprite && currentSelectedPlanetIdFromState !== _this.previousSelectedPlanet) {
                _this.previousSelectedPlanet = ui.selectedPlanetId !== undefined ? selectors.planets.getPlanetById(state, ui.selectedPlanetId) || null : null;
                if (currentSelectedPlanetIdFromState) {
                    _this.planetSelectionSprite.displayWidth = currentSelectedPlanetIdFromState.radius * 2 + currentSelectedPlanetIdFromState.range * 2;
                    _this.planetSelectionSprite.displayHeight = currentSelectedPlanetIdFromState.radius * 2 + currentSelectedPlanetIdFromState.range * 2;
                    _this.planetSelectionSprite.x = currentSelectedPlanetIdFromState.x;
                    _this.planetSelectionSprite.y = currentSelectedPlanetIdFromState.y;
                    _this.planetSelectionSprite.setPerfAlpha(0.4);
                    _this.planetSelectionSprite.tint = Phaser.Display.Color.HexStringToColor(chroma(currentSelectedPlanetIdFromState.color).hex()).color;
                }
                else {
                    _this.planetSelectionSprite.setPerfAlpha(0);
                }
            }
        };
        _this.getShipPosition = function (ship) {
            var state = _this.getAppState();
            var planetsById = selectors.planets.getPlanetsById(state);
            var clientDateOffsetInMs = selectors.ui.global.getClientDateOffsetInMs(state);
            var serverDate = getDateFromClientSideOffset(clientDateOffsetInMs);
            var fromPlanet = planetsById[ship.fromPlanetId];
            var toPlanet = planetsById[ship.toPlanetId];
            if (!fromPlanet || !toPlanet) {
                return false;
            }
            return calculateShipLocation(ship, fromPlanet, toPlanet, serverDate);
        };
        _this.updateShips = function (time, delta) {
            var scene = _this.getScene();
            if (!scene)
                return;
            var shipsGO = _this.shipsGO;
            var state = _this.getAppState();
            var shipsById = selectors.ships.getShipsById(state);
            var planetsById = selectors.planets.getPlanetsById(state);
            Object.values(shipsById).forEach(function (ship) {
                if (!ship)
                    return;
                var size = ship.units;
                // Ship is not in phaser or the ship is and is different
                if (!shipsGO[ship.id] || shipsGO[ship.id].ship !== ship) {
                    if (shipsGO[ship.id]) {
                        removeGameObjectFromScene(scene, shipsGO[ship.id].image);
                    }
                    // create
                    var fromPlanet = planetsById[ship.fromPlanetId];
                    var toPlanet = planetsById[ship.toPlanetId];
                    if (!fromPlanet || !toPlanet) {
                        return;
                    }
                    var shipImage = _this.shipPools.getShipByColor(ship.color);
                    var shipRotation = calculateAngleInRadBetween2Points(planetToPoint(fromPlanet), planetToPoint(toPlanet));
                    shipImage.setRotation(shipRotation + SHIP_FIX_ROTATION);
                    shipImage.displayWidth = size;
                    shipImage.displayHeight = size;
                    if (ship.temporary) {
                        shipImage.setPerfAlpha(0.5);
                    }
                    else {
                        shipImage.setPerfAlpha(1);
                    }
                    shipsGO[ship.id] = { image: shipImage, ship: ship };
                    _this.containers.ships.add(shipImage);
                    addGameObjectToScene(scene, shipImage);
                }
                // update
                var shipPosition = _this.getShipPosition(ship);
                if (!shipPosition) {
                    return;
                }
                shipsGO[ship.id].image.x = shipPosition.x;
                shipsGO[ship.id].image.y = shipPosition.y;
                if (ENABLE_DYNAMIC_BACKGROUND && Math.random() > 0.8) {
                    var randomOffset = getRandomPointInCircle(Math.pow(ship.units / 10, 1.5));
                    var dotSize = selectRandomFromArray([1, 2, 3, 4, 5, 10]) || 1;
                    var texture = scene.textures.get("dot_" + dotSize).get();
                    var alpha = 3 / dotSize;
                    var color = Phaser.Display.Color.HexStringToColor(chroma(ship.color).hex()).color;
                    var dotX = shipPosition.x + randomOffset.x - dotSize / 2 + 7500;
                    var dotY = shipPosition.y + randomOffset.y - dotSize / 2 + 7500;
                    // @ts-ignore
                    _this.renderTextureBackground.draw(texture, dotX, dotY, alpha, color);
                }
            });
            // Delete removed ships
            Object.keys(shipsGO).forEach(function (shipId) {
                var ship = shipsById[shipId];
                if (!ship) {
                    var shipGO = shipsGO[shipId];
                    removeGameObjectFromScene(scene, shipGO.image);
                    _this.containers.ships.remove(shipGO.image);
                    delete shipsGO[shipId];
                }
            });
        };
        _this.updateShipStreams = function (time, delta) {
            var scene = _this.getScene();
            if (!scene)
                return;
            var shipStreamsGO = _this.shipStreamsGO;
            var state = _this.getAppState();
            var shipStreamsById = selectors.ships.getShipStreams(state, { includeTemporary: true });
            var planetsById = selectors.planets.getPlanetsById(state);
            Object.values(shipStreamsById).forEach(function (shipStream) {
                if (!shipStream)
                    return;
                var fromPlanet = planetsById[shipStream.fromPlanetId];
                var toPlanet = planetsById[shipStream.toPlanetId];
                if (!fromPlanet || !toPlanet) {
                    return;
                }
                if (!shipStreamsGO[shipStream.id]) {
                    // create
                    var _a = calculateShipPath(fromPlanet, toPlanet), fromPoint = _a.fromPoint, toPoint = _a.toPoint;
                    var pathSlope = calculateAngleInRadBetween2Points(fromPoint, toPoint);
                    var pipe = scene.add.tileSprite(fromPoint.x, fromPoint.y, fromPlanet.radius + 32 * 2, 32, 'pipe');
                    pipe.setInteractive({ cursor: 'pointer' });
                    pipe.rotation = pathSlope;
                    // BUG: https://github.com/photonstorm/phaser/issues/3920
                    var isBug3920Fixed = false;
                    if (isBug3920Fixed) {
                        _this.containers.shipStreams.add(pipe);
                    }
                    else {
                        pipe.setDepth(_this.containers.shipStreams.depth);
                    }
                    pipe.on('pointerdown', function () {
                        var fromPlanet = selectors.planets.getPlanetById(_this.getAppState(), shipStream.fromPlanetId);
                        var currentPlayerId = selectors.ui.global.getCurrentPlayerId(_this.getAppState());
                        if (!fromPlanet)
                            throw new Error("No fromPlanet found");
                        if (fromPlanet.ownerId === currentPlayerId) {
                            if (confirm("Are you sure you want to delete this ship stream? (It costs " + formatResources(SHIP_STREAM_RESOURCE_COST) + ")")) {
                                _this.props.deleteShipStream(shipStream.id);
                            }
                        }
                        else {
                            alert("You don't won this ship stream.");
                        }
                    });
                    shipStreamsGO[shipStream.id] = {
                        image: pipe,
                    };
                }
                // update
                shipStreamsGO[shipStream.id].image.tilePositionX -= (0.05 * delta);
            });
            // Delete
            Object.keys(shipStreamsGO).forEach(function (shipStreamId) {
                if (!shipStreamsById[shipStreamId]) {
                    _this.containers.shipStreams.remove(shipStreamsGO[shipStreamId].image);
                    shipStreamsGO[shipStreamId].image.destroy();
                    delete shipStreamsGO[shipStreamId];
                }
            });
        };
        _this.updateCountDown = function (time, delta) {
            var state = _this.getAppState();
            var clientDateOffsetInMs = selectors.ui.global.getClientDateOffsetInMs(state);
            var gameEndDate = selectors.system.getGameEndDate(state);
            if (gameEndDate === undefined) {
                return;
            }
            var serverNow = getDateFromClientSideOffset(clientDateOffsetInMs);
            var msToEndGame = gameEndDate.getTime() - serverNow.getTime();
            var duration = moment.duration(msToEndGame, 'milliseconds');
            var text = "Game ends in: " + duration.get('minutes') + 'm:' + duration.get('seconds') + 's';
            _this.countdown.setText(text);
        };
        _this.updateUI = function (time, delta) {
            if (!_this.game)
                return;
            if (_this.uiSendingShipLine) {
                _this.uiSendingShipLine.clear();
            }
            if (_this.pointerDownPlanetId === null)
                return;
            var state = _this.getAppState();
            var fromPlanet = selectors.planets.getPlanetById(state, _this.pointerDownPlanetId);
            if (!fromPlanet)
                throw new Error("No fromPlanet planet");
            var scene = _this.getScene();
            if (!scene)
                return;
            var activePointer = _this.game.input.activePointer;
            if (!_this.uiSendingShipLine) {
                _this.uiSendingShipLine = scene.add.graphics({ x: 0, y: 0 });
                _this.containers.ui.add(_this.uiSendingShipLine);
            }
            var color = 0xffffff;
            var activePointerWorldPosition = { x: activePointer.worldX, y: activePointer.worldY };
            var planetsUnderPointer = _this.containers.planets.list.filter(function (planet) {
                return planet.getBounds().contains(activePointerWorldPosition.x, activePointerWorldPosition.y);
            });
            var toPlanetId = planetsUnderPointer[0] ? planetsUnderPointer[0].getData('planetId') : null;
            var currentPlayerId = selectors.ui.global.getCurrentPlayerId(state);
            if (currentPlayerId !== fromPlanet.ownerId)
                return;
            _this.sendingShipToPlanetId = toPlanetId;
            var canCreateShipRes = selectors.advanced.canCreateShip(state, {
                units: 10,
                ownerId: currentPlayerId || '',
                fromPlanetId: _this.pointerDownPlanetId || '',
                toPlanetId: toPlanetId ? toPlanetId : '',
                authenticatedPlayerId: currentPlayerId,
            });
            if (canCreateShipRes.ok) {
                color = 0x00ff00;
            }
            else {
                color = 0xff0000;
            }
            // Snap to center of the planet effect
            var toPlanet = selectors.planets.getPlanetById(_this.getAppState(), toPlanetId);
            var toPoint = toPlanet ? planetToPoint(toPlanet) : { x: activePointer.worldX, y: activePointer.worldY };
            _this.uiSendingShipLine.lineStyle(10, color, 1);
            _this.uiSendingShipLine.moveTo(fromPlanet.x, fromPlanet.y);
            _this.uiSendingShipLine.lineTo(toPoint.x, toPoint.y);
            _this.uiSendingShipLine.closePath();
            _this.uiSendingShipLine.strokePath();
        };
        _this.update = function (time, delta) {
            if (!_this.loaded)
                return;
            _this.FPSCounter.tick();
            if (Math.random() > 0.999) {
                var averageFps = _this.FPSCounter.getAverageFps();
                _this.props.setAverageFps(averageFps);
            }
            // pause ui
            var ui = selectors.ui.planetMap.getUI(_this.getAppState());
            if (ui.isGamePaused) {
                _this.game && _this.game.scene.pause("default");
                return;
            }
            // scene
            var scene = _this.getScene();
            if (!scene)
                return;
            // game settings
            var gameSettings = _this.getGameSettings();
            if (gameSettings.showComets) {
                if (!_this.cometEmitter.active) {
                    _this.cometEmitter.start();
                    _this.cometEmitter.active = true;
                }
            }
            else {
                if (_this.cometEmitter.active) {
                    _this.cometEmitter.active = false;
                    _this.cometEmitter.stop();
                    _this.cometEmitter.killAll();
                }
            }
            _this.updateUI(time, delta);
            _this.updatePlanets(time, delta);
            _this.updateShips(time, delta);
            _this.updateShipStreams(time, delta);
            _this.updateCountDown(time, delta);
            var mainCamera = scene.cameras.main;
            if (ui.focusOnPlanetId) {
                var planet = selectors.planets.getPlanetById(_this.getAppState(), ui.focusOnPlanetId);
                if (planet) {
                    _this.props.removePlanetFocus();
                    mainCamera.pan(planet.x, planet.y, 1500);
                    mainCamera.zoomTo(0.5, 1500);
                }
            }
        };
        _this.resizeGame = function () {
            if (!_this.canvasElement)
                return;
            if (!_this.game)
                return;
            var scene = _this.getScene();
            if (!scene)
                return;
            var gameSize = _this.getCanvasSize();
            _this.game.resize(gameSize.width, gameSize.height);
            scene.cameras.main.setSize(gameSize.width, gameSize.height);
            _this.canvasElement.style.width = gameSize.width + "px";
            _this.canvasElement.style.height = gameSize.height + "px";
            _this.canvasElement.width = gameSize.width;
            _this.canvasElement.height = gameSize.height;
        };
        _this.getCanvasSize = function () {
            if (!_this.rootElement) {
                return { width: 640, height: 480 };
            }
            var bbox = _this.rootElement.getBoundingClientRect();
            var resolution = _this.getGameSettings().resolution;
            var width = bbox.width * resolution;
            var height = bbox.height * resolution;
            return { width: width, height: height };
        };
        return _this;
    }
    PlanetsPhaser.prototype.render = function () {
        return (React.createElement(Root, { innerRef: this.onRoot },
            React.createElement("canvas", { className: rootClassName, ref: this.onCanvas })));
    };
    PlanetsPhaser.prototype.componentDidMount = function () {
        var _this = this;
        window["pm"] = this;
        this.props.onMount({
            createGame: function () { return _this.createGame(); },
            destroyGame: function () { return _this.destroyGame(); },
        });
    };
    PlanetsPhaser.prototype.componentWillUnmount = function () {
        this.props.onUnmount();
    };
    PlanetsPhaser.prototype.getScene = function () {
        return this.game && this.game.scene.getAt(0);
    };
    PlanetsPhaser.prototype.getAppState = function () {
        return this.props.store.getState();
    };
    PlanetsPhaser.prototype.getGameSettings = function () {
        return selectors.ui.gameSettings.getGameSettings(this.getAppState());
    };
    PlanetsPhaser.prototype.focusOnSelectedPlanet = function () {
        var scene = this.getScene();
        if (!scene)
            return;
        var mainCamera = scene.cameras.main;
        var ui = selectors.ui.planetMap.getUI(this.getAppState());
        if (ui.selectedPlanetId) {
            var planet = selectors.planets.getPlanetById(this.getAppState(), ui.selectedPlanetId);
            if (planet) {
                mainCamera.pan(planet.x, planet.y, 1500);
                mainCamera.zoomTo(0.5, 1500);
            }
        }
    };
    PlanetsPhaser.prototype.createGame = function () {
        if (this.game)
            throw new Error("Game should be undefined");
        if (!this.canvasElement)
            return;
        window.addEventListener('resize', this.resizeGame);
        var gameSize = this.getCanvasSize();
        var resolution = this.getGameSettings().resolution;
        this.canvasElement.style.transform = "scale(" + 1 / resolution + ")";
        var config = {
            width: gameSize.width,
            height: gameSize.height,
            type: Phaser.AUTO,
            canvas: this.canvasElement,
            backgroundColor: '#091326',
            // BUG: https://github.com/photonstorm/phaser/issues/3903
            // resolution: window.devicePixelRatio,
            resolution: 1,
            render: {
                antialias: true,
                autoResize: true,
            },
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update,
            }
        };
        this.game = new Phaser.Game(config);
    };
    PlanetsPhaser.prototype.destroyGame = function () {
        if (!this.game)
            throw new Error("Game should not be undefined");
        this.game && this.game.destroy(false);
        this.game = undefined;
        this.props.disconnect();
        window.removeEventListener('resize', this.resizeGame);
    };
    return PlanetsPhaser;
}(React.PureComponent));
var mapDispatch = function (dispatch) {
    return {
        onMount: function (payload) {
            dispatch({
                type: PlanetMapUIActions.onMount,
                payload: payload,
            });
        },
        onUnmount: function () {
            dispatch({
                type: PlanetMapUIActions.onUnmount,
                payload: null,
            });
        },
        onPlanetIdClick: function (planetId) {
            dispatch({
                type: PlanetMapUIActions.onPlanetIdClick,
                payload: { planetId: planetId },
            });
        },
        onBackgroundClick: function (point) {
            dispatch({
                type: PlanetMapUIActions.onBackgroundClick,
                payload: { point: point },
            });
        },
        removePlanetFocus: function () {
            dispatch(createAppAction(PlanetMapUIActions.removePlanetFocus, null));
        },
        deleteShipStream: function (shipStreamId) {
            dispatch(createSendClientToServerAction(ShipActions.requestDeleteStream, {
                shipStreamId: shipStreamId,
            }));
        },
        disconnect: function () {
            dispatch(createAppAction(SystemActions.disconnect, null));
        },
        setAverageFps: function (averageFps) {
            dispatch(createAppAction(SystemActions.setAverageFps, { averageFps: averageFps }));
        },
        onPhaserInit: function (getCanvasElement, getGame) {
            dispatch(createAppAction(PlanetMapUIActions.onPhaserGameCreated, {
                getCanvasElement: getCanvasElement,
                getGame: getGame
            }));
        },
        requestSendShip: function (props) {
            dispatch(createSendClientToServerAction(ShipActions.requestSendShip, {
                units: props.units,
                fromPlanetId: props.fromPlanetId,
                toPlanetId: props.toPlanetId,
                id: generateUniqueId(),
                ownerId: props.ownerId,
            }));
        },
        requestSendShipStream: function (props) {
            dispatch(createSendClientToServerAction(ShipActions.requestCreateStream, {
                shipStream: {
                    fromPlanetId: props.fromPlanetId,
                    toPlanetId: props.toPlanetId,
                    id: generateUniqueId(),
                    temporary: true,
                },
            }));
        },
        addError: function (error) {
            dispatch(createAppAction(ToastActions.addError, {
                error: error,
            }));
        },
    };
};
var ConnectedComponent = connect(null, mapDispatch)(PlanetsPhaser);
var Wrapper = function () {
    return (React.createElement(StoreConsumer, null, function (store) { return React.createElement(ConnectedComponent, { store: store }); }));
};
export default Wrapper;
var templateObject_1, templateObject_2;
//# sourceMappingURL=PlanetMap.js.map