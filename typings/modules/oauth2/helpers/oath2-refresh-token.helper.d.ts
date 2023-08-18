import ConnectionsRepository from '../../connections/connections.repository';
import ApiConnection from '../../api/interfaces/api-connection.interface';
declare class OAuth2RefreshTokenHelper {
    private connectionsRepository;
    constructor(connectionsRepository: ConnectionsRepository);
    refresh: (connection: ApiConnection) => Promise<void>;
}
export default OAuth2RefreshTokenHelper;
