import { Session } from 'express-session';
import OAuth2CallbackProcess from '../interfaces/oauth2-callback-process.interface';
declare class OAuth2SessionHelper {
    private session;
    constructor(session: Session);
    addCallbackProcess(process: OAuth2CallbackProcess): void;
    findCallbackProcess(state: string): OAuth2CallbackProcess | undefined;
    removeCallbackProcess(state: string): void;
}
export default OAuth2SessionHelper;
