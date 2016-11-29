import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sh-timepiece',
    styleUrls: ['./timepiece.component.scss'],
    templateUrl: './timepiece.component.html'
})

export class TimepieceComponent implements OnInit, OnDestroy {

    private currentTime: Date;
    private timer: Observable<Object>;
    private timeTracker: Subscription;

    constructor() {
    }

    ngOnInit() {
        this.createTimer(0, 1000);
        this.subscribeToTimer();
    }

    ngOnDestroy() {
        this.unsubscribeFromTimer();
    }

    createTimer(dueTime: number, period: number) {
        this.timer = Observable.timer(dueTime, period);
        console.log(this.timer);
    }

    subscribeToTimer() {
        this.timeTracker = this.timer.subscribe(() => {
            this.currentTime =  new Date();
        });
    }

    unsubscribeFromTimer() {
        this.timeTracker.unsubscribe();
    }
}
