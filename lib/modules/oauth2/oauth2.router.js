"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class OAuth2Router {
    constructor(oAuthController) {
        this.router = (0, express_1.Router)();
        this.oAuthController = oAuthController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/oauth-callback', this.oAuthController.oAuth2Callback);
    }
}
exports.default = OAuth2Router;
//# sourceMappingURL=oauth2.router.js.map