import { Component, Input } from '@angular/core';
import { MapViewInfoDto } from '../../shared/view/map-view.dto';
import { PictureResolverService } from '../../shared/picture-resolver/picture-resolver.service';

@Component({
    selector: 'sh-map-view',
    templateUrl: './map-view.template.html',
    styleUrls: [ './map-view.style.scss' ]
})
export class MapViewComponent {
    @Input() currentMapView: MapViewInfoDto;

    constructor(private pictureResolverService: PictureResolverService) {}

    getImage(): string {
        return this.pictureResolverService.resolvePictureUrl(this.currentMapView);
    }
}
