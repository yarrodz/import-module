import { iFrameDbClient } from 'iframe-ai';
import Dataset from './dataset.interface';
declare class DatasetsRepository {
    private client;
    constructor(client: iFrameDbClient);
    bulkSave(datasets: Dataset[]): Promise<void>;
}
export default DatasetsRepository;
