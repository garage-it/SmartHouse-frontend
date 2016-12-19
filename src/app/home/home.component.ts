import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ViewDto } from './view.dto';

@Component({
    selector: 'sh-home',
    templateUrl: './home.template.html',
    styleUrls: [ './home.style.scss' ]
})
export class HomeComponent {
    public viewList: Array<ViewDto> = [];
    public currentView: ViewDto;
    public currentSubview: string;

    private activeRouteDataSubscription: Subscription;

    constructor(private activeRoute: ActivatedRoute) {};

    ngOnInit() {
        this.activeRouteDataSubscription = this.activeRoute.data.subscribe(({viewList}) => {
            this.viewList = viewList;
            this.setCurrentView(viewList[0]);
        });
    }

    ngOnDestroy() {
        this.activeRouteDataSubscription.unsubscribe();
    }

    setCurrentView(view: ViewDto) {
        this.currentView = view;
        this.setCurrentSubviewByView(view);
    }

    setCurrentSubviewByView(view: ViewDto) {
        this.setCurrentSubview(view.default);
    }

    setCurrentSubview(subview: string) {
        this.currentSubview = subview;
    }
}
