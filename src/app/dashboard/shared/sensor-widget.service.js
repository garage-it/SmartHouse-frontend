import {Injectable} from '@angular/core';
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
        if (this.socket.connected) {
            activateDevice.apply(this);
        } else {
            this.socket.on('connect', () => {
                activateDevice.apply(this);
            });
        }

        function activateDevice() {
            this.socket.on('event', callback);

            if (!device) {
                return;
            }
            this.socket.emit('subscribe', {device});
        }
    }

    unsubscribe(device) {
        this.socket.emit('unsubscribe', {device});
    }

    pushEvent(config) {
        this.socket.emit('pushEvent', config);
    }
}
