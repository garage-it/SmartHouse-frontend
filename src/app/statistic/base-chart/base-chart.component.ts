import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export abstract class BaseChartComponent implements OnInit, OnDestroy {
    protected deviceId;
    protected period;
    protected periodSubscription;

    constructor(private currentRoute: ActivatedRoute) {
        this.deviceId = this.currentRoute.snapshot.params['id'];
        this.period = this.currentRoute.snapshot.params['period'];
    }

    ngOnInit(): void {
        this.periodSubscription = this.currentRoute.params.subscribe(params => {
            this.period = params['period'];
        });
    }

    ngOnDestroy(): void {
        this.periodSubscription.unsubscribe();
    }
}
