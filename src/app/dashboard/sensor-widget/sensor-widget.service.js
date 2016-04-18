import {Injectable} from 'angular2/core';
import io from 'socket.io-client';

@Injectable()
export default class SensorWidgetService {
    constructor() {
        this.io = io;
        this.setupSocket();
    }

    setupSocket() {
        // TODO add dev config via webpack plugin to manage proper ws host and port
        this.socket = this.io('ws://localhost:3000');    // real backEnd
        // this.socket = this.io('ws://localhost:8000'); // fake backEnd
    }

    subscribe(device, callback) {
        this.socket.on('connect', () => {
            this.socket.on('event', callback);

            this.socket.emit('subscribe', {device});
        });
    }

    unsubscribe(device) {
        this.socket.emit('unsubscribe', {device});
    }
}
