import { RequestResponseType } from '../enums/request-response-type.enum';
declare class ParseResponseHelper {
    parse(data: any, responseType: RequestResponseType): any;
    private parseCsvFormattedJson;
}
export default ParseResponseHelper;
