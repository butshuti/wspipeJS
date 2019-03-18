import {EventHandler} from './EventHandler';
import {StatusMonitor} from './StatusMonitor';
import {Peer} from './Peer';
class NoOpStatusMonitor implements StatusMonitor {
    setErrorMessage(msg: string) : void{
        console.error(msg);
    }
    setStatusMessage(msg: string): void {
        console.log(msg);
    }
    clearErrorState(): void {

    }
}
export class EventStream {
    handler: EventHandler;
    statusMonitor: StatusMonitor;
    counter: number;
    constructor(handler: EventHandler, statusMonitor: StatusMonitor){
        this.handler = handler;
        this.statusMonitor = statusMonitor;
        this.counter = 0;
    }

    getCounter(): number{
        return this.counter++;
    }

    getEventHandler(eventGroup: string): EventHandler {
        if(eventGroup != null){
            return this.handler != null ? this.handler : null;
        }
        return this.handler;
    }

    getStatusMonitor(): StatusMonitor {
        return this.statusMonitor || new NoOpStatusMonitor();
    }

    routeEvent(obj: JSON, eventGroup: string): void {
        let handler: EventHandler = this.getEventHandler(eventGroup);
        if(handler != null){
            if(obj.hasOwnProperty('depth') && obj.hasOwnProperty('ts') && obj.hasOwnProperty('recoil')){
                handler.handleEvent(this.counter++, obj);
            }
        }
    }

    broadcast(evtIndex:number, obj: JSON): void{
        if(this.handler != null){
            this.handler.handleEvent(evtIndex, obj);
        }
    }

    start(dstPeer: Peer): void {
        console.log('dstPeer => ' + dstPeer);
    }

    stop(dstPeer: Peer): void {
        console.log('dstPeer => ' + dstPeer);
    }
}
