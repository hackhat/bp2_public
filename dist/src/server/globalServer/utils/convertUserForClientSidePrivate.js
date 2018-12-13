export var convertUserForClientSidePrivate = function (user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        countryCode: user.countryCode,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
//# sourceMappingURL=convertUserForClientSidePrivate.js.map