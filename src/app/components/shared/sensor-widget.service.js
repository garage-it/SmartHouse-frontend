import {Injectable} from 'angular2/core';
import io from 'socket.io-client';

@Injectable()
export default class SensorWidgetService {
    constructor() {
        this.io = io;
        this.setupSocket();
    }

    setupSocket() {
        this.socket = this.io(ENV_PUBLIC_CONFIG.backEndWebSocketUrl);
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

    pushCommand(config) {
        this.socket.emit('switch', config);
    }
}
