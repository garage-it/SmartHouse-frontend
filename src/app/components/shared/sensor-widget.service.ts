import {Injectable} from 'angular2/core';
const io = require('socket.io-client');

@Injectable()
export default class SensorWidgetService {
    io: any;
    socket: any;

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

    pushEvent(config) {
        this.socket.emit('pushEvent', config);
    }
}
