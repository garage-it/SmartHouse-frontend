import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Rx';

export const SCENARIO_STATUS_CHANGE_EVENT = 'scenario-status-change';

@Injectable()
export class ScenarioStatusService {

    private stream: Observable<Object>;
    private io: SocketIOClientStatic;

    constructor() {

        this.io = io;
        this.setup();

    }

    setup() {
        const socket = this.io.connect(ENV_PUBLIC_CONFIG.backEndWebSocketUrl);
        this.stream = Observable.create(observer => {
            socket.on(SCENARIO_STATUS_CHANGE_EVENT, (value) => observer.next(value));
        });
    }
}
