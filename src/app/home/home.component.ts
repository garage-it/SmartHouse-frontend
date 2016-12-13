import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapViewInfoDto } from './map-view/map-view.dto';

@Component({
    selector: 'sh-home',
    templateUrl: './home.template.html',
    styleUrls: [ './home.style.scss' ]
})
export class HomeComponent {
    public listMapViews = [];
    public currentMapView: MapViewInfoDto;
    private defaultResolver;

    constructor(private activeRoute: ActivatedRoute) {};

    ngOnInit() {
        this.defaultResolver = this.activeRoute.data.subscribe(({viewList}) => {
            this.listMapViews = viewList.map(({mapView}) => mapView);
            this.currentMapView = this.listMapViews[0];
        });
    }

    ngOnDestroy() {
        this.defaultResolver.unsubscribe();
    }

    setCurrentMapView(mapView: MapViewInfoDto) {
        this.currentMapView = mapView;
    }
}
