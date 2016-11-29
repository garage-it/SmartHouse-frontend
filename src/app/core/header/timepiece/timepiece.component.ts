import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sh-timepiece',
    styleUrls: ['./timepiece.component.scss'],
    templateUrl: './timepiece.component.html'
})

export class TimepieceComponent implements OnInit, OnDestroy {

    private currentTime: string;
    private timer: Observable<Object>;
    private timeTracker: Subscription;

    constructor() {
    }

    ngOnInit() {
        this.createTimer();
        this.subscribeToTimer();
    }

    ngOnDestroy() {
        this.unsubscribeFromTimer();
    }

    createTimer() {
        this.timer = Observable.timer(0, 1000);
    }

    subscribeToTimer() {
        this.timeTracker = this.timer.subscribe(() => {
            this.currentTime =  this.dateFormatter(new Date());
        });
    }

    unsubscribeFromTimer() {
        this.timeTracker.unsubscribe();
    }

    dateFormatter(date: Date) {
        const dateMMDDYYYY = [ date.getMonth() + 1, date.getDate(), date.getFullYear() ].join('.');
        const timeHHMM = [ date.getHours(), date.getMinutes() ].join(':');
        return dateMMDDYYYY + ' ' + timeHHMM;
    }
}
