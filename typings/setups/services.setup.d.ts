import { Server as IO } from 'socket.io';
import DatasetsRepository from '../modules/datasets/datasets.repository';
import ImportProcessesRepository from '../modules/import-processes/import-processes.repository';
import ImportProcessesService from '../modules/import-processes/import-processes.service';
import ImportsRepository from '../modules/imports/imports.repository';
import ImportsService from '../modules/imports/imports.service';
export default function setupServices(io: IO, datasetsRepository: DatasetsRepository, importsRepository: ImportsRepository, importProcessesRepository: ImportProcessesRepository, maxAttempts: number, delayAttempt: number, limit: number): {
    importsService: ImportsService;
    importProcessesService: ImportProcessesService;
};
