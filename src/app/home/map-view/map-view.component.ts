import { Component, Input } from '@angular/core';
import { MapViewInfoDto } from './map-view.dto';

@Component({
    selector: 'sh-map-view',
    templateUrl: './map-view.template.html',
    styleUrls: [ './map-view.style.scss' ]
})
export class MapViewComponent {
    @Input() currentMapView: MapViewInfoDto;

    getImage() {
        return 'http://localhost:3000/api/files/' + this.currentMapView.pictureName;
    }
}
