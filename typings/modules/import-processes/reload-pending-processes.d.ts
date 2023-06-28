import ImportsRepository from '../imports/imports.repository';
import TransferService from '../transfer/transfer.service';
import ImportProcessesRepository from './import-processes.repository';
export default function createReloadPendingImportProcessesFunction(importProcessesRepository: ImportProcessesRepository, importsRepository: ImportsRepository, transferService: TransferService): Function;
