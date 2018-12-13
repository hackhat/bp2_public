import { selectors } from "../index";
export var getCurrentSelectedPlanet = function (state) {
    var selectedPlanetId = selectors.ui.planetMap.getUI(state).selectedPlanetId;
    if (!selectedPlanetId)
        return undefined;
    return selectors.planets.getPlanetById(state, selectedPlanetId);
};
//# sourceMappingURL=getCurrentSelectedPlanet.js.map