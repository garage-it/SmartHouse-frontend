import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapViewInfoDto } from './map-view/map-view.dto';
import { ViewInfoDto } from './view.dto';

import { Subscription } from 'rxjs';

@Component({
    selector: 'sh-home',
    templateUrl: './home.template.html',
    styleUrls: [ './home.style.scss' ]
})
export class HomeComponent {
    public listViews: Array<ViewInfoDto>;
    public listMapViews: Array<MapViewInfoDto>;
    public currentMapView: MapViewInfoDto;
    private defaultResolver: Subscription;

    constructor(private activeRoute: ActivatedRoute) {};

    ngOnInit() {
        this.defaultResolver = this.activeRoute.data.subscribe(({viewList}) => {
            this.listViews = viewList;
            this.listMapViews = this.listViews.filter(view => {
                return view.mapView && view.mapView.name;
            }).map(view => view.mapView);
            this.currentMapView = this.listMapViews.find(view => view.default);
        });
    }

    ngOnDestroy() {
        this.defaultResolver.unsubscribe();
    }

    setCurrentMapView(mapView: MapViewInfoDto) {
        this.currentMapView = mapView;
    }
}
