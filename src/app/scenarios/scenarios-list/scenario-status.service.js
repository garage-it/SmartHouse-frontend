import {Injectable} from '@angular/core';

import io from 'socket.io-client';
import Rx from 'rxjs/Rx';

export const SCENARIO_STATUS_CHANGE_EVENT = 'scenario-status-change';

@Injectable()
export class ScenarioStatusService {
    constructor(_io = io) {
        this.socket = _io();

        this.stream = Rx.Observable.create(observer => {
            this.socket.on(SCENARIO_STATUS_CHANGE_EVENT, (value) => observer.next(value));
        });
    }

    closeScocketSession() {
        this.socket.disconnect();
    }
}
