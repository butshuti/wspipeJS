import { EventStream } from './EventStream';
import { EventHandler } from './EventHandler';
import { WSEventStreamConfig } from './WSEventStreamConfig';
import { Peer } from './Peer';
import { StatusMonitor } from './StatusMonitor';
export interface StreamDescriptor {
    port: number;
    scheme: string;
    path: string;
    protocol: string;
    nodeName: string;
    isDirect: Function;
}
export declare class WSEventStream extends EventStream {
    ws: WebSocket | null;
    counter: number;
    retryCounter: number;
    wsStreamConfig: WSEventStreamConfig;
    pendingCommandACKs: Map<string, number>;
    wsTimeout: number;
    constructor(config: WSEventStreamConfig, handler: EventHandler | null, statusMonitor: StatusMonitor | null);
    withConfig(config: WSEventStreamConfig): WSEventStream;
    getEventStreamConfig(): WSEventStreamConfig;
    static getStreamDescriptor(url: string): Promise<StreamDescriptor>;
    initiateWSSession(selectedPeer: Peer, eventCode: string): void;
    buildWSURL(scheme: string, baseURL: URL, port: number, path: string): string;
    onConnected(selectedPeer: Peer): void;
    onDisconnected(selectedPeer: Peer): void;
    onError(msg: string): void;
    onStatus(msg: string): void;
    registerConnection(url: string, socket: WebSocket): void;
    getConnectionSocket(url: string): WebSocket | null;
    isConnected(url: string): boolean;
    clearConnection(url: string): void;
    setWSConnectTimeout(timeout: number): void;
    clearWSConnectionTimeout(): void;
    startWS(selectedPeer: Peer): void;
    startSession(selectedPeer: Peer, eventCode: string, reset: boolean): void;
    start(selectedPeer: Peer, eventCode: string): void;
    stop(selectedPeer: Peer, eventCode: string): void;
    sendTo(msg: string, selectedPeer: Peer): void;
    sendMsg(msg: string): void;
    packMsg(msg: string, selectedPeer: Peer): string;
    private handleCtrlEvent(evt);
    broadcastEvent(evtData: string, eventGroup: string): void;
}
