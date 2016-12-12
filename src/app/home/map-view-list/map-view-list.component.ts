import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MapViewInfoDto } from '../map-view/map-view.dto';

@Component({
    selector: 'sh-map-view-list',
    templateUrl: './map-view-list.template.html',
    styleUrls: [ './map-view-list.style.scss' ]
})
export class MapViewListComponent {
    @Input() listMapViews: MapViewInfoDto[] = [];
    @Output() onSelectMapView: EventEmitter<any> = new EventEmitter();

    viewMap(mapView: MapViewInfoDto): void {
        this.onSelectMapView.emit(mapView);
    }
}
