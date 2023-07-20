import { IImportDocument } from '../imports/import.schema';
import { IColumn } from '../columns/column.interface';
declare class ApiColumnsHelper {
    find(impt: IImportDocument): Promise<IColumn[]>;
    checkIdColumnUniqueness(impt: IImportDocument): Promise<boolean>;
    private findNestedObjectTypes;
    private checkKeyValuesUniqueness;
}
export default ApiColumnsHelper;
