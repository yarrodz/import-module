import { IImport, IImportDocument } from '../imports/import.schema';
import { IColumn } from '../columns/column.interface';
declare class SqlColumnsHelper {
    find(impt: IImportDocument): Promise<IColumn[]>;
    checkIdColumnUniqueness(impt: Omit<IImport, 'fields'>): Promise<boolean>;
    private selectColumnsFromSchema;
    private selectColumnsFromDataset;
}
export default SqlColumnsHelper;
