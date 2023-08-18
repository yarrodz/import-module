import { iFrameDbClient } from 'iFrame-ai';
declare class ProcessesRepository {
    private client;
    constructor(client: iFrameDbClient);
    query(select: any, sortings: any, firstOnly: boolean): Promise<any>;
    load(id: number): Promise<any>;
    create(input: any): Promise<any>;
    update(input: any): Promise<any>;
    delete(id: number): Promise<any>;
}
export default ProcessesRepository;
