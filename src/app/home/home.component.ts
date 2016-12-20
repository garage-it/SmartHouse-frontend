import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { ViewInfoDto } from './view/view.dto';

@Component({
    selector: 'sh-home',
    templateUrl: './home.template.html',
    styleUrls: [ './home.style.scss' ]
})
export class HomeComponent {
    public viewList: Array<ViewInfoDto> = [];
    public currentView: ViewInfoDto;
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

    setCurrentView(view: ViewInfoDto) {
        this.currentView = view;
        this.setCurrentSubview(view.defaultSubview);
    }

    setCurrentSubview(subview: string) {
        this.currentSubview = subview;
    }
}
