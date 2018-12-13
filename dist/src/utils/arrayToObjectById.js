var arrayToObjectById = function (array) {
    var output = {};
    array
        .filter(function (item) { return item !== undefined; })
        .forEach(function (item) { return output[item.id] = item; });
    return output;
};
export default arrayToObjectById;
//# sourceMappingURL=arrayToObjectById.js.map