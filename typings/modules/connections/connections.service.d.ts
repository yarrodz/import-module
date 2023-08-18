import ConnectionsRepository from './connections.repository';
import ResponseHandler from '../../utils/response-handler/response-handler';
declare class ConnectionsService {
    private connectionsRepository;
    constructor(connectionsRepository: ConnectionsRepository);
    getAll(select: any, sortings: any): Promise<ResponseHandler>;
    get(id: number): Promise<ResponseHandler>;
    create(input: any): Promise<ResponseHandler>;
    update(input: any): Promise<ResponseHandler>;
    delete(id: number): Promise<ResponseHandler>;
}
export default ConnectionsService;
