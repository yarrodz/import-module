import ImportProcessesRepository from './import-processes.repository';
import ImportsRepository from '../imports/imports.repository';
import SqlTransferHelper from '../sql/sql-transfer.helper';
import ApiTransferHelper from '../api/api-transfer.helper';
export default function createPendingImportProcessesReloaderFunction(importProcessesRepository: ImportProcessesRepository, importsRepository: ImportsRepository, sqlTransferHelper: SqlTransferHelper, apiTransferHelper: ApiTransferHelper): Function;
