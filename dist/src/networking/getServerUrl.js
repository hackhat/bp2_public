import { isProduction } from "../utils/isProduction";
var CONNECT_TO_PROD_SERVER = false;
export var getServerUrl = function () {
    if (CONNECT_TO_PROD_SERVER || isProduction) {
        return "http://server.bitplanets.com";
    }
    else {
        if (typeof window === 'undefined') {
            return "http://localhost";
        }
        else {
            return "http://" + window.location.hostname;
        }
    }
};
//# sourceMappingURL=getServerUrl.js.map