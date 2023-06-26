import FindSQLColumnsService from './columns/sql-columns.service';
import { IImport } from '../imports/import.schema';
import { IColumn } from './interfaces/column.interface';
declare class ColumnsService {
    private findSQLColumnsService;
    constructor(findSQLColumnsService: FindSQLColumnsService);
    find(impt: Omit<IImport, 'fields'>): Promise<IColumn[]>;
    checkIdColumnUniqueness(impt: Omit<IImport, 'fields'>): Promise<boolean>;
}
export default ColumnsService;
