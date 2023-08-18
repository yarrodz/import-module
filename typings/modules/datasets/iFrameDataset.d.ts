export = iFrameDataset;
declare class iFrameDataset {
    constructor(client: any, properties: any, id: any);
    client: any;
    relations: {
        load: {
            label: string;
            _d: string;
        }[];
        save: {
            label: string;
            _d: string;
        }[];
        delete: {
            label: string;
            _d: string;
        }[];
    };
    bulkSave(datasets: any): Promise<void>;
    bulkInsertRecords(traversal: any, records: any, datasetVertexId: any): Promise<void>;
}
