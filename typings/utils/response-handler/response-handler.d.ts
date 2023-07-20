import { Response } from 'express';
import { ResponseHandlerType } from './response-handler-type.enum';
export default class ResponseHandler {
    private type?;
    private statusCode?;
    private result?;
    private message?;
    private redirectUri?;
    constructor(type?: ResponseHandlerType, statusCode?: number, result?: any, message?: any, redirectUri?: string);
    setSuccess(statusCode: number, result: any): void;
    setError(statusCode: number, message: any): void;
    setRedirect(uri: string): void;
    send(res: Response): void;
}
