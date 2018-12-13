import { CURRENCY_SYMBOL } from "../constants/constants";
export var formatMoney = function (amountInCents, includeSymbol) {
    var number = "" + (amountInCents / 100).toFixed(2);
    if (includeSymbol) {
        return "" + CURRENCY_SYMBOL + number;
    }
    return number;
};
//# sourceMappingURL=formatMoney.js.map