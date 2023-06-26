import { Response } from 'express';
import { ResponseType } from './response-type.enum';
export default class ResponseHandler {
    private type?;
    private statusCode?;
    private result?;
    private message?;
    constructor(type?: ResponseType, statusCode?: number, result?: any, message?: string | object);
    setSuccess(statusCode: number, result: any): void;
    setError(statusCode: number, message: string | object): void;
    send(res: Response): void;
}
