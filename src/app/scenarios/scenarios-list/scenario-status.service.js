import {Injectable} from '@angular/core';

import io from 'socket.io-client';
import Rx from 'rxjs/Rx';

export const SCENARIO_STATUS_CHANGE_EVENT = 'scenario-status-change';

@Injectable()
export class ScenarioStatusService {
    constructor(_io = io) {
        const socket = _io(ENV_PUBLIC_CONFIG.backEndWebSocketUrl);

        this.stream = Rx.Observable.create(observer => {
            socket.on(SCENARIO_STATUS_CHANGE_EVENT, (value) => observer.next(value));
        });
    }
}
