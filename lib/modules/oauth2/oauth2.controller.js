"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OAuth2Controller {
    constructor(oAuthService) {
        this.oAuth2Callback = async (req, res) => {
            const responseHandler = await this.oAuth2Service.oAuth2Callback(req);
            responseHandler.send(res);
        };
        this.oAuth2Service = oAuthService;
    }
}
exports.default = OAuth2Controller;
//# sourceMappingURL=oauth2.controller.js.map