"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OAuth2SessionHelper {
    constructor(session) {
        this.session = session;
    }
    addCallbackProcess(process) {
        this.session.oAuth2CallbackProcesses =
            this.session.oAuth2CallbackProcesses || [];
        //remove OAuth2 process by connectionId if exists
        this.session.oAuth2CallbackProcesses =
            this.session.oAuth2CallbackProcesses.filter((p) => p.context.connectionId !== process.context.connectionId);
        this.session.oAuth2CallbackProcesses.push(process);
    }
    findCallbackProcess(state) {
        if (this.session.oAuth2CallbackProcesses === undefined) {
            throw new Error('Callback process was not found in session.');
        }
        const callbackProcess = this.session.oAuth2CallbackProcesses.find((p) => p.state === state);
        if (callbackProcess === undefined) {
            throw new Error('Callback process was not found in session.');
        }
        return callbackProcess;
    }
    removeCallbackProcess(state) {
        this.session.oAuth2CallbackProcesses =
            this.session.oAuth2CallbackProcesses.filter((p) => p.state !== state);
    }
}
exports.default = OAuth2SessionHelper;
//# sourceMappingURL=oauth2-session.helper.js.map