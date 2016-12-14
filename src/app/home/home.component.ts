import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapViewInfoDto } from './map-view/map-view.dto';
import { DashboardViewInfoDto } from './dashboard-view/dashboard-view.dto';

import { Subscription } from 'rxjs';

@Component({
    selector: 'sh-home',
    templateUrl: './home.template.html',
    styleUrls: [ './home.style.scss' ]
})
export class HomeComponent {
    public listMapViews: Array<MapViewInfoDto> = [];
    public listDashboardViews: Array<DashboardViewInfoDto> = [];
    public currentView: MapViewInfoDto | DashboardViewInfoDto;
    private defaultResolver: Subscription;

    constructor(private activeRoute: ActivatedRoute) {};

    ngOnInit() {
        this.defaultResolver = this.activeRoute.data.subscribe(({viewList}) => {
            this.listMapViews = viewList
                .filter(view => !!view.mapView)
                .map(view => view.mapView);

            this.listDashboardViews = viewList
                .filter(view => !!view.dashboard)
                .map(view => view.dashboard);

            this.currentView = this.listMapViews.find(view => view.default) || this.listMapViews[0];
        });
    }

    ngOnDestroy() {
        this.defaultResolver.unsubscribe();
    }

    setCurrentView(view: MapViewInfoDto | DashboardViewInfoDto) {
        this.currentView = view;
    }

    isMapView() {
        return this.listMapViews.find((view => view === this.currentView));
    }

    getCurrentListViews() {
        return this.isMapView() ? this.listMapViews : this.listDashboardViews;
    }
}
