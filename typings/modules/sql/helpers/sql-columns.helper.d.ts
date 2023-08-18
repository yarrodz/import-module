import Column from '../../columns/column.interface';
import SqlImport from '../interfaces/sql-import.interface';
declare class SqlColumnsHelper {
    find(impt: SqlImport): Promise<Column[]>;
    checkIdColumnUniqueness(impt: SqlImport): Promise<boolean>;
    private selectColumnsFromSchema;
    private selectColumnsFromDataset;
}
export default SqlColumnsHelper;
