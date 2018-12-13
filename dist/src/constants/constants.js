import { PlanetType } from "../interfaces";
import { createPlanet } from "../utils/createPlanet";
export var PLANET_WITHOUT_OWNER_COLOR = "#515763";
export var MINIMUM_UNITS_PER_SHIP = 10;
export var SHIP_STREAM_FREQUENCY = 2000;
export var UPDATE_ROOM_DEPOSITS_FREQUENCY = 30 * 1000;
export var SHIP_DELAY_IN_MS = 2500;
export var MIN_DISTANCE_BETWEEN_PLANETS = 50;
export var CHAT_MAX_MESSAGE_TEXT_LENGTH = 128;
export var RESOURCE_SYMBOL = "\u2756";
export var CURRENCY_SYMBOL = "\u269C";
export var REQUEST_EMAIL_AT_MINUTES = [1, 3, 6, 10, 15, 30, 60, 180, 360, 500, 750, 1000];
export var ROOM_SERVER_IS_CONSIDERED_DOWN_AFTER_X_MINUTES = 1;
export var ROOM_SERVER_PING_INTERVAL_IN_SECONDS = 5;
// The amount of money you need to pay to own this planet
export var PLANET_MONEY_VALUE = 1;
export var INITIAL_MONEY_IN_CENTS_FOR_FAKE_MONEY_ACCOUNTS = 1000;
export var DEFAULT_MONEY_IN_CENTS_WHEN_STARTING_NEW_GAME = 100;
export var DEBUG_TIMES = false;
export var createPlanetDefaults = createPlanet({
    id: '',
    radius: 50,
    x: 0,
    y: 0,
    range: 200,
    type: PlanetType.generic,
    playerCanSpawn: true,
});
//# sourceMappingURL=constants.js.map