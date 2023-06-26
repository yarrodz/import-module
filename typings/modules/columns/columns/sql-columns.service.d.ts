import { IImport } from '../../imports/import.schema';
import { IColumn } from '../interfaces/column.interface';
declare class SQLColumnsService {
    find(impt: Omit<IImport, 'fields'>): Promise<IColumn[]>;
    checkIdColumnUniqueness(impt: Omit<IImport, 'fields'>): Promise<boolean>;
    private selectColumnsFromSchema;
    private selectColumnsFromDataset;
}
export default SQLColumnsService;
