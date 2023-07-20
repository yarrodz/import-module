import { Session } from 'express-session';
import IOAuth2CallbackProcess from './interfaces/oauth2-callback-process.interface';
declare class OAuth2SessionHelper {
    private session;
    constructor(session: Session);
    addCallbackProcess(process: IOAuth2CallbackProcess): void;
    findCallbackProcess(state: string): IOAuth2CallbackProcess;
    removeCallbackProcess(state: string): void;
}
export default OAuth2SessionHelper;
