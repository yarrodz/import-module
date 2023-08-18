import Column from '../../columns/column.interface';
import ApiImport from '../interfaces/api-import.interface';
declare class ApiColumnsHelper {
    find(impt: ApiImport): Promise<Column[]>;
    checkIdColumnUniqueness(impt: ApiImport): Promise<boolean>;
    private findNestedObjectTypes;
    private checkKeyValuesUniqueness;
}
export default ApiColumnsHelper;
