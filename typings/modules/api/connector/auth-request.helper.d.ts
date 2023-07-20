import { AxiosRequestConfig } from 'axios';
import { IRequestAuth } from '../sub-schemas/api-sub-schemas/request-auth.shema';
declare class AuthRequestHelper {
    auth(request: AxiosRequestConfig, auth: IRequestAuth): Promise<void>;
    private apiKeyAuth;
    private basicAuth;
    private bearerAuth;
    private oauth2;
}
export default AuthRequestHelper;
