import { AxiosRequestConfig } from 'axios';
import ApiConnection from '../interfaces/api-connection.interface';
declare class AuthRequestHelper {
    static auth(request: AxiosRequestConfig, auth?: ApiConnection): Promise<void>;
    private static apiKeyAuth;
    private static basicAuth;
    private static bearerAuth;
    private static oauth2;
}
export default AuthRequestHelper;
