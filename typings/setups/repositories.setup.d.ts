import { Model } from 'mongoose';
import { IRecord } from '../modules/records/record.interface';
import { IDataset } from '../modules/datasets/dataset.interface';
import DatasetsRepository from '../modules/datasets/datasets.repository';
import ImportsRepository from '../modules/imports/imports.repository';
import ImportProcessesRepository from '../modules/import-processes/import-processes.repository';
export default function setupRepositories(recordModel: Model<IRecord>, datasetModel: Model<IDataset>): {
    datasetsRepository: DatasetsRepository;
    importsRepository: ImportsRepository;
    importProcessesRepository: ImportProcessesRepository;
};
