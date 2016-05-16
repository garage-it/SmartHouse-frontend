import {Injectable} from 'angular2/core';
import io from 'socket.io-client';

import {BACK_END_WS} from '../../shared/config';

@Injectable()
export default class SensorWidgetService {
    constructor() {
        this.io = io;
        this.setupSocket();
    }

    setupSocket() {
        this.socket = this.io(BACK_END_WS);
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
