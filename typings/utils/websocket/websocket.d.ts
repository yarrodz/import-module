/// <reference types="node" />
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
declare class Websocket extends Server {
    private static io;
    constructor(httpServer: HttpServer);
    static getInstance(httpServer?: HttpServer): Websocket;
}
export default Websocket;
