import { Server as IO } from 'socket.io';
import TransfersRepository from '../transfers.repository';
import TransferFailureHandleParams from '../interfaces/transfer-failure-handle-params.interface';
declare class TransferFailureHandler {
    private io;
    private transfersRepository;
    constructor(io: IO, transfersRepository: TransfersRepository);
    handle(params: TransferFailureHandleParams): Promise<void>;
    private failTransfer;
    private retryTransfer;
}
export default TransferFailureHandler;
