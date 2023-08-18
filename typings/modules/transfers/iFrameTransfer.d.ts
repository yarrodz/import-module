export = iFrameTransfer;
declare class iFrameTransfer {
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
    insert(properties: any): Promise<this>;
    save(): Promise<this>;
    load(id: any): Promise<this>;
}
